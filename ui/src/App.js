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
            result: 0,
            input: 0
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

    }

    componentDidMount() {
    }

    onClickEqual() {
    }

    onClickPad(value) {

        if (!this.sign.includes(value)) {
            let oldInput = this.state.input ? this.state.input : '';

            const letters = oldInput.split(' ');
            const lastLetter = letters[letters.length - 1];
            const beforeLastLetter = letters[letters.length - 2];

            // if the last letter is a number or ., remove space between the last and the new input,
            let space = ' ';
            if (this.isNumber(lastLetter)
                || lastLetter === '.'
                || (!this.isNumber(lastLetter) && !this.isNumber(beforeLastLetter))) {
                space = ''
            }

            let input;
            if (oldInput === '0') {
                input = value;
            } else {
                input = oldInput + space + value;
            }

            this.setState({
                'input': input
            })
        } else {
            if (value === 'C') {
                this.setState({
                    'input': 0
                })
            }
        }

    }

    onClickOperator(value) {

        let oldInput = this.state.input ? this.state.input : '0';

        const letters = oldInput.split(' ');
        const lastLetter = letters[letters.length - 1];
        const beforeLastLetter = letters[letters.length - 2];

        let newInput = oldInput;

        if (this.isNumber(lastLetter) || lastLetter === '.') {

            if (oldInput !== '0') {
                newInput = oldInput + ' ' + value;
            }

        } else {
            // if
            if (this.isNumber(beforeLastLetter) && !this.isNumber(lastLetter)) {
                const oldInputSubstr = oldInput.substring(0, oldInput.length - 1);

                if (value !== '-') {
                    newInput = oldInputSubstr + value;
                } else {

                    if (['÷', '×'].includes(lastLetter)) {
                        newInput = oldInput + ' ' + value;

                    } else {
                        newInput = oldInputSubstr + value;
                    }

                }
            }

        }

        this.setState({
            'input': newInput
        });
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
                        <Output result={this.state.result}/>
                        <Input input={this.state.input}/>
                    </ScreenBox>
                    <ButtonBox>
                        {this.pad.map((row, i) => {
                            return <tr key={i}>
                                {row.map((btn, j) => {

                                    return <Button
                                        key={j}
                                        value={btn}
                                        className={btn === '=' ? 'equals' : this.operator.includes(btn) || this.sign.includes(btn) ? 'operator' : 'number'}
                                        onClick={btn === '=' ? this.onClickEqual.bind(this, btn) : this.operator.includes(btn) ? this.onClickOperator.bind(this, btn) : this.onClickPad.bind(this, btn)}
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
