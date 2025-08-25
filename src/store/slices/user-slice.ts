/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as userService from "@/firebase/firestore/users";
import type { UserType } from "@/types/user";

/* -------------------- State -------------------- */
export interface UsersState {
  users: UserType[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  lastVisible: any | null; // Firestore doc snapshot for pagination
  sortField: string;
  sortOrder: "asc" | "desc";
  searchField?: string;
  searchValue?: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  lastVisible: null,
  sortField: "createdAt",
  sortOrder: "asc",
};

/* -------------------- Thunks -------------------- */

// Server-side paginated list with optional sorting and filtering
// export const listUsers = createAsyncThunk<
//   { users: UserType[]; total: number; lastVisible: any; page: number; pageSize: number },
//   { page?: number; limit?: number; sortField?: string; sortOrder?: "asc" | "desc"; searchField?: string; searchValue?: string } | undefined
// >(
//   "users/list",
//   async (params, { rejectWithValue }) => {
//     try {
//       const page = params?.page ?? 1;
//       const pageSize = params?.limit ?? 10;
//       const sortField = params?.sortField ?? "createdAt";
//       const sortOrder = params?.sortOrder ?? "asc";
//       const searchField = params?.searchField;
//       const searchValue = params?.searchValue;

//       const res = await userService.getUsersPaginated({
//         pageSize,
//         sortField,
//         sortOrder,
//         filterField: searchField,
//         filterValue: searchValue,
//       });

//       // Map Firestore docs to UserType
//       const mapUser = (u: any): UserType => ({
//         userId: u.id,
//         apartmentId: u.apartmentId,
//         createdBy: u.createdBy,
//         displayImage: u.displayImage,
//         email: u.email,
//         name: u.name,
//         phoneNumber: u.phoneNumber ?? "",
//         role: u.role ?? "",
//         updatedBy: u.updatedBy ?? "",
//         createdAt: u.createdAt?.toDate?.() ?? new Date(u.createdAt ?? Date.now()),
//         updatedAt: u.updatedAt?.toDate?.() ?? new Date(u.updatedAt ?? Date.now()),
//       });

//       const users: UserType[] = res.users.map(mapUser);

//       return {
//         users,
//         total: users.length,
//         lastVisible: res.lastVisible || null,
//         page,
//         pageSize,
//       };
//     } catch (err: any) {
//       return rejectWithValue(err.message || "Failed to fetch users");
//     }
//   }
// );

export const listUsers = createAsyncThunk<
  {
    users: UserType[];
    total: number;
    lastVisible: any;
    page: number;
    pageSize: number;
  },
  {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
    apartmentId?: string;
    role?: string;
  } | undefined
>(
  "users/list",
  async (params, { rejectWithValue }) => {
    try {
      const page = params?.page ?? 1;
      const pageSize = params?.limit ?? 10;
      const sortField = params?.sortField ?? "createdAt";
      const sortOrder = params?.sortOrder ?? "asc";
      const searchField = params?.searchField;
      const searchValue = params?.searchValue;
      const apartmentId = params?.apartmentId;
      const role = params?.role;

      const res = await userService.getUsersPaginated({
        pageSize,
        sortField,
        sortOrder,
        filterField: searchField,
        filterValue: searchValue,
        apartmentId, // ✅ optional filter
        role,        // ✅ optional filter
      });

      // Map Firestore docs to UserType
      const mapUser = (u: any): UserType => ({
        userId: u.id,
        apartmentId: u.apartmentId,
        createdBy: u.createdBy,
        displayImage: u.displayImage,
        email: u.email,
        name: u.name,
        phoneNumber: u.phoneNumber ?? "",
        role: u.role ?? "",
        updatedBy: u.updatedBy ?? "",
        createdAt: u.createdAt?.toDate?.() ?? new Date(u.createdAt ?? Date.now()),
        updatedAt: u.updatedAt?.toDate?.() ?? new Date(u.updatedAt ?? Date.now()),
      });



      const users: UserType[] = res.users.map(mapUser);

      console.log(users.toString())

      return {
        users,
        total: users.length,
        lastVisible: res.lastVisible || null,
        page,
        pageSize,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch users");
    }
  }
);


// Create, update, delete remain same
export const createUser = createAsyncThunk<UserType, { id: string; data: Partial<UserType> }>(
  "users/create",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await userService.createUser(id, { ...data, createdAt: Date.now() });
      return { userId: id, ...data } as UserType;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create user");
    }
  }
);

export const updateUser = createAsyncThunk<UserType, { id: string; updates: Partial<UserType> }>(
  "users/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      await userService.updateUser(id, { ...updates, updatedAt: Date.now() });
      return { userId: id, ...updates } as UserType;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete user");
    }
  }
);

/* -------------------- Slice -------------------- */
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: () => initialState,
    setSort: (state, action: PayloadAction<{ sortField: string; sortOrder: "asc" | "desc" }>) => {
      state.sortField = action.payload.sortField;
      state.sortOrder = action.payload.sortOrder;
    },
    setSearch: (state, action: PayloadAction<{ searchField: string; searchValue: string }>) => {
      state.searchField = action.payload.searchField;
      state.searchValue = action.payload.searchValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.lastVisible = action.payload.lastVisible;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.users.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.userId === action.payload.userId);
        if (index !== -1) state.users[index] = { ...state.users[index], ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.userId !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsers, setSort, setSearch } = userSlice.actions;
export default userSlice.reducer;
