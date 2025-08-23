import {

    Navigate,

} from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "../loading/customLoading";



// Login wrapper for login page
export default function LoginWrapper({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    if (loading) return <LoadingScreen />;

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
}
