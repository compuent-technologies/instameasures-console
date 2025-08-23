import * as React from "react";
import {
  Building,
  Calculator,
  Frame,
  HomeIcon,
  Map,
  ParkingMeter,
  PieChart,
  SquaresExcludeIcon,
  TicketIcon,
  UserSquare2Icon,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import ROUTES from "@/constants/route-constants";

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
      logo: SquaresExcludeIcon,
      plan: "BridgeTech Innovvation llp",
    },
  ],
  dashboard: [
    {
      title: "Overview",
      url: ROUTES.DASHBOARD.OVERVIEW,
      icon: HomeIcon,
      isActive: true,
    },
  ],
  navMain: [
    {
      title: "Apartments",
      url: ROUTES.DASHBOARD.APARTMENT,
      icon: Building,
      isActive: true,
    },

    {
      title: "Users",
      url: ROUTES.DASHBOARD.USERS,
      icon: UserSquare2Icon,
    },
    {
      title: "Meters",
      url: ROUTES.DASHBOARD.METERS,
      icon: ParkingMeter,
    },
    {
      title: "Bills",
      url: ROUTES.DASHBOARD.BILLS,
      icon: Calculator,
    },
    {
      title: "Tickets",
      url: ROUTES.DASHBOARD.TICKETS,
      icon: TicketIcon,
    },
  ],
  projects: [
    {
      name: "Logs",
      url: ROUTES.DASHBOARD.LOGS,
      icon: Frame,
    },
    {
      name: "Settings",
      url: ROUTES.DASHBOARD.SETTINGS,
      icon: PieChart,
    },
    {
      name: "Feedback",
      url: ROUTES.DASHBOARD.FEEDBACK,
      icon: Map,
    },
    {
      name: "Developer",
      url: ROUTES.DASHBOARD.DEVELOPER,
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.dashboard} title="Overview" />
        <NavMain items={data.navMain} title="Menus" />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
