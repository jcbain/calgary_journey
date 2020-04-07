import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { geoAlbers, geoPath  } from 'd3-geo';
import { easeLinear } from 'd3-ease';
import 'd3-transition';
import 'd3-ease';

import './styles/map.css';

import states from '../data/us-states';
import provinces from '../data/canada';
import mexico from '../data/mexico';
import territories from '../data/selected_states_provinces';
import routes from '../data/to_calgary';


import {funcs} from '../data/trip';
class Map extends Component {
    constructor(props){
        super(props)
        this.territories = territories.features;
        this.route = routes.features;
        this.states = states.features;
        this.mexico = mexico.features;
        this.provinces = provinces.features;
        this.coords = [
            [-114.0719, 51.0447],
            [-92.3341, 38.9517]
        ];
        this.dims = {width: 1000, height: 500}
        this.projection = geoAlbers().scale([this.dims.width]).rotate([92, 0]).center([0, 38]).translate([this.dims.width/2, this.dims.height/2]);
        this.path = geoPath().projection(this.projection)
        this.state = {
            step: 0,
        }

    }

    

    mapRef = React.createRef();
    componentDidMount(){

        let path = geoPath()
            .projection(this.projection);

        let map = select(this.mapRef.current);


        map
            .selectAll(".states")
            .data(this.states)
            .enter()
            .append("path")
            .attr("class", "states")
            .attr("d", path);

        map
            .selectAll(".provinces")
            .data(this.provinces)
            .enter()
            .append("path")
            .attr("class", "provinces")
            .attr("d", path);

        map
            .selectAll(".mexico")
            .data(this.mexico)
            .enter()
            .append("path")
            .attr("class", "mexico")
            .attr("d", path);


        map
            .selectAll(".base")
            .data(this.territories)
            .enter()
            .append("path")
            .attr("class", "base")
            .attr("d", path);

        map
            .selectAll(".routes")
            .data(this.route)
            .enter()
            .append("path")
            .attr("class", "routes")
            .attr("id", (d, i) => `route-part-${i}`)
            .attr("d", path)
            .style('fill', 'none')
            .attr('stroke-width', 0)
            // .style('stroke-width', 5);


        select(this.mapRef.current)
            .selectAll(".city")
            .data(this.coords)
            .enter()
            .append("circle")
            .attr("class", "city")
            .attr("cx", d => { return this.projection(d)[0]; })
            .attr("cy", d => { return this.projection(d)[1]; })
            .attr("r", 2)

      
    }

    SampleFunc(){
        let totalLength = 0;
        if ( select(`#route-part-0`).node() !== null){
            totalLength = select(`#route-part-0`).node().getTotalLength()
        }

        select('#route-part-0')
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        // .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", 0)
        .transition(easeLinear).duration(3000)
        .attr("stroke-dashoffset", totalLength);
    }

    componentDidUpdate(){
        // console.log(funcs.samp2.call(this))

        this.props.funcs.call(this);

        // select('.map-svg')
        //     .transition()
        //     .duration(3000)
        //     .attr('transform', `translate(${this.props.moveX} ${this.props.moveY}) scale(${this.props.zoom})`)
        
        let totalLength = 0;
        if ( select(`#route-part-${this.props.step}`).node() !== null){
            totalLength = select(`#route-part-${this.props.step}`).node().getTotalLength()
        }

        // let totalLength = select(`#route-part-${this.props.step}`).node().getTotalLength()

        select(`#route-part-${this.props.step}`)
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            // .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition(easeLinear).duration(3000)
            .attr("stroke-dashoffset", 0);

            
    }


    render(){


        return(
            <div className="map-container">
            <svg className="map-svg"
                 viewBox={[0, 0, this.dims.width, this.dims.height]}
                 preserveAspectRatio="xMidYMid meet">
                <g ref={this.mapRef}></g>
            </svg>
            <button onClick={this.SampleFunc}>ClickME</button>

            </div>
        )
    }
}


export default Map;