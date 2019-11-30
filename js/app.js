let us = d3.json("data/us-states.geojson");
let route = d3.json("data/to_calgary.geojson");

let width = 960,
    height = 1160;

var svg = d3.select("#chart")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet");

var g = svg.append("g");

var projection = d3.geoAlbers()
                   .scale([2500])
                   .rotate([90.0715, 0])
                   .center([0, 49.9511])
                   .translate([width/2, height/2]);

var path = d3.geoPath()
             .projection(projection);

Promise.all([us, route]).then(function(values) {

    g.selectAll(".base")
    .data(values[0].features)
    .enter()
    .append("path")
    .attr("class", "base")
    .attr("d", path);
    
    g.selectAll(".routes")
    .data(values[1].features)
    .enter()
    .append("path")
    .attr("class", "routes")
    .attr("d", path)
    .style('stroke', 'blue');
})
