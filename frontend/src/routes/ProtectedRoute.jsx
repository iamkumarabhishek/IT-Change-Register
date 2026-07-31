import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const user = sessionStorage.getItem("user");

    if (!user) {
        sessionStorage.clear();
        return <Navigate to="/" replace />;
    }

    return children;

}

export default ProtectedRoute;