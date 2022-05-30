import './App.css';
import React, {Component} from 'react';
import Wrapper from './components/wrapper/Wrapper';
import ScreenBox from "./components/screen/Screen";
import Output from "./components/screen/Output";
import Input from "./components/screen/Input";
import ButtonBox from "./components/Button/ButtonBox";
import Button from "./components/Button/Button";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            input: 0,
            ans: ''
        };
        this.pad = [
            ['(', ')', '%', 'C'],
            ['7', '8', '9', '÷'],
            ['4', '5', '6', '×'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+'],
        ];
        this.operator = ['+', '-', '×', '÷'];
        this.sign = ['C', '%', '(', ')'];

        this.isEqualClicked = false; // flag for equal
        this.isDotClicked = false; // flag for '.' btn

    }

    componentDidMount() {
    }

    onClickEqual() {

        // console.log(this.state.input, this.state.input.search(/\s\.\s/));
        // console.log(/\. /g.test(this.state.input), this.state.input.replace(/\. /g, '.0'));

        if (!this.operator.includes(this.state.input.slice(-1))
            && this.state.input.search('Infinity') === -1
            && !this.isEqualClicked
        ) {
            // construct the url of the API call
            const url = `${process.env.REACT_APP_API_URL}/calcul`;

            const input = this.state.input.replace(/\×/g, '*').replace(/\÷/g, '/').replace(/\. /g, '.0 ');

            // if Infinity, don't call the API
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({'input': input})
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        const input = this.state.input.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\.0 /g, '. ');

                        if (result.result) {

                            this.setState({
                                input: result.result
                            })
                        } else {

                            this.setState({
                                input: result.error
                            })
                        }

                        this.setState({
                            result: ''
                        })

                        this.setState({
                            ans: input
                        });
                    }
                )

            this.isEqualClicked = true;

        } else {

            if (this.state.input.search('Infinity') > -1) {

                this.setState({
                    input: 'Infinity'
                })

                this.setState({
                    ans: this.state.input
                });
            }

        }


        this.state.isDotClicked = false;
    }

    putCalcInMemo() {

        if (this.isEqualClicked) {
            this.setState({
                ans: 'Ans'
            });

            this.setState({
                result: this.state.input
            })
        }

    }


    onClickPad(value) {

        if (!this.sign.includes(value)) {

            this.putCalcInMemo();

            let oldInput = this.state.input ? this.state.input : '0';

            let input = value;

            console.log(oldInput);
            if (oldInput !== '0' && !this.isEqualClicked) // reset input screen after click on equal OR
            {
                const letters = oldInput.split(' ');
                const lastLetter = letters[letters.length - 1];
                const beforeLastLetter = letters[letters.length - 2];

                // If the last letter is a [0-9] || '.' , remove new Input without space between them,
                // Or if the two last letters are '* -' or '/ -' , the new input will be a negative number => add input after sign without space
                // If the two last letters are '-.', it will be a negative float number
                let space = ' ';

                if (this.isNumber(lastLetter)
                    || lastLetter === '.'
                    || lastLetter === '-.'
                    || (!this.isNumber(beforeLastLetter) && lastLetter === '-')) // NEG num
                {
                    space = ''
                }

                input = oldInput + space + value;

                // it's already a float number, put the flag on to prevent another .
                if (lastLetter.indexOf('.') > -1) {
                    this.state.isDotClicked = true;
                }
            }

            this.setState({
                'input': input
            })


        } else {

            if (value === 'C') { //reset button

                this.putCalcInMemo()

                this.setState({
                    'input': 0
                })
            }

            // nothing to do for parentheis and percentage
            this.isDotClicked = false;
        }

        this.isEqualClicked = false;

    }

    onClickOperator(value) {

        this.putCalcInMemo();

        let oldInput = this.state.input ? this.state.input : '0';

        const letters = oldInput.split(' ');
        const lastLetter = letters[letters.length - 1];
        const beforeLastLetter = letters[letters.length - 2];

        let newInput = oldInput;


        if (this.isNumber(lastLetter) || lastLetter === '.') {
            // if lastInput is a number (ex:1234) ou decimal (4.), add operator with space
            newInput = oldInput + ' ' + value;
        } else {

            /*
             *  if oldInput is like "45 x" (lastLetter is not number AND before lastLetter is a number),
             *       1_ 'x' or '/' is the last Letter (not number) AND current operator is '-':
             *          => input: "45 x -"
             *       2_ otherwise, replace the lastLetter to the current operator
             */
            if (this.isNumber(beforeLastLetter) && !this.isNumber(lastLetter)) {
                if (['÷', '×'].includes(lastLetter) && value === '-') {
                    newInput = oldInput + ' ' + value;
                } else {
                    // if + or - and current operator is [x/+-], replace the lastLetter to the current operator
                    const oldInputSubstr = oldInput.substring(0, oldInput.length - 1);
                    newInput = oldInputSubstr + value;
                }

            }

        }

        this.setState({
            'input': newInput
        });

        this.isEqualClicked = false;
        this.isDotClicked = false;
    }

    onClickDecimal() {

        if (!this.isDotClicked) {

            this.putCalcInMemo();

            let oldInput = this.state.input ? this.state.input : '';
            const letters = oldInput.split(' ');
            const lastLetter = letters[letters.length - 1];
            const beforeLastLetter = letters[letters.length - 2];

            let space = ' ';

            if (this.isNumber(lastLetter)
                || this.operator.includes(beforeLastLetter)) {
                space = '';
            }

            let newInput;

            if (this.isEqualClicked) {
                newInput = '.';
            } else {
                newInput = oldInput + space + '.';
            }

            this.setState({
                'input': newInput
            })
        }


        this.isEqualClicked = false;
        this.isDotClicked = true;
    }

    isNumber(num) {
        return (typeof num == 'string' || typeof num == 'number') && !isNaN(num - 0) && num !== '';
    };

    render() {
        // get the status from the state

        return (
            <div className="App">
                <Wrapper>
                    <ScreenBox>
                        <Output result={this.state.result} memo={this.state.ans}/>
                        <Input input={this.state.input}/>
                    </ScreenBox>
                    <ButtonBox>
                        {this.pad.map((row, i) => {
                            return <tr key={i}>
                                {row.map((btn, j) => {

                                    return <Button
                                        key={j}
                                        value={btn}
                                        className={btn === '='
                                            ? 'equals' : this.operator.includes(btn) || this.sign.includes(btn)
                                                ? 'operator' : 'number'
                                        }
                                        onClick={btn === '='
                                            ? this.onClickEqual.bind(this) : this.operator.includes(btn)
                                                ? this.onClickOperator.bind(this, btn) : btn === '.'
                                                    ? this.onClickDecimal.bind(this) : this.onClickPad.bind(this, btn)}

                                    />
                                })}
                            </tr>

                        })}

                    </ButtonBox>
                </Wrapper>

            </div>
        );
    }
}

export default App;
