// firebase/firestore/apartments.ts
import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    startAfter,
    limit as fbLimit,
    getDocs,
    type DocumentData,
    type QueryDocumentSnapshot,
    where,
} from "firebase/firestore";
import { db } from "../index";
import { COLLECTION_NAME } from "@/constants/COLLECTION_NAMES";
import type { ApartmentType } from "@/types/apartment";

const apartmentsRef = collection(db, COLLECTION_NAME.APARTMENTS);


// ✅ Create a new apartment (auto ID)
export const createApartment = async (data: ApartmentType) => {
    const docRef = await addDoc(apartmentsRef, data);
    return docRef.id;
};

// ✅ Create or update apartment by ID
export const setApartment = async (id: string, data: ApartmentType) => {
    await setDoc(doc(apartmentsRef, id), data, { merge: true });
};

// ✅ Get single apartment
export const getApartment = async (id: string): Promise<ApartmentType | null> => {
    const snap = await getDoc(doc(apartmentsRef, id));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as ApartmentType) : null;
};

// ✅ Update apartment by ID
export const updateApartment = async (id: string, data: Partial<ApartmentType>) => {
    await updateDoc(doc(apartmentsRef, id), data);
};

// ✅ Delete apartment by ID
export const deleteApartment = async (id: string) => {
    await deleteDoc(doc(apartmentsRef, id));
};

/* -------------------- Get apartments with pagination, search, and sort -------------------- */
export interface ListApartmentsParams {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
    lastDoc?: QueryDocumentSnapshot<DocumentData>; // for real pagination
}

export const listApartments = async ({
    limit = 10,
    sortField = "name",
    sortOrder = "asc",
    searchField,
    searchValue,
    lastDoc,
}: ListApartmentsParams) => {
    let q = query(apartmentsRef, orderBy(sortField, sortOrder), fbLimit(limit));

    // ✅ Server-side search if exact match is possible
    if (searchField && searchValue) {
        q = query(
            apartmentsRef,
            where(searchField, "==", searchValue),
            orderBy(sortField, sortOrder),
            fbLimit(limit)
        );
    }

    // ✅ Pagination using startAfter
    if (lastDoc) {
        q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const docs: ApartmentType[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
    })) as ApartmentType[];

    return {
        apartments: docs,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
        hasMore: snapshot.size === limit,
    };
};
