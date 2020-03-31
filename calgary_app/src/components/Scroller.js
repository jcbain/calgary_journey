import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';

import Map from './Map';

import './styles/scroller.css'

class Scroller extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: -1,
            steps: [0 ,1, 2, 3],
            progress: 0,
        }
    }

    onStepEnter = ({ element, data}) => {
        if(data !== this.state.data) {
            this.setState({ data });
        }
    }

    onStepExit = ({ element }) => {}

    onStepProgress = ({ element }) => {}

    render(){
        return(
            <div className="main-scroller-container">
                <Map step={this.state.data}/>

                <div className="scroller">
                    <Scrollama
                    onStepEnter={this.onStepEnter}
                    onStepExit={this.onStepExit}
                    progress
                    onStepProgress={this.onStepProgress}
                    offset={0.35}
                    debug
                    >
                    <Step data={0}>
                        <div className="scroller-step">
                            <p>At 10,000 generations out, you can still see that individual phenotypes between the two populations don't look too dissimilar from one another. These individuals <span className="try-this">here</span> are the most divergent indiduals between populations. From what we can tell, there is very little difference.</p>
                        </div>
                    </Step>

                    <Step data={0}>
                        <div className="scroller-step">
                            <p>At 10,000 generations out, you can still see that individual phenotypes between the two populations don't look too dissimilar from one another. These individuals <span className="try-this">here</span> are the most divergent indiduals between populations. From what we can tell, there is very little difference.</p>
                        </div>
                    </Step>

                    <Step data={1}>
                        <div className="scroller-step">
                        <p>And at 20,000th generation</p>
                        </div>
                    </Step>

                    <Step data={2}>
                        <div className="scroller-step">
                        <p>And at 50,000th generation</p>
                        </div>
                    </Step>
                    </Scrollama>
                </div>
          </div>

        )

    }
}

export default Scroller;