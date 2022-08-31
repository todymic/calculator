import Client from "../utils/HttpClient";
import {InputInterface, ResultInterface} from "../types/Calcul.Interface";
import {AxiosError, AxiosResponse} from "axios";
import {UserInterface} from "../types/User.interface";
import {ansScreen, inputScreen, resultScreen, ScreenValue} from "../redux/ScreenSlice";
import {store} from "../redux/Store";

const getResult = async (input: InputInterface, token?: string): Promise<AxiosResponse<ResultInterface>> => {

    return await Client.post<ResultInterface>(`/calcul`, input, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};



const calculRequest = (user: UserInterface | undefined, screen: ScreenValue) => {
    const {input, formattedInput} = screen;

    CalculatorService.getResult(formattedInput, (user as UserInterface).apiToken)
        .then(  // get result if user logged
            (response) =>  {

                const inputResult: string = input.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\.0 /g, '. ');

                if (response.data.result) {
                    store.dispatch(inputScreen(response.data.result));
                }

                store.dispatch(resultScreen(''));
                store.dispatch(ansScreen(inputResult));
            }
        )
        .catch((error: AxiosError) => {

            store.dispatch(inputScreen('Error'));
            store.dispatch(resultScreen(''));

        })


}

const CalculatorService = {
    getResult,
    calculRequest
};

export default CalculatorService;
