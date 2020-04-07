import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';

import Map from './Map';
import {trip, funcs} from '../data/trip';

import './styles/scroller.css'

class Scroller extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: trip[0],
            steps: [0 ,1, 2, 3],
            progress: 0,
            direction: undefined,
        }
    }

    // onStepEnter = ({ element, data}, state) => {
    //     if(data !== this.state.data ) {
    //         this.setState({ data });
    //     }
    // }

    onStepEnter = ({data, direction}) => {
        console.log(direction)
        this.setState({data, direction})
        // if(data.leg !== this.state.data.leg){
        //     this.setState({data, direction})

        // }
        // if(data.leg !== this.state.data.leg){
        //     this.setState({data: data.data});
        // }

    }

    onStepExit = ({ element, direction, data}) => {
        console.log(direction)
        console.log(data)
    }

    onStepProgress = ({ element }) => {}

    render(){
        return(
            <div className="main-scroller-container">
                <Map step={this.state.data.leg} 
                     zoom={this.state.data.zoom} 
                     moveY={this.state.data.moveY} 
                     moveX={this.state.data.moveX}
                     funcs={this.state.data.funcs}
                     direction={this.state.direction}/>
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