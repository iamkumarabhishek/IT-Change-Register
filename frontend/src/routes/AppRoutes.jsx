import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DepartmentPage from "../pages/Department/DepartmentPage";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AddLetterPage from "../pages/Letter/AddLetterPage";
import CreateUserPage from "../pages/Users/CreateUserPage";
import ForgotPasswordPage from "../pages/Login/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Login/ResetPasswordPage";
import LetterListPage from "../pages/Letter/LetterListPage";
import ReportPage from "../pages/Report/ReportPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SetupPage from "../pages/Setup/SetupPage";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Letter Module */}

                <Route
                    path="/letters/add"
                    element={
                        <ProtectedRoute>
                            <AddLetterPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/letters"
                    element={
                        <ProtectedRoute>
                            <LetterListPage />
                        </ProtectedRoute>
                    }
                />

                {/* User Module */}

                <Route
                    path="/users/add"
                    element={
                        <ProtectedRoute>
                            <CreateUserPage />
                        </ProtectedRoute>
                    }
                />

                {/* Reports */}

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <ReportPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/setup"
                    element={
                        <ProtectedRoute>
                            <SetupPage />
                        </ProtectedRoute>
                    }
                />

                {/* Profile */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/departments"
                    element={
                        <ProtectedRoute>
                            <DepartmentPage />
                        </ProtectedRoute>
                    }
                />



            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;