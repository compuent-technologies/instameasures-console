/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function withAuth(Component: React.ComponentType) {
  return function AuthComponent(props: any) {
    const router = useNavigate();

    useEffect(() => {
      const token = sessionStorage.getItem("token"); // Read token from session

      if (!token) {
        router(''); // Redirect if no token
      }
    }, [router]);

    return <Component {...props} />;
  };
}
