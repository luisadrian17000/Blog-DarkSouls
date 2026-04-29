import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading, user, error } = useAuth0();

    console.log("PrivateRoute debug:", {
        isAuthenticated,
        isLoading,
        user,
        error,
    });

    if (isLoading) return <p>Cargando...</p>;

    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;