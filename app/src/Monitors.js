import React from 'react';
import './Monitors.css';

function Monitor(props) {
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
  render() {
    return (
      <div className="watson">
          <div>
            <h1>Monitors</h1>
          </div>
          <div>
            <Monitor type="Good" name="Posture"/>
            <Monitor type="Bad" name="Eyes"/>
            <Monitor type="Good" name="Hydration"/>
            <Monitor type="Bad" name="Break"/>
          </div>
      </div>
    );
  }
}

export default Monitors;
