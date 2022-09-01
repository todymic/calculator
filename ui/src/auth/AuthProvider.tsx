import {ReactNode, useState, useEffect, useMemo, useContext} from 'react';
import AuthContext from './AuthContext'
import {UserInterface} from "../types/User.interface";
import AuthService, {ILoginForm, IRegisterForm} from "../services/Auth.service";


export const AuthProvider = ({children}: { children: ReactNode }): JSX.Element => {

    const [user, setUser] = useState<UserInterface|undefined>({} as UserInterface);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);


    useEffect(() => {
        setUser(AuthService.getCurrentUser());
        setLoadingInitial(false)
    }, []);


    const login = async (payload: ILoginForm) => {
        setLoading(true);

        return AuthService.login(payload)
            .then((user: UserInterface) => {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user))
                if (error) setError(null);

            })
            .catch((error) => setError(error.response.data.error))
            .finally(() => setLoading(false));
    }

    const signUp = (data: IRegisterForm) => {
        setLoading(true);

        return AuthService.register(data)
            .then((user) => {
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user))
                if (error) setError(null);
            })
            .catch((error) => setError(error.response.data.error))
            .finally(() => setLoading(false));
    }

    const logout = () => {
        setUser({});
        localStorage.removeItem('user')
    }

    const memoedValue = useMemo(() => ({
            user,
            loading,
            error,
            login,
            signUp,
            logout,
        }),
        [user, loading, error]
    );
    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
