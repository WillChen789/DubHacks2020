import React from 'react';

function Buttons(props) {
    return (
        <div>
            <button
            className="block"
            title = "CALIBRATE POSTURE"
            />
            <button
            className="block"
            title = "I am done working!!!"
            />
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
