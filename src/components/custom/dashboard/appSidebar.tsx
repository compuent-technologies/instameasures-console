import * as React from "react";
import {
  Bell,
  Building,
  CreditCard,
  HomeIcon,
  TicketIcon,
  User2,
  Users2,
} from "lucide-react";

import { NavMain } from "./nav-main";
// import { NavProjects } from "./nav-projects";
// import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
// import logo from '@/assets/react.svg'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import ROUTES from "@/constants/ROUTES";
import applogo from "@/assets/logo.png";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Instameasure",
      url: applogo,

      plan: "BridgeTech Innovations llp",
    },
  ],
  dashboard: [
    {
      title: "Overview",
      url: ROUTES.DASHBOARD.OVERVIEW,
      icon: HomeIcon,
      isActive: false,
    },
  ],
  navMain: [
    {
      title: "SuperAdmins",
      url: ROUTES.DASHBOARD.SUPERADMINS,
      icon: User2,
    },
    {
      title: "Apartments",
      url: ROUTES.DASHBOARD.APARTMENTS,
      icon: Building,
      isActive: true,
    },
    {
      title: "Clients",
      url: ROUTES.DASHBOARD.CLIENTS,
      icon: Users2,
    },
    {
      title: "Tickets",
      url: ROUTES.DASHBOARD.TICKETS,
      icon: TicketIcon,
    },
    {
      title: "Notifications",
      url: ROUTES.DASHBOARD.NOTIFICATIONS,
      icon: Bell,
    },
    {
      title: "Payments",
      url: ROUTES.DASHBOARD.PAYMENTS,
      icon: CreditCard,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant='inset' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.dashboard} title="Overview" />
        <NavMain items={data.navMain} title="Menus" />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
