import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Homepage from "./components/layout/Homepage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserCars from "./components/user/UserCars"
import CarSearch from "./components/cars/CarSearch";
import CarInfo from "./components/cars/CarInfo";
import CarEdit from "./components/cars/CarEdit";
import MOTForm from "./components/cars/MOTForm";
import AuthContext from "./context/AuthContext";
import AddInsurance from "./components/cars/AddInsurance";
import ResNavbar from "./components/layout/ResNavbar";
import AddCar from "./components/cars/AddCar";
import UserPanel from "./components/user/UserPanel";
import UserSearch from "./components/user/UserSearch"
import UserTransactions from "./components/user/UserTransactions";

function Router() {
    const {loggedIn} = useContext(AuthContext);
    const loggedRoutes = () => {
        if (!loggedIn) {
            return (
                    <>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </>
                )}
        else {
        return(
            <>
            <Switch>
                <Route exact path="/car/edit/:id">
                    <CarEdit />
                </Route>
                <Route exact path="/car/mot/:id">
                    <MOTForm />
                </Route>
                <Route path="/car/search">
                    <CarSearch/>
                </Route>
                <Route path="/car/add">
                    <AddCar />
                </Route>
                <Route exact path="/car/:id">
                    <CarInfo />
                </Route>
                <Route path="/car">
                    <UserCars />
                </Route>
            </Switch>
                <Route exact path="/oc/:id/">
                    <AddInsurance />
                </Route>
                <Route path="/carsearch">
                    <CarSearch/>
                </Route>
                <Route path="/usersearch">
                    <UserSearch/>
                </Route>
                <Route path="/trans">
                    <UserTransactions />
                </Route>
                <Route path="/userpanel">
                    <UserPanel/>
                </Route>
            </>
        )
        }
    }
    return <BrowserRouter>
        <ResNavbar/>
            <Route exact path="/">
                <Homepage/>
            </Route>
            {loggedRoutes()}
    </BrowserRouter>;
}

export default Router;
