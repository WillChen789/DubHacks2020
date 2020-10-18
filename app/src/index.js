import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Options(props) {
  return (
    <form>
      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            value="option1"
            className="form-element-input"
            onClick={props.onClick}
          />
          {props.values[0]}
        </label>
      </div>

      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            value="option2"
            className="form-element-input"
            onClick={props.onClick}
          />
          {props.values[1]}
        </label>
      </div>

      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            value="option3"
            className="form-element-input"
            onClick={props.onClick}
          />
          {props.values[2]}
        </label>
      </div>

      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            value="option4"
            className="form-element-input"
            onClick={props.onClick}
          />
          {props.values[3]}
        </label>
      </div>
    </form>
  );
}

class Settings extends React.Component {
  handleClick() {
  }

  render() {
    let title = this.props.settingTitle
    return (
      <div>
        <div>
          <h2>
            {title}
          </h2>
        </div>
        <div className="radios">
          <Options
            values = {["100%", "75%", "50%", "25%"]}
            onClick={this.handleClick()}
          />
        </div>
      </div>
    );
  }
}

function Monitor(props) {
  let monitor = []
  if (props.type == "Good") {
    monitor.push(
      <div className="monitorCircle">
        <img src="../assets/green_circle.png" alt="green circle"/>
      </div>
    )
  } else {
    monitor.push(
      <div className="monitorCircle">
        <img src="../assets/red_circle.png" alt="red circle"/>
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

class Monitors extends React.Component {
  render() {
    return (
      <div className="monitorCombination">
        <Monitor type="Good" name="Posture"/>
        <Monitor type="Bad" name="Hydration"/>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedOption: "option1"
      }
  }

  render() {
    return (
      <div className="App">
        <h1>
          Posture?
        </h1>
        <h2>
          The home workplace health manager
        </h2>
        <div className="Form">
          <Settings settingTitle="Notifications"/>
        </div>
        <div className="Form">
          <Settings settingTitle="Posture Sensitivity"/>
        </div>
        <div className="Form">
          <Settings settingTitle="Eye Sensitivity"/>
        </div>
        <div>
          <Monitors/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
