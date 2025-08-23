/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  // const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  const toggleTheme = () => {
    if (isDarkMode === null) return;
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

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
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-blue-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-blue-500" />
              )}
            </Button>
          </div>
        </header>
        <main className="flex flex-col flex-1 p-6">{children}</main>
        <footer className="w-full dark:bg-black py-6 text-center">
          <span className="text-sm dark:text-white">
            &copy; {new Date().getFullYear()} Created By
            <a
              href="https://www.linkedin.com/in/iamprathameshmore/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:underline text-blue-500 ml-2">
                @iamprathameshmore
              </span>
            </a>
          </span>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
