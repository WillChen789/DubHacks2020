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
          />
          {props.values[3]}
        </label>
      </div>
    </form>
  );
}

class Settings extends React.Component {
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
          />
        </div>
      </div>
    );
  }
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
        <div>
          <Settings
          settingTitle="Example Form  "
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
