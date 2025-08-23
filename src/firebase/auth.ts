// firebase/auth.ts
import {
    type User,
    signOut,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./index";

// 🔑 Initialize reCAPTCHA
export const setupRecaptcha = (containerId: string) => {
    if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
            containerId,
            {
                size: "invisible", // 'invisible' or 'normal' for visible
                callback: (response: any) => {
                    console.log("reCAPTCHA solved", response);
                },
            },
            auth
        );
    }
    return (window as any).recaptchaVerifier;
};

// 🔑 Send OTP to phone number
export const sendOtp = async (phoneNumber: string, containerId: string) => {
    const recaptchaVerifier = setupRecaptcha(containerId);
    try {
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            recaptchaVerifier
        );
        // Return confirmation result to use for OTP verification
        return confirmationResult;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

// 🔑 Verify OTP code
export const verifyOtp = async (confirmationResult: any, otp: string) => {
    try {
        const result = await confirmationResult.confirm(otp);
        // Return the logged-in user
        return result.user;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

// 🔑 Logout
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};

// 🔑 Auth state listener
export const onAuthChanged = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
