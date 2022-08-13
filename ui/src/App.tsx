import './App.css';
import React from 'react';
import 'react-notifications-component/dist/theme.css';


import Calculator from "./components/Calculator";
import {Route, Routes } from 'react-router';
import {MainContainer} from "./components/layout/MainContainer";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<MainContainer />}>
                <Route index element={<Calculator />} />
                {/*<Route path="users">*/}
                {/*    <Route path=":id">*/}
                {/*        <Route index element={<Profile />} />                        */}
                {/*    </Route>*/}
                {/*</Route>*/}
            </Route>
        </Routes>
    );
}

export default App;
