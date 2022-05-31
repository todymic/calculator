import React from "react";
import './Input.css';

const Input = ({input, animate}) => {
    return <div className="input-wrapper">
            <div className='input-div'>
                <span className={`input-span ${animate ? "translated" : ""}`}>{input}</span>
            </div>
    </div>
};
export default Input;