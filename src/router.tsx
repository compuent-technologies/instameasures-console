import {
    createBrowserRouter,
    Navigate,
    Outlet,
} from "react-router-dom";

import DashboardOverview from "./pages/dashboard/DashboardOverview";
import UsersPage from "./pages/dashboard/UsersPage";
import ApartmentsPage from "./pages/dashboard/ApartmentsPage";
import BillsPage from "./pages/dashboard/BillsPage";
import MetersPage from "./pages/dashboard/MetersPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import LoginWrapper from "./components/custom/wrapper/login.wrapper";
// import AuthWrapper from "./components/custom/wrapper/auth.wrapper";
import DashboardLayout from "./layout/dashboard-layout";
import OtpVerificationPage from "./pages/auth/OtpVerificationPage";
import PhoneNumberLoginPage from "./pages/auth/PhoneNumberLoginPage";

// Protected dashboard routes
const dashboardRoutes = (
    // <AuthWrapper>
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
    // </AuthWrapper>
);


export const router = createBrowserRouter([
    // Public routes
    {
        path: "/login",
        element: (
            <LoginWrapper>
                <PhoneNumberLoginPage />
            </LoginWrapper>
        ),
    },
    {
        path: "/verification",
        element: (
            <LoginWrapper>
                <OtpVerificationPage />
            </LoginWrapper>
        ),
    },

    // Protected dashboard routes
    {
        path: "/dashboard",
        element: dashboardRoutes,
        children: [
            { path: "", element: <DashboardOverview /> },
            { path: "users", element: <UsersPage /> },
            { path: "apartments", element: <ApartmentsPage /> },
            { path: "bills", element: <BillsPage /> },
            { path: "meters", element: <MetersPage /> },
            { path: "settings", element: <SettingsPage /> },
            {
                path: "feedback",
                element: (
                    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6" >
                        <h2 className="text-3xl font-bold tracking-tight"> Feedback </h2>
                        < p className="text-center text-muted-foreground py-12" >
                            Feedback page coming soon...
                        </p>
                    </div>
                ),
            },
            {
                path: "developer",
                element: (
                    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6" >
                        <h2 className="text-3xl font-bold tracking-tight" > Developer </h2>
                        < p className="text-center text-muted-foreground py-12" >
                            Developer tools coming soon...
                        </p>
                    </div>
                ),
            },
            {
                path: "profile",
                element: (
                    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6" >
                        <h2 className="text-3xl font-bold tracking-tight" > Profile </h2>
                        < p className="text-center text-muted-foreground py-12" >
                            Profile page coming soon...
                        </p>
                    </div>
                ),
            },
        ],
    },

    // Redirect root & unknown paths
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

