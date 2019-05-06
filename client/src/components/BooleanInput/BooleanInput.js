import React from 'react'
import './booleaninput.css'

function BooleanInput(props) {
  return (
    <div className="medicines-Taken form-check float">
      <p><strong>{props.title}</strong></p>
      <input 
        className="form-check-input" 
        type="radio" 
        name={props.name}
        value="true"
        onClick={props.update}  
      />
      
      <p>True</p>
      <input 
        className="form-check-input" 
        type="radio" 
        name={props.name}
        value="false"
        onClick={props.update} 
      />
      <p>False</p>
    </div>
  )
}

export default BooleanInput