// firebase/firestore/apartments.ts
import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    limit as limitQuery,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../index";

const apartmentsRef = collection(db, "apartments");

// ✅ Create a new apartment (auto ID)
export const createApartment = async (data: any) => {
    const docRef = await addDoc(apartmentsRef, data);
    return docRef.id;
};

// ✅ Create or update apartment by ID
export const setApartment = async (id: string, data: any) => {
    await setDoc(doc(apartmentsRef, id), data, { merge: true });
};

// ✅ Get single apartment
export const getApartment = async (id: string) => {
    const snap = await getDoc(doc(apartmentsRef, id));
    return snap.exists() ? snap.data() : null;
};

// ✅ Update apartment by ID
export const updateApartment = async (id: string, data: any) => {
    await updateDoc(doc(apartmentsRef, id), data);
};

// ✅ Delete apartment by ID
export const deleteApartment = async (id: string) => {
    await deleteDoc(doc(apartmentsRef, id));
};

/* -------------------- Get apartments with pagination, search, and sort -------------------- */
interface ListApartmentsParams {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
}

export const listApartments = async ({
    page = 1,
    limit = 10,
    sortField = "name",
    sortOrder = "asc",
    searchField,
    searchValue,
}: ListApartmentsParams) => {
    let q: any = query(apartmentsRef, orderBy(sortField, sortOrder));

    // Firestore doesn't have offset, we need to paginate using startAfter
    // For simplicity, we'll fetch `page * limit` and then slice client-side
    const snapshot = await getDocs(q);
    let allDocs: DocumentData[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    // Apply search filtering if needed
    if (searchField && searchValue) {
        const lowerSearch = searchValue.toLowerCase();
        allDocs = allDocs.filter((d) =>
            String(d[searchField]).toLowerCase().includes(lowerSearch)
        );
    }

    const total = allDocs.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedDocs = allDocs.slice(start, end);

    return {
        apartments: pagedDocs,
        total,
        page,
        pageSize: limit,
    };
};
