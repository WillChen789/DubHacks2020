import React from 'react';
import './Monitors.css';

function Monitor(props) {
  let monitor = []
  if (props.type == "Good") {
    monitor.push(
      <div className="monitorCircle">
        <img src="./assets/green_circle.png" alt="green circle"/>
      </div>
    )
  } else {
    monitor.push(
      <div className="monitorCircle">
        <img src="./assets/red_circle.png" alt="red circle"/>
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
