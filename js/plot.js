var oldWidth = 0
function render(){
  if (oldWidth == innerWidth) return
  oldWidth = innerWidth

  var chart_width = chart_height = d3.select('#map').node().offsetWidth
  var r = 40


  if (innerWidth <= 925){
    chart_width = innerWidth
    chart_height = innerHeight*.7
  }

// dummy data
    var data = [ 1, 2, 3, 4];

    var svg = d3.select('#map').html('')
          .append('svg')
            .attrs({width: chart_width, height: chart_height})

    var x_scale = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .rangeRound([0, chart_width])
                    // multiply the number returned by the number passed in
                    .paddingInner(0.05);

    var y_scale = d3.scaleLinear()
                    .domain([0, d3.max(data, function(d){
                      return d;
                    })])
                    .range([0, chart_height]);

    var bars = svg.selectAll('rect')
                  .data(data)
                  .enter()
                  .append('rect')
                  .attr('x', function(d,i){
                      return x_scale(i);
                  })
                  .attr('y', function(d){
                      return chart_height - y_scale(d);
                  })
                  .attr('width', x_scale.bandwidth())
                  .attr('height', function(d){
                      return y_scale(d);
                  })
                  .attr('fill', '#7ED26D');


    var colors = ['orange', 'purple', 'steelblue', 'pink', 'black']
    var gs = d3.graphScroll()
        .container(d3.select('.container-1'))
        .graph(d3.selectAll('container-1 #map'))
        .eventId('uniqueId1')  // namespace for scroll and resize events
        .sections(d3.selectAll('.container-1 #sections > div'))
        // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
        .on('active', function(i){
          bars.transition().duration(100)
            .transition()
              .style('fill', colors[i])
        })
};
render()
d3.select(window).on('resize', render);
