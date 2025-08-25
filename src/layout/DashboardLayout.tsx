/* eslint-disable @typescript-eslint/no-unused-vars */

import { useLocation, Link, } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SunIcon, MoonIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/custom/dashboard/appSidebar";
import HelpSupportDialog from "@/components/custom/common/dialog/HelpSupportDialog";
import { useTheme } from "@/hooks/useTheme";
import ChatBot from "@/components/custom/common/chatBot";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatarMenu from "@/components/custom/common/UserAvatarMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  // const navigate = useNavigate();
  const { toggleTheme, isDarkMode } = useTheme();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  const pathSegments = location.pathname
    .split("/")
    .filter((segment: string) => segment);

  return (
    <SidebarProvider className="rounded">
      <AppSidebar />
      <SidebarInset className="rounded">
        <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2 justify-center">
            <SidebarTrigger className="dark:text-white" />
            <Breadcrumb className="hidden md:block mt-0.5">
              <BreadcrumbList>
                {pathSegments.map((segment: string, index: number) => {
                  const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathSegments.length - 1;
                  const formattedSegment = segment
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char: string) => char.toUpperCase());
                  return (
                    <BreadcrumbItem key={href}>
                      {isLast ? (
                        <Button
                          size="sm"
                          variant="link"
                          className="dark:text-white text-black"
                        >
                          {formattedSegment}
                        </Button>
                      ) : (
                        <>
                          <Link to={href}>
                            <Button
                              size="sm"
                              variant="link"
                              className="dark:text-zinc-400 text-zinc-700"
                            >
                              {formattedSegment}
                            </Button>
                          </Link>
                          <span className="mx-2">/</span>
                        </>
                      )}
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-3">

            <HelpSupportDialog />
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-blue-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-blue-500" />
              )}
            </Button>
            <UserAvatarMenu />

          </div>
        </header>
        <main className="flex flex-col flex-1 p-6">{children}</main>
        <ChatBot />
      </SidebarInset>
    </SidebarProvider>
  );
}
