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

const getCurrentUser = (): UserInterface|undefined => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as UserInterface : undefined;

    // const response = await Client.get(`/users/me`, {
    //     headers: {
    //         'Authorization': `Bearer ${currentUser?.apiToken}`
    //     }
    // });

}

const register = async (data: IRegisterForm): Promise<UserInterface> => {
    const response = await Client.post<any>("/register", data);
    return response.data
};

const AuthService = {
    login,
    getCurrentUser,
    register
};

export default AuthService;
