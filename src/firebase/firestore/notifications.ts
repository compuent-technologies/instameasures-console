/* eslint-disable @typescript-eslint/no-explicit-any */
// firebase/firestore/notification.ts
import {
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    QueryConstraint,
} from "firebase/firestore";
import { db } from "../index";
import { COLLECTION_NAME } from "@/constants/COLLECTION_NAMES";

const notificationRef = collection(db, COLLECTION_NAME.NOTIFICATIONS);

export const addnotification = async (data: any) => {
    const docRef = await addDoc(notificationRef, data);
    return docRef.id;
};

export const getnotification = async (id: string) => {
    const snap = await getDoc(doc(notificationRef, id));
    return snap.exists() ? snap.data() : null;
};

/**
 * Get notifications with optional search, filter, sort, and pagination
 */
export const getnotifications = async ({
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
        const lastDocSnap = await getDoc(doc(notificationRef, lastDocId));
        if (lastDocSnap.exists()) {
            constraints.push(startAfter(lastDocSnap));
        }
    }

    // Limit
    constraints.push(limit(pageSize));

    const q = query(notificationRef, ...constraints);
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
