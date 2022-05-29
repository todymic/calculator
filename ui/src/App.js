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
        this.numbers = [
            ['7','8','9','÷'],
            ['4','5','6','×'],
            ['1','2','3','-'],
            ['0','.','=','+'],
        ];
    }

    componentDidMount() {
        // construct the url of the API call
        // const url = `${process.env.REACT_APP_API_URL}/calcul`;
        //
        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify({'input': this.state.input})
        // })
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 result: result.result
        //             })
        //         }
        //     )
    }

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
                        {this.numbers.map((row, i) => {
                            return <tr key={i}>
                                {row.map((btn, j) => {
                                    const operator = ['+', '-', '×', '÷']
                                    return <Button
                                        key={j}
                                        value={btn}
                                        className={btn === '=' ? 'equals' : operator.includes(btn) ? 'operator' : 'number'}
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
