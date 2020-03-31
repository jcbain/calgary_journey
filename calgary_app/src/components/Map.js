import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { geoAlbers, geoPath  } from 'd3-geo';

import './styles/map.css';

import states from '../data/us-states';
import provinces from '../data/canada';
import territories from '../data/selected_states_provinces';
import routes from '../data/to_calgary';

class Map extends Component {
    constructor(props){
        super(props)
        this.territories = territories.features;
        this.route = routes.features;
        this.states = states.features;
        this.provinces = provinces.features;
        this.coords = [
            [-114.0719, 51.0447],
            [-92.3341, 38.9517]
        ];
        this.state = {
            dims: {width: 1000, height: 500},
            territories: [],
        }
    }

    mapRef = React.createRef();
    componentDidMount(){


        const projection = geoAlbers()
            .scale([this.state.dims.width])
            .rotate([102, 0]) // longitude center
            .center([0, 48]) // latitude center
            .translate([this.state.dims.width/2, this.state.dims.height/2]);

        const path = geoPath()
            .projection(projection);


        select(this.mapRef.current)
            .selectAll(".states")
            .data(this.states)
            .enter()
            .append("path")
            .attr("class", "states")
            .attr("d", path);

        select(this.mapRef.current)
            .selectAll(".provinces")
            .data(this.provinces)
            .enter()
            .append("path")
            .attr("class", "provinces")
            .attr("d", path);


        select(this.mapRef.current)
            .selectAll(".base")
            .data(this.territories)
            .enter()
            .append("path")
            .attr("class", "base")
            .attr("d", path);

        select(this.mapRef.current)
            .selectAll(".routes")
            .data(this.route)
            .enter()
            .append("path")
            .attr("class", "routes")
            .attr("d", path)
            .style('fill', 'none')
            .style('stroke-width', 5);

        select(this.mapRef.current)
            .selectAll(".city")
            .data(this.coords)
            .enter()
            .append("circle")
            .attr("class", "city")
            .attr("cx", function(d) { return projection(d)[0]; })
            .attr("cy", function(d) { return projection(d)[1]; })
            .attr("r", 5)

      
    }


    render(){


        return(
            <svg className="map-svg"
                 viewBox={[0, 0, this.state.dims.width, this.state.dims.height]}
                 preserveAspectRatio="xMidYMid meet">
                <g ref={this.mapRef}></g>
            </svg>
        )
    }
}


export default Map;