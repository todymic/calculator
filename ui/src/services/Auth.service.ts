import {UserInterface} from "../types/User.interface";

export interface ILoginForm {
    email: string,
    password: string
}

export interface IRegisterForm extends ILoginForm {
}

/*
 * Login and put in LocalStorage the user if successfully authenticated
 */
const login = async (payload: ILoginForm): Promise<any> => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then(res => res.json())


    return response.user;
};

const getCurrentUser = (): UserInterface|undefined => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as UserInterface : undefined;

}

const register = async (data: IRegisterForm): Promise<UserInterface> => {
    return await fetch(process.env.REACT_APP_API_URL + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
};

const AuthService = {
    login,
    getCurrentUser,
    register
};

export default AuthService;
