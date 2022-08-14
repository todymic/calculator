import Client from "../utils/HttpClient";
import {InputInterface, ResultInterface} from "../types/Calcul.Interface";
import {AxiosResponse} from "axios";

const getResult = async (input: InputInterface): Promise<AxiosResponse<ResultInterface>> => {
    return await Client.post<ResultInterface>(`/calcul`, input);
};

const CalculatorService = {
    getResult
};

export default CalculatorService;
