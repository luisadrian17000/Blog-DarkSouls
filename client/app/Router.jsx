import { Routes, Route } from "react-router-dom";
import Home from "../presentation/pages/Home.jsx";
import Characters from "../presentation/pages/Characters.jsx";
import Locations from "../presentation/pages/Locations.jsx";
import Login from "../presentation/pages/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route
                path="/characters"
                element={
                    <PrivateRoute>
                        <Characters />
                    </PrivateRoute>
                }
            />

            <Route
                path="/locations"
                element={
                    <PrivateRoute>
                        <Locations />
                    </PrivateRoute>
                }
            />

            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default AppRouter;