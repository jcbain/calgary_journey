// data prep
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

// colors
let colorSalmon = "#e3917c";
let colorBlue = "#c5f2f7";
let colorYellow = "#f3d86f";

Promise.all([us, route]).then(function(values) {
    let width = window.innerWidth,
        height = window.innerHeight;
    // using d3 for convenience
    var main = d3.select('main')
    var scrolly = main.select('#scrolly');
    var figure = scrolly.select('figure');

    var plot = figure.append('svg')
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g");


    var article = scrolly.select('article');
    var step = article.selectAll('.step');

    let projection = d3.geoAlbers()
                    .scale([window.innerWidth])
                    .rotate([102, 0]) // longitude center
                    .center([0, 48]) // latitude center
                    .translate([width/2, height/2]);

    let path = d3.geoPath()
                .projection(projection);

    function firstAction() {
        plot.selectAll(".base")
        .data(values[0].features)
        .enter()
        .append("path")
        .attr("class", "base")
        .attr("d", path)
        .style('fill', colorYellow);
    }

    function secondAction() {
        plot.selectAll(".routes")
        .data(values[1].features)
        .enter()
        .append("path")
        .attr("class", "routes")
        .attr("d", path)
        .style('stroke', colorSalmon)
        .style('fill', 'none')
        .style('stroke-width', 4);
    }

    var updateFunctions = d3.range(d3.selectAll('#sections > div').size())
    .map(function(){ return function(){} });

    updateFunctions[0] = firstAction;
    updateFunctions[1] = secondAction;
    // updateFunctions[2] = thirdAction;

    // initialize the scrollama
    var scroller = scrollama();
    // generic window resize listener event
    function handleResize() {
        // 1. update height of step elements
        var stepH = Math.floor(window.innerHeight * 0.75);
        step.style('height', stepH + 'px');
        var figureHeight = window.innerHeight / 2
        var figureMarginTop = (window.innerHeight - figureHeight) / 2
        figure
            .style('height', figureHeight + 'px')
            .style('top', figureMarginTop + 'px');
        // 3. tell scrollama to update new element dimensions
        scroller.resize();
    }
    // scrollama event handlers
    function handleStepEnter(response) {
        console.log(response)
        // response = { element, direction, index }
        // add color to current step only
        step.classed('is-active', function (d, i) {
            return i === response.index;
        })
        // update graphic based on step
        // figure.select('p').text(response.index + 1);
        updateFunctions[response.index]();
    }
    function setupStickyfill() {
        d3.selectAll('.sticky').each(function () {
            Stickyfill.add(this);
        });
    }
    function init() {
        setupStickyfill();
        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        handleResize();
        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)
        scroller.setup({
            step: '#scrolly article .step',
            offset: 0.33,
            debug: true,
        })
            .onStepEnter(handleStepEnter)
        // setup resize event
        window.addEventListener('resize', handleResize);
    }
    // kick things off
    init();
})