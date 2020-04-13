import React, { Component } from 'react';
import dist, { Scrollama, Step } from 'react-scrollama';

import Map from './Map';
import { trip } from '../data/trip';

// import Car from '../icons/Car.svg'

import './styles/scroller.css'

class Scroller extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: trip[0],
            steps: [0 ,1, 2, 3],
            progress: 0,
            direction: undefined,
            distance: Array(0),
            currentDistance: 0,
            cumulativeDistance: 0
        }
    }


    onStepEnter = ({data, direction}) => {
        let cumDist;
        // TODO: what i need to check is if the previous direction AND the previous leg were
        // the same as the current
        if(direction === "down" && this.state.data.leg !== data.leg) {
            cumDist = this.state.cumulativeDistance + data.distance;
        } else if(direction === "up") {
            cumDist = this.state.cumulativeDistance - data.distance
        } else {
            cumDist = this.state.cumulativeDistance;
        }
        // cumDist = (direction === "up" && this.state.data.leg !== data.leg) ? this.state.cumulativeDistance - data.distance : this.state.cumulativeDistance;
        let newVal = (direction === "down") ? this.state.data.distance + data.distance : this.state.data.distance - data.distance;
        // let cumDist = (direction === 'down') ? this.state.cumulativeDistance + data.distance : this.state.cumulativeDistance - data.distance
        let distanceArray =  this.state.distance.concat(newVal)
        this.setState({data, direction, distance: distanceArray, currentDistance: data.distance, cumulativeDistance: cumDist})
        console.log(this.state)
    }

    onStepExit = ({ element, direction, data}) => {

    }

    onStepProgress = ({ element }) => {}

    render(){
        return(
            <div className="main-scroller-container">
                <div className="map-container">
                    {/* <img src={Car} width={10}></img> */}
                
                <Map step={this.state.data.leg} 
                     zoom={this.state.data.zoom} 
                     moveY={this.state.data.moveY} 
                     moveX={this.state.data.moveX}
                     funcs={this.state.data.funcs}
                     direction={this.state.direction}
                     currentDistance={this.state.data.distance}
                     distanceHistory={this.state.distance}/>
                {/* <div className="hiding-container"></div> */}
                </div>
                <div className='text-container'>
                    <svg className='text-svg' viewBox={[0,0,1000,100]}></svg>
                    <h1>{this.state.data.city}</h1>
                </div>
                <div className="scroller">
                    <Scrollama
                    onStepEnter={this.onStepEnter}
                    onStepExit={this.onStepExit}
                    progress
                    onStepProgress={this.onStepProgress}
                    offset={0.35}
                    // debug
                    >

                    {trip.map(value => (
                        <Step data={value} key={value.part}>
                            <div className="scroller-step">
                                {value.text}
                            </div>
                        </Step>
                    ))}
                    </Scrollama>
                </div>
          </div>

        )

    }
}





export default Scroller;