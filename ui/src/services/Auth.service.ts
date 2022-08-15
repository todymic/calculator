import Client from "../utils/HttpClient";
import {UserInterface} from "../types/User.interface";

export interface ILoginForm {
    email: string,
    password: string
}

export interface IRegisterForm extends ILoginForm {
}

/*
 * Login and put in LocalStorage the user if authentication succeed
 */
const login = async (payload: ILoginForm): Promise<UserInterface> => {
    const response = await Client.post(`/login`, payload)
    return response.data.user
};

const getCurrentUser = async (): Promise<UserInterface> => {
    const response = await Client.get(`/users/me`);
    return response.data
}

const register = async (data: IRegisterForm) => {
    const response = await Client.post<any>("/register", data);
    return response.data
};

const AuthService = {
    login,
    getCurrentUser,
    register
};

export default AuthService;
