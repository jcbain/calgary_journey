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

    // var bars = svg.selectAll('rect')
    //               .data(data)
    //               .enter()
    //               .append('rect')
    //               .attr('x', function(d,i){
    //                   return x_scale(i);
    //               })
    //               .attr('y', function(d){
    //                   return chart_height - y_scale(d);
    //               })
    //               .attr('width', x_scale.bandwidth())
    //               .attr('height', function(d){
    //                   return y_scale(d);
    //               })
    //               .attr('fill', '#7ED26D');

    function firstAction(revert=false){


      svg.selectAll('.bars')
         .data(data)
         .enter()
         .append('rect')
         .attr("class", "bar")
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

    }


    function secondAction(revert=false){
      if(revert){
        data.pop()
        d3.selectAll('.remove').remove();
        // Update scales
        x_scale.domain(d3.range(data.length));
        y_scale.domain([0, d3.max(data, function(d){
          return d;
        })]);
      }

      d3.selectAll('.bar')
        .transition('color')
        .duration(1200)
        .style("fill","#6488FF")
        .attr('x', function(d,i){
            return x_scale(i);
        })
        .attr('y', function(d){
            return chart_height - y_scale(d);
        })
        .attr('width', x_scale.bandwidth())
        .attr('height', function(d){
            return y_scale(d);
        });
    }

    // need to set an option as a parameter that switches that will revert to
    // previous graph
    function thirdAction(revert=false){
      var new_num = Math.floor(Math.random() * d3.max(data));
      data.push( new_num );

      // Update scales
      x_scale.domain(d3.range(data.length));
      y_scale.domain([0, d3.max(data, function(d){
        return d;
      })]);

      var bars = svg.selectAll('.bar').data(data);

        bars.enter()
        .append('rect')
        .attr('x', function(d, i){
          return x_scale(i);
        })
        .attr('y', chart_height)
        .classed('remove', true)
        .attr('width', x_scale.bandwidth())
        // the height starting at 0 is for animation purposes
        // we want it to start at 0 and then grow to its height
        .attr('height', 0)
        .attr('fill', '#7ED26D')
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('x', function(d, i){
          return x_scale(i);
        })
        .attr('y', function(d){
          return chart_height - y_scale(d);
        })
        .attr('width', x_scale.bandwidth())
        .attr('height', function(d){
          return y_scale(d);
        })
        // .attr('opacity', bar_opacity);
    };

    var updateFunctions = d3.range(d3.selectAll('#sections > div').size())
        .map(function(){ return function(){} });

    updateFunctions[0] = firstAction;
    updateFunctions[1] = secondAction;
    updateFunctions[2] = thirdAction;

    var lastI = -1
    var activeI = 0
    d3.graphScroll()
      .container(d3.select('.container-1'))
      .graph(d3.selectAll('container-1 #map'))
      .eventId('uniqueId1')  // namespace for scroll and resize events
      .sections(d3.selectAll('.container-1 #sections > div'))
      .on('active', function(i){
        activeI = i

        //call all fns last and active index
        var sign = activeI - lastI < 0 ? -1 : 1
        console.log(sign)
        // d3.range(lastI + sign, activeI + sign, sign).forEach(function(i){
        //   updateFunctions[i]()
        // })
        if(sign == -1){
          var revert_yes = true;
          updateFunctions[activeI](revert = revert_yes)
        }
        updateFunctions[activeI]()

        lastI = activeI

        // d3.selectAll('#sections > div')
        //   .transition().duration(function(d, i){ return i == activeI ? 0 : 600 })
        //     .style('opacity', function(d, i){
        //       return i == activeI ? 1 : i == activeI + 1 ? .2 : .001 })

      })
      .sections(d3.selectAll('#sections > div'))


    // var colors = ['orange', 'purple', 'steelblue', 'pink', 'black']
    // var gs = d3.graphScroll()
    //     .container(d3.select('.container-1'))
    //     .graph(d3.selectAll('container-1 #map'))
    //     .eventId('uniqueId1')  // namespace for scroll and resize events
    //     .sections(d3.selectAll('.container-1 #sections > div'))
    //     // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
    //     .on('active', function(i){
    //       bars.transition().duration(100)
    //         .transition()
    //           .style('fill', colors[i])
    //     })
};
render()
d3.select(window).on('resize', render);
