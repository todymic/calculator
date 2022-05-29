import './Input.css';

const Input = ({input}) => {
    return <div className="input-wrapper">
            <div className='input-div'>
                <span className='input-span'>{input}</span>
            </div>
    </div>
};
export default Input;