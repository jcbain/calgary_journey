import React, { Component } from 'react';
import { select } from 'd3-selection';
import { geoAlbers, geoPath, geoProjectionMutator, geoOrthographicRaw, geoEquirectangularRaw  } from 'd3-geo';
import { interpolate } from 'd3-interpolate';
import { easeCubic} from 'd3-ease'
import 'd3-transition';
import 'd3-ease';

// import { calculatePathDistanceMiles, runDistance} from '../helpers/distances';

import './styles/map.css';

import states from '../data/us-states';
import provinces from '../data/canada';
import mexico from '../data/mexico';
import territories from '../data/selected_states_provinces';
import routes from '../data/to_calgary';

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
            history: Array(1).fill(0), 
            step: 0,
        }

    }

    
    mapRef = React.createRef();

    componentDidMount(){
 


            
        

        // this.projection.rotate(this.rotate(1))
        console.log(this.state.history)
        console.log(this.projection([-92.3341, 38.9517]))
        console.log(this.projection([-114.0719, 51.0447])) 

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



    }


    componentDidUpdate(){
        console.log(this.state)
        this.props.funcs.map(d => {
            return d.call(this);
        }) 
        
    }


    render(){


        return(
            <svg className="map-svg"
                 viewBox={[0, 0, this.dims.width, this.dims.height]}
                 preserveAspectRatio="xMidYMid meet">
                <g className="map-items" ref={this.mapRef}></g>
            </svg>

        )
    }
}

export default Map;