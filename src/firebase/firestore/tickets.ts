// firebase/firestore/ticket.ts
import {
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    QueryConstraint,
} from "firebase/firestore";
import { db } from "../index";

const ticketRef = collection(db, "ticket");

export const addTicket = async (data: any) => {
    const docRef = await addDoc(ticketRef, data);
    return docRef.id;
};

export const getTicket = async (id: string) => {
    const snap = await getDoc(doc(ticketRef, id));
    return snap.exists() ? snap.data() : null;
};

export const updateTicket = async (id: string, data: any) => {
    await updateDoc(doc(ticketRef, id), data);
};

export const deleteTicket = async (id: string) => {
    await deleteDoc(doc(ticketRef, id));
};

/**
 * Get tickets with optional search, filter, sort, and pagination
 */
export const getTickets = async ({
    search = "",
    filterField,
    filterValue,
    sortField = "createdAt",
    sortOrder: order = "asc",
    pageSize = 10,
    lastDocId,
}: {
    search?: string;
    filterField?: string;
    filterValue?: any;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    pageSize?: number;
    lastDocId?: string;
}) => {
    const constraints: QueryConstraint[] = [];

    // Filtering
    if (filterField && filterValue !== undefined) {
        constraints.push(where(filterField, "==", filterValue));
    }

    // Sorting
    constraints.push(orderBy(sortField, order));

    // Pagination
    if (lastDocId) {
        const lastDocSnap = await getDoc(doc(ticketRef, lastDocId));
        if (lastDocSnap.exists()) {
            constraints.push(startAfter(lastDocSnap));
        }
    }

    // Limit
    constraints.push(limit(pageSize));

    const q = query(ticketRef, ...constraints);
    const snap = await getDocs(q);

    // Simple search on a field (like `title` or `description`) if provided
    let results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (search) {
        results = results.filter((t: any) =>
            t.title?.toLowerCase().includes(search.toLowerCase())
        );
    }

    return results;
};
