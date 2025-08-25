// firebase/auth.ts
import {
    type User,
    type ConfirmationResult,
    signOut,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./index";


declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
    }
}

export const setupRecaptcha = (containerId: string) => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth, // ✅ pass the auth instance, not string
            containerId,
            {
                size: "invisible",
                callback: (response: string) => {
                    console.log("reCAPTCHA solved:", response);
                },
            }
        );
    }
    return window.recaptchaVerifier;
};

// export const sendOtp = async (phoneNumber: string) => {
//     const appVerifier = setupRecaptcha("recaptcha-container");
//     return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
// };



// 🔑 Send OTP
export const sendOtp = async (
    phoneNumber: string,
    containerId: string
): Promise<ConfirmationResult> => {
    const recaptchaVerifier = setupRecaptcha(containerId);
    try {
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            recaptchaVerifier
        );
        return confirmationResult;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

// 🔑 Verify OTP
export const verifyOtp = async (
    confirmationResult: ConfirmationResult,
    otp: string
) => {
    try {
        const result = await confirmationResult.confirm(otp);
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
