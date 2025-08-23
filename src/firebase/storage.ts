// firebase/storage.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./index";

// ✅ Upload file
export const uploadFile = async (path: string, file: File) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
};

// ✅ Get file URL
export const getFileURL = async (path: string) => {
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
};

// ✅ Delete file
export const deleteFile = async (path: string) => {
    const storageRef = ref(storage, path);
    return deleteObject(storageRef);
};
