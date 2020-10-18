import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings.js'
import Monitors from './Monitors.js'
import BottomButtons from './Bottom_buttons'
import './index.css';
import pie from './assets/pie.png'
import line from './assets/line.png'

import { bindPage, stopScript, status } from './camera.js'


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
          
          <div className="title">
              <h1>
                ImPosture
              </h1>
              <h2>
                The home workplace health manager
              </h2>
          </div>
          
          <div className="containery">
              <div className="col1">
              <div>
              <div id="main" style={{display: 'none'}}>
                  <video id="video" playsInline style={{display: 'inline'}}>
                  </video>
                  <canvas id="output" />
              </div>
              <div id="info" style={{display: 'none'}}>
              </div>
          </div>
                  <div className="Forms">
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
              </div>
              <div className="col2">
                <Monitors/>
              </div>
        </div>
        <div className="clear">
          <BottomButtons className="Bottom"/>
        </div>
        <div id="graphs" style={{display: 'none'}}>
          <img class="resize" src={line} style={{display: 'inline'}}></img>
          <img class="resize1" src={pie} style={{display: 'inline'}}></img>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
