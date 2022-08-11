import './App.css';
import React, {useState} from 'react';
import { ReactNotifications , Store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
// import 'animate.css';


import Wrapper from './components/wrapper/Wrapper';
import ScreenBox from "./components/screen/Screen";
import Output from "./components/screen/Output";
import Input from "./components/screen/Input";
import ButtonBox from "./components/Button/ButtonBox";
import Button from "./components/Button/Button";


const App = () => {
    const [result, setResult] = useState('');
    const [input, setInput] = useState('0');
    const [ans, setAns] = useState('');
    const [clearBtn, setClearBtn] = useState('AC');
    const [resultChanged, setResultChanged] = useState(false);
    const [isDotClicked, setIsDotClicked] = useState(false);
    const [isEqualClicked, setIsEqualClicked] = useState(false);

    const pad = [
        ['(', ')', '%', 'AC'],
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
    ];

    const operator = ['+', '-', '×', '÷'];
    const sign = ['%', '(', ')', 'AC', 'CE'];
    const ACCE = ['AC', 'CE'];

    /*
     *
     */
    const onClickEqual = () => {

        setClearBtn('AC');

        setResultChanged(false);

        if (input.trim() !== '.'
            && !operator.includes(input.slice(-1))
            && input.search('Infinity') === -1
            && !isEqualClicked
        ) {
            // construct the url of the API call
            const url = `${process.env.REACT_APP_API_URL}/calcul`;

            const formattedInput = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/\. /g, '.0 ');
            // if Infinity, don't call the API
            let data = {
                "input" : formattedInput
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        const inputResult = input.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\.0 /g, '. ');

                        if (result.result) {

                            setInput(result.result);
                        } else {
                            setInput('Error');
                        }

                        setResult('')
                        setAns(inputResult)

                        setTimeout(() => {
                            setResultChanged(true);
                        });
                    }
                )

            setIsEqualClicked(true);

        } else {

            if (input.search('Infinity') > -1) {
                changeStateResult('', input, 'Infinity')
            } else {
                if (input.trim() === '.') {
                    changeStateResult('', input, 'Error')
                }
            }

            setTimeout(() => {
                setResultChanged(true);
            });
        }

        setIsDotClicked(false);

    };

    const changeStateResult = (resultArg, ansArg, inputArg) => {
        setResult(resultArg)

        setAns(ansArg);

        setInput(inputArg)
    }

    /**
     * Put result in Memory
     */
    const memoryResult = () => {

        if (isEqualClicked || (ans === '' && result === ''))
        {
            setAns('Ans');

            let newInput = input === 'Error' ? '0' : input;

            setResult(newInput)
        }

    }

    const onClickPad = (value) => {

        if (!sign.includes(value)) {

            memoryResult();

            setClearBtn('CE');

            let oldInput = input ? input : '0';

            let newInput = value;

            if (oldInput !== '0' && !isEqualClicked) // reset input screen after click on equal OR
            {
                const letters = oldInput.split(' ');
                const lastLetter = letters[letters.length - 1];
                const beforeLastLetter = letters[letters.length - 2];


                let space = ' ';

                // exemple input: 4 x 0 ===> lastLetter = 0 and input's length = 3
                if(letters.length > 1 && lastLetter === '0') {

                    if(value === '0') { // don't repeat 0 if it's at the beginning of input
                        newInput = oldInput;
                    } else {
                        // replace the 0 with the value :
                        // eg : input= '3 x 0' and value = 1,  3 x 0 ===> 3 x 1
                        letters.pop()
                        newInput = letters.join(' ') + space + value;
                    }

                } else {

                    // no space for a negative OR float number OR integer
                    if (isNumber(lastLetter)
                        || lastLetter === '.'
                        || oldInput === '-'
                        || (operator.includes(beforeLastLetter) && lastLetter === '-')) // NEG num
                    {
                        space = ''
                    }

                    newInput = oldInput + space + value;
                }


                // it's already a float number, put the flag ON to prevent another .
                if (lastLetter.indexOf('.') > -1) {
                    setIsDotClicked(true);
                }
            }

            setInput(newInput)

        } else {
            // nothing to do for parentheis and percentage

            displayAddMessage();
            setIsDotClicked(false);
        }

        setIsEqualClicked(false);

    }

    const onClickClearBtn = (value) => {

        if (value === 'AC') { //reset button
            memoryResult()

            setInput('0')
        } else {

            let oldInput = input ? input : '0';
            let letters = oldInput.split('');
            const beforeLastLetter = letters[letters.length - 2];

            let newInput;
            if (letters.length > 1) {
                letters.pop();
                if (beforeLastLetter === ' ') {
                    letters.pop();
                }

                newInput = letters.join('')
            } else {
                newInput = '0';
            }

            setInput(newInput)

        }
    }

    const onClickOperator = (value) => {
        setClearBtn('CE')

        memoryResult();

        let oldInput = input ? input : '0';

        const letters = oldInput.trim().split(' ');
        const lastLetter = letters[letters.length - 1];
        const beforeLastLetter = letters[letters.length - 2];

        let newInput = oldInput;


        if (isNumber(lastLetter) || lastLetter === '.') {
            // if lastInput is a number (ex:1234) ou decimal (4.), add operator with space
            newInput = oldInput + ' ' + value;
        } else {

            /*
             *  if oldInput is like "45 x" (lastLetter is not number AND before lastLetter is a number),
             *       1_ 'x' or '/' is the last Letter (not number) AND current operator is '-':
             *          => input: "45 x -"
             *       2_ otherwise, replace the lastLetter to the current operator
             */
            // if + or - and current operator is [x/+-], replace the lastLetter to the current operator
            const oldInputSubstr = oldInput.substring(0, oldInput.length - 1);
            if (isNumber(beforeLastLetter) && !isNumber(lastLetter)) {
                if (['÷', '×'].includes(lastLetter) && value === '-') {
                    newInput = oldInput + ' ' + value;
                } else {
                    newInput = oldInputSubstr + value;
                }
            } else {
                if(beforeLastLetter === '.' && operator.includes(lastLetter)) {
                    newInput = oldInputSubstr + value;
                }
            }

        }

        if (input === 'Error') {
            if (value !== '-') {
                newInput = '0 ' + value;
            } else {
                newInput = value;
            }

        }

        if(oldInput === '0' && value === '-') {
            newInput = value;
        }

        setInput(newInput);

        setIsEqualClicked(false);
        setIsDotClicked(false);
    }

    const onClickDecimal = () => {
        if (!isDotClicked) {

            memoryResult();

            let oldInput = input ? input : '';
            const letters = oldInput.split(' ');
            const lastLetter = letters[letters.length - 1];
            const beforeLastLetter = letters[letters.length - 2];

            let space = ' ';

            if (isNumber(lastLetter)
                || operator.includes(beforeLastLetter)) {
                space = '';
            }

            let newInput;

            if (isEqualClicked) {
                newInput = '.';
            } else {
                newInput = oldInput + space + '.';
            }

            setInput(newInput)
        }


        setClearBtn('CE')
        setIsEqualClicked(false);
        setIsDotClicked(true);
    }

    const isNumber = (num) => {
        return (typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '';
    };

    const displayAddMessage = () => {
        Store.addNotification({
            title: "Not available",
            message: "This button is not available yet. Please wait..",
            type: "info",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    };
    return (
        <div className="App">
            <ReactNotifications />
            <Wrapper>
                <ScreenBox>
                    <Output result={result} memo={ans} animate={resultChanged}/>
                    <Input input={input} animate={resultChanged}/>
                </ScreenBox>
                <ButtonBox>
                    {pad.map((row, i) => {
                        return <tr key={i}>
                            {row.map((btn, j) => {

                                return <Button
                                    key={j}
                                    value={ACCE.includes(btn) ? clearBtn : btn}
                                    className={btn === '='
                                        ? 'btn-equal'
                                        : operator.includes(btn)
                                            ? 'btn-operator'
                                            : ACCE.includes(btn)
                                                ? 'btn-clear'
                                                : sign.includes(btn)
                                                    ? 'btn-sign'
                                                    : 'btn-number'
                                    }
                                    onClick={btn === '='
                                        ? onClickEqual.bind(this)
                                        : operator.includes(btn)
                                            ? onClickOperator.bind(this, btn)
                                            : btn === '.'
                                                ? onClickDecimal.bind(this)
                                                : ACCE.includes(btn)
                                                    ? onClickClearBtn.bind(this, clearBtn)
                                                    : onClickPad.bind(this, btn)}

                                />
                            })}
                        </tr>

                    })}

                </ButtonBox>
            </Wrapper>
        </div>
    );
}

export default App;
