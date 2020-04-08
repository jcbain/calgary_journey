import React from 'react';
import { select, selectAll } from 'd3-selection';
import {easeSin} from 'd3-ease'
import { interpolate } from 'd3-interpolate';


export const funcs = {
    blank: function() {return;},
    addColumbia: function() {
        let projection = this.projection;
        let city = select('.map-items')
            .selectAll(".city")
            .data(this.coords)
            .enter()
            .append("circle")
            .attr("class", "city")
            .attr("cx", d =>  { return projection(d)[0]; })
            .attr("cy", d => { return projection(d)[1]; })
            .transition()
            .duration(5000)
            .attr("r", 2)
        return city
    },
    addInitialDistance: function(){
        let action;
        let selection = selectAll('.distance-text');
        if(selection.node() === null ){
            action =  select('.text-svg')
                .append('text')
                .text("distance traveled 0")
                .attr('x', 10)
                .attr('y', 15)
                .attr('class', 'distance-text')  
                .transition()
                .duration(5000)
                .attr('font-size', 16)
  
        } 
        return action;

    },
    moveDistance: function(){
        let historyLength = this.props.distanceHistory.length;
        let end = this.props.distanceHistory[historyLength - 1];
        let start = this.props.distanceHistory[historyLength - 2];
        return(
            select('.text-svg')
                .selectAll('.distance-text')
                .transition()
                .duration(3000)
                .tween('.distance-text', function(d) {
                    let i = interpolate(start, end);
                    return function(t){ 
                        select(this).text(`distance traveled ${Math.round(i(t))}`)}
                })
        )
    },
    zoomMap: function() {
        return(        select('.map-svg')
        .transition()
        .duration(3000)
        .attr('transform', `translate(${this.props.moveX} ${this.props.moveY}) scale(${this.props.zoom})`))
    },
    progressRoute: function() {
        let start, end;
        let totalLength = 0;
        if ( select(`#route-part-${this.props.step}`).node() !== null){
            totalLength = select(`#route-part-${this.props.step}`).node().getTotalLength()
        }

        if(this.props.direction === "down"){
            
            end = 0;
            start = totalLength;
        } else {
            end = totalLength;
            start = 0;
        }
        return(
            
            select(`#route-part-${this.props.step}`)
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", start)
            .transition(easeSin).duration(3000)
            .attr("stroke-dashoffset", end)


        )
    },
}

const distances = [135.85255598723776, 26.09799728478469, 464.5745649933896, 145.56512854380514, 33.23544231308974, 7.8000198100148115, 4.152354692104787, 11.543164934882912, 70.13160657387805, 129.52744166820193, 265.4089851686229, 136.70390475489785, 202.19826262316366, 196.7323093705185]

export const trip = [
    {
        part: 0,
        leg: -1,
        text: <p>Up until last year, this was our little slice of the Earth. Columbia, MO is a small"ish" college town wedged between the humble metropolises of Kansas City and St. Louis Missouri.</p>,
        city: "Columbia, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -300,
        moveX: 600,
        distance: 0,
        funcs: [funcs.zoomMap, funcs.addColumbia, funcs.addInitialDistance],
    }, 
    {
        part: 1,
        leg: 0,
        text: "Jennifer made her way to Kansas City",
        city: "Kansas City, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -300,
        moveX: 600,
        distance: distances[0],
        funcs: [funcs.zoomMap, funcs.progressRoute, funcs.moveDistance],
    },
    {
        part: 2,
        leg: 1,
        text: <p>We didn't make it very far before Jennifer decided that she got too hot and needed to shed some layers at a rest stop.</p>,
        city: "Somewhere out side of Platte City, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -300,
        moveX: 600,
        distance: distances[1],
        funcs: [funcs.zoomMap, funcs.progressRoute, funcs.moveDistance],
    },
    {
        part: 3,
        leg: 2,
        text: <p>Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.</p>,
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: 190,
        moveX: 1100,
        distance: distances[2],
        funcs: [funcs.zoomMap, funcs.progressRoute, funcs.moveDistance],
    },
    {
        part: 4,
        leg: 3,
        text: <p>Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.</p>,
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 1,
        moveY: 0,
        moveX: 0,
        distance: distances[2],
        funcs: [funcs.zoomMap],
    },
    {
        part: 5,
        leg: 4,
        text: <p>Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.</p>,
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 1,
        moveY: 0,
        moveX: 0,
        distance: distances[2],
        funcs: [funcs.zoomMap],
    }
]


