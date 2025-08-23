// firebase/firestore/bills.ts
import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    // where,
    type DocumentData,
} from "firebase/firestore";
import { db } from "../index";

const billsRef = collection(db, "bills");

// ✅ Add a new bill
export const addBill = async (data: any) => {
    const docRef = await addDoc(billsRef, data);
    return docRef.id;
};

// ✅ Get single bill
export const getBill = async (id: string) => {
    const snap = await getDoc(doc(billsRef, id));
    return snap.exists() ? snap.data() : null;
};

// ✅ Update a bill
export const updateBill = async (id: string, data: any) => {
    await updateDoc(doc(billsRef, id), data);
};

// ✅ Delete a bill
export const deleteBill = async (id: string) => {
    await deleteDoc(doc(billsRef, id));
};

/* -------------------- List bills with pagination, search, sort & filter -------------------- */
interface ListBillsParams {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
    filterField?: string;
    filterValue?: any;
}

export const listBills = async ({
    page = 1,
    limit = 10,
    sortField = "createdAt",
    sortOrder = "desc",
    searchField,
    searchValue,
    filterField,
    filterValue,
}: ListBillsParams) => {
    let q: any = query(billsRef, orderBy(sortField, sortOrder));

    // Firestore doesn't support offset, so fetch all and then slice
    const snapshot = await getDocs(q);
    let allDocs: DocumentData[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    // Apply search
    if (searchField && searchValue) {
        const lowerSearch = searchValue.toLowerCase();
        allDocs = allDocs.filter((d) =>
            String(d[searchField]).toLowerCase().includes(lowerSearch)
        );
    }

    // Apply filter
    if (filterField && filterValue !== undefined) {
        allDocs = allDocs.filter((d) => d[filterField] === filterValue);
    }

    const total = allDocs.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedDocs = allDocs.slice(start, end);

    return {
        bills: pagedDocs,
        total,
        page,
        pageSize: limit,
    };
};
