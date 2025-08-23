/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as ticketService from "@/firebase/firestore/tickets";

export interface TicketType {
    id: string;
    title?: string;
    description?: string;
    status?: string;
    createdAt?: number;
    updatedAt?: number;
}

interface TicketState {
    data: TicketType[];
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

const initialState: TicketState = {
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
export const fetchTickets = createAsyncThunk<
    { items: TicketType[]; total: number; page: number; pageSize: number },
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
>("ticket/fetchAll", async (params) => {
    const page = params?.page ?? 1;
    const pageSize = params?.limit ?? 10;

    const items = (await ticketService.getTickets({
        search: params?.search ?? "",
        filterField: params?.filterField,
        filterValue: params?.filterValue,
        sortField: params?.sortField ?? "createdAt",
        sortOrder: params?.sortOrder ?? "asc",
        pageSize,
        lastDocId: params?.lastDocId,
    })) as TicketType[];

    return {
        items,
        total: items.length, // server-side total can replace this if needed
        page,
        pageSize,
    };
});

export const createTicket = createAsyncThunk<TicketType, any>(
    "ticket/create",
    async (data) => {
        const id = await ticketService.addTicket({ ...data, createdAt: Date.now() });
        return { id, ...data } as TicketType;
    }
);

export const updateTicket = createAsyncThunk<TicketType, { id: string; updates: any }>(
    "ticket/update",
    async ({ id, updates }) => {
        await ticketService.updateTicket(id, { ...updates, updatedAt: Date.now() });
        return { id, ...updates } as TicketType;
    }
);

export const deleteTicket = createAsyncThunk<string, string>(
    "ticket/delete",
    async (id) => {
        await ticketService.deleteTicket(id);
        return id;
    }
);

/* -------------------- Slice -------------------- */
const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        clearTicketError: (state) => {
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
            .addCase(fetchTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tickets";
            })

            /* ---- Create ---- */
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
                state.total += 1;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create ticket";
            })

            /* ---- Update ---- */
            .addCase(updateTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) state.data[index] = { ...state.data[index], ...action.payload };
            })
            .addCase(updateTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update ticket";
            })

            /* ---- Delete ---- */
            .addCase(deleteTicket.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTicket.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.data = state.data.filter((t) => t.id !== action.payload);
                state.total -= 1;
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete ticket";
            });
    },
});

export const {
    clearTicketError,
    setSearch,
    setFilter,
    setSort,
    setPage,
    setPageSize,
} = ticketSlice.actions;
export default ticketSlice.reducer;
