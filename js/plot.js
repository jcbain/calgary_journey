// dummy data
var data = [ 1, 2, 3, 4];

// define constants
function setChartScale(){
  var width = Math.min(890, window.innerWidth - 240)
  d3.select('#map')
      .style('transform', 'scale(' + width/890 +')')
      .style('-webkit-transform', 'scale(' + width/890 +')')
      .style('-moz-transform', 'scale(' + width/890 +')')
      .style('-o-transform', 'scale(' + width/890 +')')
      .style('-ms-transform', 'scale(' + width/890 +')')
      .style('margin-left', -(890-width)/2 + 'px')
      .style('margin-top' , -(890-width)/3 + 'px')

}
d3.select(window).on('resize.calcScale', _.debounce(setChartScale, 200))
setChartScale()

;(function(){

  var x_scale = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .rangeRound([0, width])
                  .paddingInner(0.05);

  var y_scale = d3.scaleLinear()
                  .domain([
                    0,
                    d3.max(data, function(d){
                      return d;
                    })
                  ])
                  .range([0, height]);

  // create svg element
  var svg = d3.select('#map')
              .append('svg')
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);
});







plots[0] = firstPlot();
plots[1] = secondPlot();

function firstPlot(){
  var plot = svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('x', function(d,i){
       return x_scale(i);
     })
     .attr('y', function(d){
       return height - y_scale(d);
     })
     .attr('width', x_scale.bandwidth())
     .attr('height', function(d){
       return y_scale(d);
     })
     .attr('fill', '#7ED26D');

     return plot
};

function secondPlot(){
  var plot2 = svg.selectAll('text')
     .data(data)
     .enter()
     .append('text')
     .text(function(d){
       return d;
     })
     .attr('x', function(d, i){
       return x_scale(i) + x_scale.bandwidth() / 2;
     })
     .attr('y', function(d){
       return height - y_scale(d) + 15;
     })
     .attr( 'font-size', 14 )
     .attr( 'fill', '#fff' )
     .attr( 'text-anchor', 'middle' );

     return plot2
};


d3.graphScroll()
  .sections(d3.selectAll('#sections > section'))
  .on('active', function(i){
    return plots[i];
  });
