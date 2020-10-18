import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings.js'
import Monitors from './Monitors.js'
import Bottom_buttons from './Bottom_buttons'
import './index.css';


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
        <div id="main" style={{display: 'none'}}>
            <video id="video" playsInline style={{display: 'none'}}>
            </video>
            <canvas id="output" />
        </div>
        <div id="info" style={{display: 'none'}}>
        </div>
        <div className="floatL">
          <div className="NextLeft">
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
          </div>
          <div className="NextRight">
            <Monitors/>
          </div>
        </div>
        <div className="clear">
          <Bottom_buttons className="Bottom"/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
