import {createContext} from "react";
import {UserInterface} from "../types/User.interface";
import {ILoginForm, IRegisterForm} from "../services/Auth.service";

interface AppContextInterface {
    user?: UserInterface;
    loading: boolean;
    error?: any;
    login: (payload: ILoginForm) => void;
    signUp: (payload: IRegisterForm) => void;
    logout: () => void;
}

const AuthContext = createContext<AppContextInterface>({} as AppContextInterface);
export default AuthContext;
