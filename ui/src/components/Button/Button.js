import './Button.css';

const Button = ({ value, className, onClick}) => {

    return <td>
        <div className="btn btn-td-wrapper">
            <div className={className !== 'btn-number' ? className + ' btn-pad' : className } onClick={onClick} tabIndex='0'>
                {value}
            </div>
        </div>
    </td>
};
export default Button;