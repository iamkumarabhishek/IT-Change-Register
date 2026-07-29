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
import LetterTable from "../pages/Letter/LetterTable.jsx";
import LetterListPage from "../pages/Letter/LetterListPage";
import ReportPage from "../pages/Report/ReportPage.jsx";

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

                <Route
                    path="/letters"
                    element={<LetterListPage />}
                />

                {/* User Module */}

                <Route
                    path="/users/add"
                    element={<CreateUserPage />}
                />

                {/* Password */}

                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />

                {/* Reports */}

                <Route
                    path="/reports"
                    element={<ReportPage />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;