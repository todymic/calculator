import './Output.css';

const Output = ({result, memo}) => {
    let outputText = ''
    if(memo !== '') {
         outputText = memo + ' = ' + result
    }

    return <div className="output-wrapper">
        <span className='output-span'>
            {outputText}
        </span>
    </div>
}
export default Output;