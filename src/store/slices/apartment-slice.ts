
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apartmentService from "@/firebase/firestore/apartments";
import type { ListApartmentsParams } from "@/firebase/firestore/apartments";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type { ApartmentType } from "@/types/apartment";

interface ApartmentState {
  data: ApartmentType[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ApartmentState = {
  data: [],
  lastDoc: null,
  hasMore: true,
  isLoading: false,
  error: null,
};

// --- Async Thunks ---
// 1. List apartments (with pagination)
export const fetchApartments = createAsyncThunk<
  {
    items: ApartmentType[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    hasMore: boolean;
    append: boolean;
  },
  ListApartmentsParams & { append?: boolean } | void
>("apartments/fetchAll", async (params) => {
  const result = await apartmentService.listApartments(params || {});
  return {
    items: result.apartments,
    lastDoc: result.lastDoc,
    hasMore: result.hasMore,
    append: params?.append ?? false,
  };
});

// 2. Create a new apartment
// export const createApartment = createAsyncThunk<ApartmentType, Partial<ApartmentType>>(
//   "apartments/create",
//   async (newApartment) => {
//     const id = await apartmentService.createApartment({
//       ...newApartment,
//       createdAt: Date.now(),
//     });
//     return { id, ...newApartment } as ApartmentType;
//   }
// );

// 3. Update apartment
// export const updateApartment = createAsyncThunk<
//   ApartmentType,
//   { id: string; data: Partial<ApartmentType> }
// >("apartments/update", async ({ id, data }) => {
//   await apartmentService.updateApartment(id, { ...data, updatedAt: Date.now() });
//   return { id, ...data } as ApartmentType;
// });

// 4. Delete apartment
export const deleteApartment = createAsyncThunk<string, string>(
  "apartments/delete",
  async (id) => {
    await apartmentService.deleteApartment(id);
    return id;
  }
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
        state.lastDoc = action.payload.lastDoc;
        state.hasMore = action.payload.hasMore;

        if (action.payload.append) {
          state.data = [...state.data, ...action.payload.items];
        } else {
          state.data = action.payload.items;
        }
      })
      .addCase(fetchApartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch apartments";
      });

    // CREATE
    // builder
    //   .addCase(createApartment.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(createApartment.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data.unshift(action.payload);
    //   })
    //   .addCase(createApartment.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.error.message || "Failed to create apartment";
    //   });

    // UPDATE
    // builder
    //   .addCase(updateApartment.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateApartment.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     const index = state.data.findIndex((a) => a.id === action.payload.id);
    //     if (index !== -1) {
    //       state.data[index] = { ...state.data[index], ...action.payload };
    //     }
    //   })
    //   .addCase(updateApartment.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.error.message || "Failed to update apartment";
    //   });

    // DELETE
    builder
      .addCase(deleteApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete apartment";
      });
  },
});

export const { clearApartments } = apartmentSlice.actions;
export default apartmentSlice.reducer;
