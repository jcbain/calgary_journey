import React, { Component } from 'react';
import './App.css';
import Scroller from './components/Scroller';

class App extends Component{

    render(){
        return(
            <div>
            <Scroller />
            <div className="second-part"></div>
            </div>
        )
    }
}

export default App;