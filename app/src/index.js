import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useAlert } from 'react-alert'
import './index.css';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


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
    alert("Wowza an alert!")
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

class Monitors extends React.Component {

}

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedOption: "option1"
      };
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
          <AlertProvider template={AlertTemplate} {...options}>
            <Settings settingTitle="Notifications"/>
          </AlertProvider>
        </div>
        <div className="Form">
          <Settings
          settingTitle="Posture Sensitivity"
          />
        </div>
        <div className="Form">
          <Settings
          settingTitle="Eye Sensitivity"
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
