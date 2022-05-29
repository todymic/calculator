import './Output.css';

const Output = ({result}) => {
    return <div className="output-wrapper">
        <span className='output-span'>
            {result}
        </span>
    </div>
}
export default Output;