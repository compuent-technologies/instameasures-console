// src/pages/apartments/ApartmentLayout.tsx
import { NavLink, Outlet } from "react-router-dom";

const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Residents", path: "residents" },
    { name: "Bills", path: "bills" },
    { name: "Comments", path: "comments" },
];

export default function ApartmentLayout() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Apartment</h1>

            {/* Tabs */}
            <div className="flex space-x-4 border-b mb-6">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            `px-4 py-2 -mb-px border-b-2 ${isActive
                                ? "border-blue-600 text-blue-600 font-medium"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`
                        }
                    >
                        {tab.name}
                    </NavLink>
                ))}
            </div>

            {/* Nested routes content */}
            <Outlet />
        </div>
    );
}
