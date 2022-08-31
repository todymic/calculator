import React, {useState} from "react";


import Wrapper from '../components/wrapper/Wrapper';
import ScreenBox from "../components/screen/Screen";
import Output from "../components/screen/Output";
import Input from "../components/screen/Input";
import ButtonBox from "../components/Button/ButtonBox";
import Button from "../components/Button/Button";
import CalculatorService from "../services/Calculator.service";
import {AxiosError} from "axios";
import {InputInterface, ResultInterface} from "../types/Calcul.Interface";
import AuthDialog from "../components/layout/AuthDialog";
import useAuth from "../auth/AuthProvider";
import {Notification} from "../components/tool/Notification";
import {SnackbarOrigin} from "@mui/material/Snackbar/Snackbar";
import {useAppDispatch, useAppSelector} from "../redux/Hook";
import {inputScreen, resultScreen, ansScreen, setFormattedInput} from "../redux/ScreenSlice";

const origin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
}

const Calculator = () => {
    const {user} = useAuth();
    const dispatch = useAppDispatch()
    const screen = useAppSelector(state => state.screen);

    const {result, input, ans} = screen;
    const [clearBtn, setClearBtn] = useState<string>('AC');
    const [resultChanged, setResultChanged] = useState<boolean>(false);
    const [isDotClicked, setIsDotClicked] = useState<boolean>(false);
    const [isEqualClicked, setIsEqualClicked] = useState<boolean>(false);

    //Dialog State
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // Alert State
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    // The pads represantation
    const pad = [
        ['(', ')', '%', 'AC'],
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
    ];

    const operator = ['+', '-', '×', '÷'];
    const unavailableOperator = ['%', '(', ')'];
    const ACCE = ['AC', 'CE'];


    /*
     * On click equal, send the calcul to server
     * If not logged yet, show login/register form in Modal
     */
    const onClickEqual = () => {

        setClearBtn('AC');

        setResultChanged(false);

        if (input.trim() !== '.'
            && !operator.includes(input.slice(-1))
            && input.search('Infinity') === -1
            && !isEqualClicked
        ) {

            const formattedInput: string = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/\. /g, '.0 ');
            // if Infinity, don't call the API
            let data: InputInterface = {
                "input": formattedInput
            }

            dispatch(setFormattedInput(data))

            const token = user!.apiToken ?? '';

            CalculatorService.getResult(data, token)
                .then(  // get result if user logged
                    (result) => {

                        const inputResult: string = input.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\.0 /g, '. ');

                        if (result.data.result) {
                            setInput(result.data.result);
                        }

                        setResult('');

                        setAns(inputResult);

                        setTimeout(() => {
                            setResultChanged(true);
                        });
                    }

                ).catch((error: AxiosError) => {

                    // if user undefined, open Login/register form in modal
                    if (error.response?.status === 401) {
                        setDialogOpen(true)
                    } else {

                        setInput('Error');
                        setResult('');

                        setTimeout(() => {
                            setResultChanged(true);
                        });
                    }

            })

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


    /**
     * Handle the text above the screen result
     * @param resultArg
     * @param ansArg
     * @param inputArg
     */
    const changeStateResult = (resultArg: string, ansArg: string, inputArg: string) => {
        setResult(resultArg)

        setAns(ansArg);

        setInput(inputArg)
    }

    const setInput = (input: string) => {
        dispatch(inputScreen(input))
    }

    const setResult = (result: ResultInterface | string) => {
        dispatch(resultScreen(result))
    }
    const setAns = (ans: string) => {
        dispatch(ansScreen(ans))
    }

    /**
     * Put result in Memory
     */
    const memoryResult = () => {

        if (isEqualClicked || (ans === '' && result === '')) {
            setAns('Ans');

            let newInput = input === 'Error' ? '0' : input;

            setResult(newInput)
        }

    }

    /**
     * Handle click on every numeric buttons
     * @param value
     */
    const onClickPad = (value: string) => {

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
            if (letters.length > 1 && lastLetter === '0') {

                if (value === '0') { // don't repeat 0 if it's at the beginning of input
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

        setInput(newInput);

        setIsEqualClicked(false);

    }

    const onClickUnavaibleButton = (value: string) => {
        showAlert(value + ' will be available soon. Please wait...');
        setIsDotClicked(false);
        setIsEqualClicked(false);
    }

    /**
     * Handle click on Cancel/Clear Button (AC,C)
     */
    const onClickClearBtn = (value: string) => {

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

    /**
     * Handle click on Operator buttons (+,-,*,/)
     */
    const onClickOperator = (value: string) => {
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
                if (beforeLastLetter === '.' && operator.includes(lastLetter)) {
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

        if (oldInput === '0' && value === '-') {
            newInput = value;
        }

        setInput(newInput);

        setIsEqualClicked(false);
        setIsDotClicked(false);
    }

    /**
     * Handle click on '.' button
     */
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

    /**
     * check if value is number
     * @param value
     */
    const isNumber = (value: string | number) => {
        return ((value != null)
            && (value !== '')
            && !isNaN(Number(value.toString())));
    }


    /**
     * Notification component
     * showAlert
     * @param message
     */
    const showAlert = (message: string) => {

        setAlertOpen(true);
        setMessage(message)
    };

    /**
     * Notification component
     * handleAlertClose
     * @param event
     * @param reason
     */
    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };


    /**
     * AuthDialog component
     * Handle onClose event
     * @param message
     */
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div className="calculator-wrapper">
            <AuthDialog open={dialogOpen} onClose={handleDialogClose} setDialogOpen={setDialogOpen}/>
            <Notification open={alertOpen}
                          message={message}
                          origin={origin}
                          onClose={handleAlertClose}
            />
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
                                                : unavailableOperator.includes(btn)
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
                                                    : unavailableOperator.includes(btn)
                                                        ? onClickUnavaibleButton.bind(this, btn)
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

export default Calculator;
