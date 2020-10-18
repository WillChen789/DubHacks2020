import React from 'react';
import './Monitors.css';
import gcircle from './assets/green_circle.JPG';
import rcircle from './assets/red_circle.JPG';

function Monitor(props) {
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
      <h2>{props.name}</h2>
    </div>
  )
  return (
    <div>
      {monitor}
    </div>
  );
}

export class Monitors extends React.Component {
  render() {
    return (
      <div className="monitorCombination">
        <Monitor type="Good" name="Posture"/>
        <Monitor type="Bad" name="Eyes"/>
        <Monitor type="Good" name="Hydration"/>
        <Monitor type="Bad" name="Break"/>
      </div>
    );
  }
}

export default Monitors;
