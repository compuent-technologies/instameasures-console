/* eslint-disable @typescript-eslint/no-explicit-any */
// firebase/firestore/meters.ts
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
import { COLLECTION_NAME } from "@/constants/COLLECTION_NAMES";

const metersRef = collection(db, COLLECTION_NAME.METERS);

export const addMeter = async (data: any) => {
    const docRef = await addDoc(metersRef, data);
    return docRef.id;
};

export const getMeter = async (id: string) => {
    const snap = await getDoc(doc(metersRef, id));
    return snap.exists() ? snap.data() : null;
};

export const updateMeter = async (id: string, data: any) => {
    await updateDoc(doc(metersRef, id), data);
};

export const deleteMeter = async (id: string) => {
    await deleteDoc(doc(metersRef, id));
};

/**
 * Get meters with optional search, filter, sort, and pagination
 */
export const getMeters = async ({
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
        const lastDocSnap = await getDoc(doc(metersRef, lastDocId));
        if (lastDocSnap.exists()) {
            constraints.push(startAfter(lastDocSnap));
        }
    }

    // Limit
    constraints.push(limit(pageSize));

    const q = query(metersRef, ...constraints);
    const snap = await getDocs(q);

    // Simple search on a field (like `name`) if provided
    let results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (search) {
        results = results.filter((m: any) =>
            m.name?.toLowerCase().includes(search.toLowerCase())
        );
    }

    return results;
};
