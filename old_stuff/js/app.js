let us = d3.json("data/selected_states_provinces.geojson");
let route = d3.json("data/to_calgary.geojson");
let coords = [
    [-114.0719, 51.0447],
    [-92.3341, 38.9517]
];
let labels = [
    {text: "calgary, ab", x: 45, y: -5, align: "middle"},
    {text: "columbia, mo", x: 50, y: 20, align: "end"},
  ]

let colorSalmon = "#e3917c";
let colorBlue = "#c5f2f7";
let colorYellow = "#f3d86f";


let width = 960,
    height = 1160;

let svg = d3.select("#chart")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet");

let g = svg.append("g");

let projection = d3.geoAlbers()
                   .scale([2500])
                   .rotate([102, 0]) // longitude center
                   .center([0, 48]) // latitude center
                   .translate([width/2, height/2]);

let path = d3.geoPath()
             .projection(projection);

Promise.all([us, route]).then(function(values) {
    // create base layer of map
    g.selectAll(".base")
        .data(values[0].features)
        .enter()
        .append("path")
        .attr("class", "base")
        .attr("d", path)
        .style('fill', colorYellow);

    // create driving route
    g.selectAll(".routes")
        .data(values[1].features)
        .enter()
        .append("path")
        .attr("class", "routes")
        .attr("d", path)
        .style('stroke', colorSalmon)
        .style('fill', 'none')
        .style('stroke-width', 4);

    // create cities
    g.selectAll(".city")
        .data(coords)
        .enter()
        .append("circle")
        .attr("class", "city")
        .attr("cx", function(d) { return projection(d)[0]; })
        .attr("cy", function(d) { return projection(d)[1]; })
        .attr("r", "8px")
        .style("fill", colorSalmon);

    // create labels for cities
    g.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        .attr("x", function(d, i) { return projection(coords[i])[0] + d.x; })
        .attr("y", function(d, i) { return projection(coords[i])[1] + d.y; })
        .attr("text-anchor", function(d) { return d.align; })
        .text(function(d) { return d.text; })
        .style('fill', '#fffff7');

})
