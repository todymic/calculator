import './App.css';
import React from 'react';


import Calculator from "./pages/Calculator";
import {Route, Routes} from 'react-router';
import {MainContainer} from "./components/layout/MainContainer";
import {AuthProvider} from "./auth/AuthProvider";
import Profile from "./pages/Profile";


const App = () => {

    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<MainContainer/>}>
                    <Route index element={
                        <Calculator/>
                    }/>
                    <Route path="users">
                        <Route path=":id">
                            <Route index element={<Profile />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
