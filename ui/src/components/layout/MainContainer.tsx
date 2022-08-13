import {
    Container
} from "@mui/material";
import {Outlet} from "react-router";
import Header from "./Header";


export const MainContainer = () => {
    return (
        <Container>
            <Header/>
            <Outlet/>
        </Container>
    );
};
