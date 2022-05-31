import React from "react";
import './Output.css';

const Output = ({result, memo, animate}) => {
    let outputText = ''
    if(memo !== '') {
         outputText = memo + ' = ' + result
    }

    return <div className="output-wrapper">
        <span className={`output-span ${animate ? "scaled" : ""}`}>
            {outputText}
        </span>
    </div>
}
export default Output;