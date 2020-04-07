import { select } from 'd3-selection';
import {easeLinear} from 'd3-ease'

export const funcs = {
    blank: function() {return;},
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
        console.log(this.props.direction)

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
            .transition(easeLinear).duration(3000)
            .attr("stroke-dashoffset", end)


        )
    }

}

export const trip = [
    {
        part: 0,
        leg: -1,
        text: "It all started here. Columbia, MO, where my wife, Jennifer, and I picked up and made our way to Calgary.",
        city: "Columbia, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: 0,
        moveX: 0,
        funcs: [funcs.blank],
    }, 
    {
        part: 1,
        leg: 0,
        text: "Jennifer made her way to Kansas City",
        city: "Kansas City, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: 0,
        moveX: 0,
        funcs: [funcs.zoomMap, funcs.progressRoute],
    },
    {
        part: 2,
        leg: 1,
        text: "We didn't make it very far before Jennifer decided that she got too hot and needed to shed some layers at a rest stop.",
        city: "Somewhere out side of Platte City, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: 0,
        moveX: 0,
        funcs: [funcs.zoomMap, funcs.progressRoute],
    },
    {
        part: 3,
        leg: 2,
        text: "Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.",
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: 490,
        moveX: 500,
        funcs: [funcs.zoomMap, funcs.progressRoute],
    },
    {
        part: 4,
        leg: 3,
        text: "Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.",
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: 490,
        moveX: 500,
        funcs: [funcs.blank],
    }
]

