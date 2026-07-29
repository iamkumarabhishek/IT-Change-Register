import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AddLetterPage from "../pages/Letter/AddLetterPage";
import CreateUserPage from "../pages/Users/CreateUserPage";
import ForgotPasswordPage from "../pages/Login/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Login/ResetPasswordPage.jsx"

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                {/* Letter Module */}

                <Route
                    path="/letters/add"
                    element={<AddLetterPage />}
                />
                {/* create user Module */}
                <Route
                    path="/users/add"
                    element={<CreateUserPage />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;