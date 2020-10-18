import React from 'react';
import './Monitors.css';

import { bindPage, stopScript, status } from './camera.js'



function Monitor(props) {
  console.log("in monitor");
  let monitor = []
  if (props.type === "Good") {
    monitor.push(
      <div className="green_dot"></div>
    )
  } else {
    monitor.push(
      <div className="red_dot"></div>
    )
  }
  monitor.push(
    <div className="monitorName">
      <h3>{props.name}</h3>
    </div>
  )
  return (
    <div className="container">
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
    var now = status() ? "Good" : "bad";
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
      <div>
          <div className="titleM">
            <h1>MONITORS</h1>
          </div>
          <div className="monitorCombination">
            <Monitor type={this.state.posture} name="Posture"/>
            <Monitor type={this.state.posture} name="Eyes"/>
            <Monitor type="Good" name="Hydration"/>
            <Monitor type="Good" name="Break"/>
          </div>
      </div>
    );
  }
};

export default Monitors;
