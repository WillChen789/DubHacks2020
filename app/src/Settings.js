import React from 'react';

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

export class Settings extends React.Component {
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

export default Settings;
