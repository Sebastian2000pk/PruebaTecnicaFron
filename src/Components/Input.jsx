import React from "react";

import '../styles/input.css';


const Input = ({title, type, handleChange, val, setVal}) => {
  return (
    <div className="input">
      <p className="input_title">{title}</p>
      <input className="input_input"
        type={type} 
        value={val}
        onChange={(e) => handleChange(e.target.value, title, setVal)} />
    </div>
  );
};

export default Input;