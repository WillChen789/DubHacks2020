import React from 'react';
//import { bindPage } from '../../posenet/demos/camera.js'
import './Bottom_buttons.css';

function Buttons(props) {
    return (
        <div className="buttonW">
            <button
            title = "CALIBRATE POSTURE"
            //onClick={bindPage}
            />
            <button
            title = "I am done working!!!"
            />
        </div>
    )
}

export class Bottom_buttons extends React.Component {
    render() {
        return(
            <Buttons
            />
        );
    }

}

export default Bottom_buttons;