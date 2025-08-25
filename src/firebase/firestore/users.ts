/* eslint-disable @typescript-eslint/no-explicit-any */
// firebase/firestore/users.ts
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../index";
import { query, orderBy, limit, startAfter, where } from "firebase/firestore";
import { COLLECTION_NAME } from "@/constants/COLLECTION_NAMES";

const usersRef = collection(db, COLLECTION_NAME.USERS);

// ✅ Create or update user
export const createUser = async (id: string, data: any) => {
    await setDoc(doc(usersRef, id), data, { merge: true });
};

// ✅ Get single user
export const getUser = async (id: string) => {
    const snap = await getDoc(doc(usersRef, id));
    return snap.exists() ? snap.data() : null;
};

// ✅ Get all users with optional apartmentId / role filter
export const getUsersPaginated = async ({
    pageSize = 10,
    lastVisibleDoc = null,
    sortField = "createdAt",
    sortOrder: order = "asc",
    filterField,
    filterValue,
    apartmentId,
    role,
}: {
    pageSize?: number;
    lastVisibleDoc?: any;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    filterField?: string;
    filterValue?: any;
    apartmentId?: string;
    role?: string;
}) => {
    try {
        const conditions: any[] = [];

        if (filterField && filterValue !== undefined) {
            conditions.push(where(filterField, "==", filterValue));
        }

        if (apartmentId) {
            conditions.push(where("apartmentId", "==", apartmentId));
        }

        if (role) {
            conditions.push(where("role", "==", role));
        }

        let q;
        if (lastVisibleDoc) {
            q = query(
                usersRef,
                ...conditions,
                orderBy(sortField, order),
                startAfter(lastVisibleDoc), // must be DocumentSnapshot
                limit(pageSize)
            );
        } else {
            q = query(
                usersRef,
                ...conditions,
                // orderBy(sortField, order),
                limit(pageSize)
            );
        }

        const snap = await getDocs(q);

        const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // return DocumentSnapshot for pagination
        const lastVisible = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

        return { users, lastVisible };
    } catch (error: any) {
        console.error("🔥 Error fetching paginated users:", error.message);
        throw error;
    }
};


// ✅ Update user
export const updateUser = async (id: string, data: any) => {
    await updateDoc(doc(usersRef, id), data);
};

// ✅ Delete user
export const deleteUser = async (id: string) => {
    await deleteDoc(doc(usersRef, id));
};
