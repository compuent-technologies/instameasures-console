// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch, RootState } from "@/store";
// import { fetchDashboardStats, fetchRevenueStats } from "@/features/dashboard/dashboardSlice";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Building2, Users, Receipt, Gauge, Calendar, AlertTriangle
// } from "lucide-react";
// import CountUp from "react-countup";

// const dashboardCards = [
//   { title: "Total Apartments", value: 0, icon: Building2, description: "Managed properties", color: "text-blue-600", bgColor: "bg-blue-50", route: "/dashboard/apartments" },
//   { title: "Total Users", value: 0, icon: Users, description: "Registered users", color: "text-green-600", bgColor: "bg-green-50", route: "/dashboard/users" },
//   { title: "Total Bills", value: 0, icon: Receipt, description: "Generated bills", color: "text-purple-600", bgColor: "bg-purple-50", route: "/dashboard/bills" },
//   { title: "Total Meters", value: 0, icon: Gauge, description: "Installed meters", color: "text-orange-600", bgColor: "bg-orange-50", route: "/dashboard/meters" },
// ];

// export default function DashboardOverview() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { stats, revenue, loading, error } = useSelector(
//     (state: RootState) => state.dashboard
//   );

//   useEffect(() => {
//     dispatch(fetchDashboardStats());
//     dispatch(fetchRevenueStats("monthly"));
//   }, [dispatch]);

//   const updatedCards = dashboardCards.map((card) => {
//     if (stats?.data) {
//       switch (card.title) {
//         case "Total Apartments": return { ...card, value: stats.data.totalApartments };
//         case "Total Users": return { ...card, value: stats.data.totalUsers };
//         case "Total Bills": return { ...card, value: stats.data.totalBills };
//         case "Total Meters": return { ...card, value: stats.data.totalMeters };
//       }
//     }
//     return card;
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <AlertTriangle className="h-8 w-8 text-red-500" />
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
//         <Button variant="outline" size="sm">
//           <Calendar className="mr-2 h-4 w-4" /> Today
//         </Button>
//       </div>
//       <Separator />

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {updatedCards.map((card, index) => {
//           const Icon = card.icon;
//           return (
//             <Card key={index} onClick={() => navigate(card.route)} className="cursor-pointer hover:shadow-md">
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm">{card.title}</CardTitle>
//                 <div className={`p-2 rounded-lg ${card.bgColor}`}>
//                   <Icon className={`h-4 w-4 ${card.color}`} />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">
//                   <CountUp end={card.value} duration={2} />
//                 </div>
//                 <p className="text-xs text-muted-foreground">{card.description}</p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Revenue Overview */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Revenue Overview</CardTitle>
//             <CardDescription>Monthly revenue breakdown</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <p>Loading revenue...</p>
//             ) : (
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="text-center text-green-600 font-bold">
//                   ${revenue?.data?.paid?.toLocaleString() || "0"}
//                 </div>
//                 <div className="text-center text-yellow-600 font-bold">
//                   ${revenue?.data?.unpaid?.toLocaleString() || "0"}
//                 </div>
//                 <div className="text-center text-red-600 font-bold">
//                   ${revenue?.data?.overdue?.toLocaleString() || "0"}
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React from 'react'

function DashboardOverview() {
  return (
    <div>DashboardOverview</div>
  )
}

export default DashboardOverview