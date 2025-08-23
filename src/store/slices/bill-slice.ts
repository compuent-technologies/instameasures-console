/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as billService from "@/firebase/firestore/bills";
import type { Bill } from "@/types/types";

// --- State Interface ---
interface BillsState {
  data: Bill[];
  total: number;
  page: number;
  pageSize: number;
  searchField?: string;
  searchValue?: string;
  filterField?: string;
  filterValue?: any;
  sortField: string;
  sortOrder: "asc" | "desc";
  isLoading: boolean;
  error: string | null;
}

const initialState: BillsState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  searchField: undefined,
  searchValue: undefined,
  filterField: undefined,
  filterValue: undefined,
  sortField: "createdAt",
  sortOrder: "desc",
  isLoading: false,
  error: null,
};

// --- Async Thunks ---

export const fetchBills = createAsyncThunk<
  { items: Bill[]; total: number; page: number; pageSize: number },
  Partial<{
    page: number;
    limit: number;
    searchField: string;
    searchValue: string;
    filterField: string;
    filterValue: any;
    sortField: string;
    sortOrder: "asc" | "desc";
  }>
>("bills/fetchAll", async (params) => {
  const page = params?.page ?? 1;
  const pageSize = params?.limit ?? 10;

  const response = await billService.listBills({
    page,
    limit: pageSize,
    sortField: params?.sortField ?? "createdAt",
    sortOrder: params?.sortOrder ?? "desc",
    searchField: params?.searchField,
    searchValue: params?.searchValue,
    filterField: params?.filterField,
    filterValue: params?.filterValue,
  });

  return {
    items: response.bills as Bill[],
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
  };
});

// CREATE
export const createBill = createAsyncThunk<Bill, Partial<Bill>>(
  "bills/create",
  async (newBill) => {
    const id = await billService.addBill({ ...newBill, createdAt: Date.now() });
    return { id, ...newBill } as Bill;
  }
);

// UPDATE
export const updateBill = createAsyncThunk<Bill, { id: string; data: Partial<Bill> }>(
  "bills/update",
  async ({ id, data }) => {
    await billService.updateBill(id, { ...data, updatedAt: Date.now() });
    return { id, ...data } as Bill;
  }
);

// DELETE
export const deleteBill = createAsyncThunk<string, string>(
  "bills/delete",
  async (id) => {
    await billService.deleteBill(id);
    return id;
  }
);

// --- Slice ---
const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    clearBills: () => initialState,
    setSearch: (state, action: { payload: { field: string; value: string } }) => {
      state.searchField = action.payload.field;
      state.searchValue = action.payload.value;
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
      // FETCH
      .addCase(fetchBills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch bills";
      })

      // CREATE
      .addCase(createBill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create bill";
      })

      // UPDATE
      .addCase(updateBill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.data[index] = { ...state.data[index], ...action.payload };
      })
      .addCase(updateBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update bill";
      })

      // DELETE
      .addCase(deleteBill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((b) => b.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete bill";
      });
  },
});

export const { clearBills, setSearch, setFilter, setSort, setPage, setPageSize } =
  billsSlice.actions;
export default billsSlice.reducer;
