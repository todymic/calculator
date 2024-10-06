import { InputInterface } from "../types/Calcul.Interface";
import { ansScreen, inputScreen, resultScreen, ScreenValue } from "../redux/ScreenSlice";
import { store } from "../redux/Store";

const getResult = async ( input: InputInterface ): Promise<any> => {

    const user = localStorage.getItem('user');
    const currentUser = user ? JSON.parse(user) : null;

    return await fetch(process.env.REACT_APP_API_URL + "/calcul", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser?.apiToken}`
        },
        body: JSON.stringify(input)
    });

};



const calculRequest = (screen: ScreenValue) => {

    if(localStorage.getItem('user')) {
        const {input, formattedInput} = screen;
        CalculatorService.getResult(formattedInput)
            .then(  // get result if user logged
                async (res) =>  {
                    if(res.status === 201) {

                        let response = await res.json();

                        const inputResult: string = input.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\.0 /g, '. ');

                        if (response.result) {
                            store.dispatch(inputScreen(response.result));
                        }

                        store.dispatch(resultScreen(''));
                        store.dispatch(ansScreen(inputResult));

                    }



                }
            )
            .catch(() => {

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
