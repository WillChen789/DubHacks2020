import React from 'react';
import './Monitors.css';
import gcircle from './assets/green_circle.JPG';
import rcircle from './assets/red_circle.JPG';

import { bindPage, stopScript, status } from './camera.js'



function Monitor(props) {
  console.log("in monitor");
  let monitor = []
  if (props.type === "Good") {
    monitor.push(
      <div className="monitorCircle">
        <img className="resize" src={gcircle} alt="green circle"/>
      </div>
    )
  } else {
    monitor.push(
      <div className="monitorCircle">
        <img className="resize" src={rcircle} alt="red circle"/>
      </div>
    )
  }
  monitor.push(
    <div className="monitorName">
      <h3>{props.name}</h3>
    </div>
  )
  return (
    <div>
      {monitor}
    </div>
  );
}

export class Monitors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posture: "bad"
    }
}
  intervalID;

  access(){
    console.log(this.state.posture);
    var temp = this.state.posture;
    var now = status() ? "good" : "bad";
    if (temp != now){
      this.forceUpdate();
      this.setState({posture:now});
    }
    return this.state.posture;
  }
  componentDidMount(){
    this.access();
    this.intervalID = setInterval(this.access.bind(this), 100);
  }
  render() {
    return (
      <div className="monitorCombination">
        <Monitor type={this.state.posture} name="Posture"/>
        <Monitor type={this.state.posture} name="Eyes"/>
        <Monitor type={this.state.posture} name="Hydration"/>
        <Monitor type={this.state.posture} name="Break"/>
      </div>
    );
  }
};

export default Monitors;
