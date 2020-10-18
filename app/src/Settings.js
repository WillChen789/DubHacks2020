import React from 'react';
import { setRadio } from './camera.js'

function Options(props) {
  return (
    <form>
      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            onClick={() => setRadio(props.title, props.values[0])}
          />
          {props.values[0]}
        </label>
      </div>

      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            onClick={() => setRadio(props.title, props.values[1])}
          />
          {props.values[1]}
        </label>
      </div>

      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            onClick={() => setRadio(props.title, props.values[2])}
          />
          {props.values[2]}
        </label>
      </div>

      <div className="form-element">
        <label>
          <input
            type="radio"
            name="option"
            onClick={() => setRadio(props.title, props.values[3])}
          />
          {props.values[3]}
        </label>
      </div>
    </form>
  );
}

export class Settings extends React.Component {
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
            title = {this.props.settingTitle}
            values={[" 100%", " 75%", " 50%", " 25%"]}
          />
        </div>
      </div>
    );
  }
}

export default Settings;
