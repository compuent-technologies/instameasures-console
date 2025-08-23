"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component: React.ComponentType) {
  return function AuthComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem("token"); // Read token from session

      if (!token) {
        router.push("/login"); // Redirect if no token
      }
    }, [router]);

    return <Component {...props} />;
  };
}
