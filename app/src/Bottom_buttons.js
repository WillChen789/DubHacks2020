import React from 'react';
//import { bindPage } from '../../posenet/demos/camera.js'
import './Bottom_buttons.css';

function Buttons(props) {
    return (
        <div className="buttonW">
            <button
            id="calButton"
            value="calibrateButton"
            className="block"
            title = "CALIBRATE POSTURE">
            CALIBRATE POSTURE
            </button>

            <button
            id="doneButton"
            value="clockOutButton"
            className="block"
            onClick={console.log("You pressed")}
            title = "I am done working!!!">
            I am done working!!!
            </button>
        </div>
    )
}

export class Bottom_buttons extends React.Component {
    render() {
        return(
            <Buttons/>
        );
    }

}

export default Bottom_buttons;
