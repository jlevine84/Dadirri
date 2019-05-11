import React from 'react';

function seeUserData(props){
    return(
        <div>
            {props.noInfo && 
            <p>No information for the selected date</p>
            }
            {!props.noInfo && 
                <div>
                    <h5>Data for {props.date}</h5>
                    <p>Mood: {props.mood}</p>
                    <p>Anxiety: {props.anxiety}</p>
                    <p>Energy: {props.energy}</p>
                    <p>Hours Slept: {props.sleepHours}</p>
                    <p>Medicine Taken: {props.medicineTaken}</p>
                    <p>Exercised : {props.exercise}</p>
                    <p>Daily Log: {props.dailyLog}</p>
                    <p>Exercise Details: {props.exerciseAmount}</p>
                </div>
            }
        </div>
    )
}

export default seeUserData;