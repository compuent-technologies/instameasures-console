/* eslint-disable @typescript-eslint/no-explicit-any */
// firebase/firestore/rateConfig.ts
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

const rateConfigRef = collection(db, COLLECTION_NAME.CONFIG_RATES);

export const addRateConfig = async (data: any) => {
    const docRef = await addDoc(rateConfigRef, data);
    return docRef.id;
};

export const getRateConfig = async (id: string) => {
    const snap = await getDoc(doc(rateConfigRef, id));
    return snap.exists() ? snap.data() : null;
};

export const updateRateConfig = async (id: string, data: any) => {
    await updateDoc(doc(rateConfigRef, id), data);
};

export const deleteRateConfig = async (id: string) => {
    await deleteDoc(doc(rateConfigRef, id));
};

/**
 * Get rateConfigs with optional search, filter, sort, and pagination
 */
export const getRateConfigs = async ({
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
        const lastDocSnap = await getDoc(doc(rateConfigRef, lastDocId));
        if (lastDocSnap.exists()) {
            constraints.push(startAfter(lastDocSnap));
        }
    }

    // Limit
    constraints.push(limit(pageSize));

    const q = query(rateConfigRef, ...constraints);
    const snap = await getDocs(q);

    // Simple search on a field (like `name`) if provided
    let results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (search) {
        results = results.filter((r: any) =>
            r.name?.toLowerCase().includes(search.toLowerCase())
        );
    }

    return results;
};
