import Client from "../utils/HttpClient";
import {InputInterface, ResultInterface} from "../types/Calcul.Interface";
import {AxiosError, AxiosResponse} from "axios";
import {ansScreen, inputScreen, resultScreen, ScreenValue} from "../redux/ScreenSlice";
import {store} from "../redux/Store";

const getResult = async (input: InputInterface): Promise<AxiosResponse<ResultInterface>> => {

    const user = localStorage.getItem('user');
    const currentUser = user ? JSON.parse(user) : null;

    return await Client.post<ResultInterface>(`/calcul`, input, {
        headers: {
            'Authorization': `Bearer ${currentUser?.apiToken}`
        }
    });
};



const calculRequest = (screen: ScreenValue) => {

    if(localStorage.getItem('user')) {
        const {input, formattedInput} = screen;
        CalculatorService.getResult(formattedInput)
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
}

const CalculatorService = {
    getResult,
    calculRequest
};

export default CalculatorService;
