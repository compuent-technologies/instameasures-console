/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Apartment } from "@/types/types";
import * as apartmentService from "@/firebase/firestore/apartments";

interface ApartmentState {
  data: Apartment[];
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ApartmentState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  isLoading: false,
  error: null,
};

// --- Async Thunks ---
// 1. List all apartments
export const fetchApartments = createAsyncThunk<
  { items: Apartment[]; total: number },
  void
>("apartments/fetchAll", async () => {
  const items = await apartmentService.listApartments();
  return { items, total: items.length };
});

// 2. Create a new apartment
export const createApartment = createAsyncThunk<Apartment, Partial<Apartment>>(
  "apartments/create",
  async (newApartment) => {
    const id = await apartmentService.createApartment({
      ...newApartment,
      createdAt: Date.now(),
    });
    return { id, ...newApartment } as Apartment;
  },
);

// 3. Update apartment
export const updateApartment = createAsyncThunk<
  Apartment,
  { id: string; data: Partial<Apartment> }
>("apartments/update", async ({ id, data }) => {
  await apartmentService.updateApartment(id, { ...data, updatedAt: Date.now() });
  return { id, ...data } as Apartment;
});

// 4. Delete apartment
export const deleteApartment = createAsyncThunk<string, string>(
  "apartments/delete",
  async (id) => {
    await apartmentService.deleteApartment(id);
    return id;
  },
);

// --- Slice ---
const apartmentSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    clearApartments: () => initialState,
  },
  extraReducers: (builder) => {
    // LIST
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchApartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch apartments";
      });

    // CREATE
    builder
      .addCase(createApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create apartment";
      });

    // UPDATE
    builder
      .addCase(updateApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.data[index] = { ...state.data[index], ...action.payload };
      })
      .addCase(updateApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update apartment";
      });

    // DELETE
    builder
      .addCase(deleteApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((a) => a.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete apartment";
      });
  },
});

export const { clearApartments } = apartmentSlice.actions;
export default apartmentSlice.reducer;
