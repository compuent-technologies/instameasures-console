import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export function DynamicBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="hidden md:block mt-0.5">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const formatted = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <span className="text-black dark:text-white font-medium">
                  {formatted}
                </span>
              ) : (
                <>
                  <Link href={href}>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-zinc-700 dark:text-zinc-400"
                    >
                      {formatted}
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
  );
}
