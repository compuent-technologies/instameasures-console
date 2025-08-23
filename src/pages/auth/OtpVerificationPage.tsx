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
import { verifyOtp } from "@/store/slices/auth-slice";

export default function OtpVerificationPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await dispatch(verifyOtp({ otp }));

            if (verifyOtp.fulfilled.match(result)) {
                // OTP verified successfully
                navigate("/dashboard");
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
                        Verify OTP
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter the OTP sent to your phone
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">OTP Verification</CardTitle>
                        <CardDescription className="text-center">
                            Please enter the 6-digit OTP
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">OTP</Label>
                                <Input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    disabled={loading}
                                    maxLength={6}
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500 text-center">{error}</p>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    <span>Verify OTP</span>
                                )}
                            </Button>
                        </form>

                        <Separator className="my-4" />

                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Didn't receive OTP?{" "}
                                <Button
                                    variant="link"
                                    className="p-0 h-auto"
                                    onClick={() => navigate("/phone-login")}
                                >
                                    Resend OTP
                                </Button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
