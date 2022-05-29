import './ButtonBox.css';

const ButtonBox = ({ children }) => {
    return <div className="button-box">
        <table className="button-table">
            <tbody>{children}</tbody>
        </table>
    </div>
};

export default ButtonBox;