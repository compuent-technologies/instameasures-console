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

const usersRef = collection(db, "users");

// ✅ Create or update user
export const createUser = async (id: string, data: any) => {
    await setDoc(doc(usersRef, id), data, { merge: true });
};

// ✅ Get single user
export const getUser = async (id: string) => {
    const snap = await getDoc(doc(usersRef, id));
    return snap.exists() ? snap.data() : null;
};

// ✅ Get all users
export const getUsersPaginated = async ({
    pageSize = 10,
    lastVisibleDoc = null,
    sortField = "createdAt",
    sortOrder: order = "asc",
    filterField,
    filterValue,
}: {
    pageSize?: number;
    lastVisibleDoc?: any;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    filterField?: string;
    filterValue?: any;
}) => {
    let q;

    if (lastVisibleDoc) {
        q = query(
            usersRef,
            ...(filterField && filterValue !== undefined ? [where(filterField, "==", filterValue)] : []),
            orderBy(sortField, order),
            startAfter(lastVisibleDoc),
            limit(pageSize)
        );
    } else {
        q = query(
            usersRef,
            ...(filterField && filterValue !== undefined ? [where(filterField, "==", filterValue)] : []),
            orderBy(sortField, order),
            limit(pageSize)
        );
    }

    const snap = await getDocs(q);
    const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const lastVisible = snap.docs[snap.docs.length - 1] || null;

    return { users, lastVisible };
};

// ✅ Update user
export const updateUser = async (id: string, data: any) => {
    await updateDoc(doc(usersRef, id), data);
};

// ✅ Delete user
export const deleteUser = async (id: string) => {
    await deleteDoc(doc(usersRef, id));
};
