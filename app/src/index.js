import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './Settings.js'
import Monitors from './Monitors.js'
import BottomButtons from './Bottom_buttons'
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
          <div>
          </div>
          <div className="title">
              <h1>
                ImPosture
              </h1>
              <h2>
                The home workplace health manager
              </h2>
          </div>
          <div className="container">
              <div className="col1">
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
              <div id="main" style={{display: 'inline'}}>
                  <video id="video" playsInline style={{display: 'inline'}}>
                  </video>
                  <canvas id="output" />
              </div>
              <div id="info" style={{display: 'none'}}>
              </div>
              <div className="col2">
                <Monitors/>
              </div>
          </div>
          <div>
            <BottomButtons className="Bottom"/>
          </div>
          <script src="https://d3js.org/d3.v6.js"></script>
          <script src="https://d3js.org/d3-time.v2.min.js"></script>
          <script src="https://d3js.org/d3-time-format.v3.min.js"></script>
          <div id="scatter"></div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
