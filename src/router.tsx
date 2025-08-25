import {
    createBrowserRouter,
    Navigate,
    Outlet,
} from "react-router-dom";

import DashboardOverview from "./pages/dashboard/DashboardOverview";
import SettingsPage from "./pages/dashboard/SettingsPage";
import LoginWrapper from "./components/custom/wrapper/login.wrapper";
import DashboardLayout from "./layout/DashboardLayout";
import OtpVerificationPage from "./pages/auth/OtpVerificationPage";
import PhoneNumberLoginPage from "./pages/auth/PhoneNumberLoginPage";
import TicketsPage from "./pages/dashboard/TicketsPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import PaymentsPage from "./pages/dashboard/PaymentsPage";
import ClientsPage from "./pages/dashboard/ClientsPage";
import SuperAdminsTable from "./components/custom/user/table/SuperAdminsTable";
import ApartmentLayout from "./layout/ApartmentLayout";
import ApartmentDetailPage from "./pages/dashboard/aparments/ApartmentDetailPage";
import ApartmentMetersPage from "./pages/dashboard/aparments/ApartmentMetersPage";
import ApartmentUsersPage from "./pages/dashboard/aparments/ApartmentUsersPage";
import ApartmentRateConfig from "./pages/dashboard/aparments/ApartmentRateConfig";
import ROUTES from "./constants/ROUTES";
import ApartmentsPage from "./pages/dashboard/aparments";

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
        path: ROUTES.LOGIN,
        element: (
            <LoginWrapper>
                <PhoneNumberLoginPage />
            </LoginWrapper>
        ),
    },
    {
        path: ROUTES.VERIFICATION,
        element: (
            <LoginWrapper>
                <OtpVerificationPage />
            </LoginWrapper>
        ),
    },

    // Protected dashboard routes
    {
        path: ROUTES.DASHBOARD.OVERVIEW,
        element: dashboardRoutes,
        children: [
            { path: "", element: <DashboardOverview /> },
            { path: ROUTES.DASHBOARD.CLIENTS, element: <ClientsPage /> },
            { path: ROUTES.DASHBOARD.SUPERADMINS, element: <SuperAdminsTable /> },
            { path: ROUTES.DASHBOARD.APARTMENTS, element: <ApartmentsPage /> },
            { path: ROUTES.DASHBOARD.TICKETS, element: <TicketsPage /> },
            { path: ROUTES.DASHBOARD.PAYMENTS, element: <PaymentsPage /> },
            { path: ROUTES.DASHBOARD.NOTIFICATIONS, element: <NotificationsPage /> },
            { path: ROUTES.DASHBOARD.SETTINGS, element: <SettingsPage /> },
            {
                path: ROUTES.DASHBOARD.APARTMENT_DETAIL,
                element: <ApartmentLayout />,
                children: [
                    { path: "", element: <ApartmentDetailPage /> },
                    { path: "meters", element: <ApartmentMetersPage /> },
                    { path: "users", element: <ApartmentUsersPage /> },
                    { path: "rate-config", element: <ApartmentRateConfig /> },
                ]
            },
        ],
    },

    // Redirect root & unknown paths
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

