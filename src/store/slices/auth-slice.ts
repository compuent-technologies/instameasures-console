/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as authService from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/index"; // Firestore instance
import type { User } from "firebase/auth";

// Utility to serialize Firebase User
function serializeUser(user: User | null) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
  };
}

type SerializableUser = ReturnType<typeof serializeUser>;

interface AuthState {
  user: SerializableUser | null;
  loading: boolean;
  error: string | null;
  confirmationResult: any | null; // OTP confirmation object
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  confirmationResult: null,
};

// ✅ Send OTP thunk with role check
export const sendOtpWithRoleCheck = createAsyncThunk<
  { confirmationResult: any },
  { phoneNumber: string; containerId: string; requiredRole: string },
  { rejectValue: string }
>("auth/sendOtpWithRoleCheck", async ({ phoneNumber, containerId, requiredRole }, thunkAPI) => {
  try {
    // 1️⃣ Check role from Firestore
    const usersRef = doc(db, "users", phoneNumber); // assuming phoneNumber is doc id
    const userDoc = await getDoc(usersRef);
    if (!userDoc.exists()) {
      return thunkAPI.rejectWithValue("User does not exist");
    }
    const userData = userDoc.data();
    if (userData.role !== requiredRole) {
      return thunkAPI.rejectWithValue("User does not have permission for this action");
    }

    // 2️⃣ Send OTP
    const confirmationResult = await authService.sendOtp(phoneNumber, containerId);
    return { confirmationResult };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to send OTP");
  }
});

// ✅ Verify OTP thunk
export const verifyOtp = createAsyncThunk<{ user: SerializableUser }, { otp: string }, { state: AuthState; rejectValue: string }>(
  "auth/verifyOtp",
  async ({ otp }, thunkAPI) => {
    const { confirmationResult } = thunkAPI.getState();
    if (!confirmationResult) return thunkAPI.rejectWithValue("No OTP confirmation available");
    try {
      const user = await authService.verifyOtp(confirmationResult, otp);
      return { user: serializeUser(user) };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "OTP verification failed");
    }
  }
);

// ✅ Logout thunk
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout();
});

// ✅ Auth state listener
export const hydrateUser = createAsyncThunk<{ user: SerializableUser | null }>(
  "auth/hydrateUser",
  async () =>
    new Promise((resolve) => {
      authService.onAuthChanged((user) => resolve({ user: serializeUser(user) }));
    })
);

// ✅ Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetConfirmation: (state) => {
      state.confirmationResult = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.confirmationResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtpWithRoleCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtpWithRoleCheck.fulfilled, (state, action: PayloadAction<{ confirmationResult: any }>) => {
        state.loading = false;
        state.confirmationResult = action.payload.confirmationResult;
      })
      .addCase(sendOtpWithRoleCheck.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ user: SerializableUser }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.confirmationResult = null;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.confirmationResult = null;
      })

      // Hydrate
      .addCase(hydrateUser.fulfilled, (state, action: PayloadAction<{ user: SerializableUser | null }>) => {
        state.user = action.payload.user;
      });
  },
});

export default authSlice.reducer;
export const { clearError, resetConfirmation, logout } = authSlice.actions;
