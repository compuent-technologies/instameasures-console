"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { sendOtpWithRoleCheck } from "@/store/slices/auth-slice";

export default function PhoneNumberLoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        sendOtpWithRoleCheck({
          phoneNumber,
          containerId: "recaptcha-container",
          requiredRole: "admin", // change as needed
        })
      );

      if (sendOtpWithRoleCheck.fulfilled.match(result)) {
        // navigate to OTP verification page
        navigate("/verify-otp");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in with Phone
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your registered phone number
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Phone Login</CardTitle>
            <CardDescription className="text-center">
              Enter your phone number to receive OTP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  <span>Send OTP</span>
                )}
              </Button>
            </form>

            <Separator className="my-4" />

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have access?{" "}
                <Button variant="link" className="p-0 h-auto">
                  Contact administrator
                </Button>
              </p>
            </div>

            {/* Invisible reCAPTCHA container */}
            <div id="recaptcha-container"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
