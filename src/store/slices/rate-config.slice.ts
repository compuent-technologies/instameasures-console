/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as rateConfigService from "@/firebase/firestore/rateConfig";
import type RateConfigType from "@/types/rateConfig";



interface RateConfigState {
    data: RateConfigType[];
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

const initialState: RateConfigState = {
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

/* -------------------- Thunks -------------------- */

export const fetchRateConfigs = createAsyncThunk<
    { items: RateConfigType[]; total: number; page: number; pageSize: number },
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
>("rateConfig/fetchAll", async (params) => {
    const page = params?.page ?? 1;
    const pageSize = params?.limit ?? 10;

    const items = (await rateConfigService.getRateConfigs({
        search: params?.search ?? "",
        filterField: params?.filterField,
        filterValue: params?.filterValue,
        sortField: params?.sortField ?? "createdAt",
        sortOrder: params?.sortOrder ?? "asc",
        pageSize,
        lastDocId: params?.lastDocId,
    })) as RateConfigType[];

    return {
        items,
        total: items.length, // can be replaced with server-side total if available
        page,
        pageSize,
    };
});

export const createRateConfig = createAsyncThunk<RateConfigType, any>(
    "rateConfig/create",
    async (data) => {
        const id = await rateConfigService.addRateConfig({ ...data, createdAt: Date.now() });
        return { id, ...data } as RateConfigType;
    }
);

export const updateRateConfig = createAsyncThunk<RateConfigType, { id: string; updates: any }>(
    "rateConfig/update",
    async ({ id, updates }) => {
        await rateConfigService.updateRateConfig(id, { ...updates, updatedAt: Date.now() });
        return { id, ...updates } as RateConfigType;
    }
);

export const deleteRateConfig = createAsyncThunk<string, string>(
    "rateConfig/delete",
    async (id) => {
        await rateConfigService.deleteRateConfig(id);
        return id;
    }
);

/* -------------------- Slice -------------------- */

const rateConfigSlice = createSlice({
    name: "rateConfig",
    initialState,
    reducers: {
        clearRateConfigError: (state) => {
            state.error = null;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilter: (state, action: PayloadAction<{ field: string; value: any }>) => {
            state.filterField = action.payload.field;
            state.filterValue = action.payload.value;
        },
        setSort: (state, action: PayloadAction<{ field: string; order: "asc" | "desc" }>) => {
            state.sortField = action.payload.field;
            state.sortOrder = action.payload.order;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ---- Fetch ---- */
            .addCase(fetchRateConfigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRateConfigs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(fetchRateConfigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch rate configs";
            })

            /* ---- Create ---- */
            .addCase(createRateConfig.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRateConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
                state.total += 1;
            })
            .addCase(createRateConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create rate config";
            })

            /* ---- Update ---- */
            .addCase(updateRateConfig.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRateConfig.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((r: { id: any; }) => r.id === action.payload.id);
                if (index !== -1) state.data[index] = { ...state.data[index], ...action.payload };
            })
            .addCase(updateRateConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update rate config";
            })

            /* ---- Delete ---- */
            .addCase(deleteRateConfig.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRateConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((r: { id: string; }) => r.id !== action.payload);
                state.total -= 1;
            })
            .addCase(deleteRateConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete rate config";
            });
    },
});

export const {
    clearRateConfigError,
    setSearch,
    setFilter,
    setSort,
    setPage,
    setPageSize,
} = rateConfigSlice.actions;
export default rateConfigSlice.reducer;
