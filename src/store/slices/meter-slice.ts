/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as meterService from "@/firebase/firestore/meters";
import type { MeterType } from "@/types/meter";

// --- State Interface ---
interface MeterState {
  data: MeterType[];
  total: number;
  page: number;
  pageSize: number;
  search?: string;
  filterField?: string;
  filterValue?: any;
  sortField: string;
  sortOrder: "asc" | "desc";
  loading: boolean;
  error: string | null;
}

const initialState: MeterState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  search: undefined,
  filterField: undefined,
  filterValue: undefined,
  sortField: "createdAt",
  sortOrder: "asc",
  loading: false,
  error: null,
};

// --- Async Thunks ---

export const fetchMeters = createAsyncThunk<
  { items: MeterType[]; total: number; page: number; pageSize: number },
  Partial<{
    page: number;
    limit: number;
    search: string;
    filterField: string;
    filterValue: any;
    sortField: string;
    sortOrder: "asc" | "desc";
    lastDocId?: string;
  }>
>("meters/fetchAll", async (params) => {
  const page = params?.page ?? 1;
  const pageSize = params?.limit ?? 10;

  const items = (await meterService.getMeters({
    search: params?.search ?? "",
    filterField: params?.filterField,
    filterValue: params?.filterValue,
    sortField: params?.sortField ?? "createdAt",
    sortOrder: params?.sortOrder ?? "asc",
    pageSize,
    lastDocId: params?.lastDocId,
  })) as MeterType[];

  return {
    items,
    total: items.length, // Firestore can return total separately if needed
    page,
    pageSize,
  };
});

// CREATE
export const createMeter = createAsyncThunk<MeterType, Partial<MeterType>>(
  "meters/create",
  async (newMeter) => {
    const id = await meterService.addMeter({ ...newMeter, createdAt: Date.now() });
    return { id, ...newMeter } as MeterType;
  }
);

// UPDATE
export const updateMeter = createAsyncThunk<MeterType, { id: string; data: Partial<MeterType> }>(
  "meters/update",
  async ({ id, data }) => {
    await meterService.updateMeter(id, { ...data, updatedAt: Date.now() });
    return { id, ...data } as MeterType;
  }
);

// DELETE
export const deleteMeter = createAsyncThunk<string, string>(
  "meters/delete",
  async (id) => {
    await meterService.deleteMeter(id);
    return id;
  }
);

// --- Slice ---
const meterSlice = createSlice({
  name: "meters",
  initialState,
  reducers: {
    clearMeters: () => initialState,
    setSearch: (state, action: { payload: string }) => {
      state.search = action.payload;
    },
    setFilter: (state, action: { payload: { field: string; value: any } }) => {
      state.filterField = action.payload.field;
      state.filterValue = action.payload.value;
    },
    setSort: (state, action: { payload: { field: string; order: "asc" | "desc" } }) => {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
    setPage: (state, action: { payload: number }) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: { payload: number }) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LIST
      .addCase(fetchMeters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchMeters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch meters";
      })

      // CREATE
      .addCase(createMeter.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMeter.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createMeter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create meter";
      })

      // UPDATE
      .addCase(updateMeter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeter.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) state.data[index] = { ...state.data[index], ...action.payload };
      })
      .addCase(updateMeter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update meter";
      })

      // DELETE
      .addCase(deleteMeter.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMeter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((m) => m.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteMeter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete meter";
      });
  },
});

export const { clearMeters, setSearch, setFilter, setSort, setPage, setPageSize } =
  meterSlice.actions;
export default meterSlice.reducer;
