import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Settings extends React.Component {
  render() {
    return (
      <div className="radios">
        <form>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="option1"
                checked={true}
                className="form-check-input"
              />
              Option 1
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="option2"
                className="form-check-input"
              />
              Option 2
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value="option3"
                className="form-check-input"
              />
              Option 3
            </label>
          </div>

          <div className="form-group">
            <button className="btn btn-primary mt-2" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
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
          <Settings/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
