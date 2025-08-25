/* eslint-disable @typescript-eslint/no-explicit-any */
// Common API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
}

// Mutation Response
export interface MutationResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success:boolean
  customToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Entity Types (matching your existing types)
export interface Apartment {
  id: string;
  name: string;
  address: string;
  city: string;
  pinCode: string;
  meterType: string;
  displayImage: string | null;
  rate: number | null;
  createdAt?: { _seconds: number; _nanoseconds: number };
  delegates?: string;
  meters?: string[];
  monthly_bills?: string[];
  uploadsByMonth?: string[];
  admins?: string[];
  updatedAt?: string;
}

export interface Bill {
  id: string;
  apartmentId: string;
  apartmentName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue";
  createdAt: string;
  updatedAt: string;
}

export interface Meter {
  id: string;
  apartmentId: string;
  apartmentName: string;
  type: "electricity" | "water" | "gas";
  reading: number;
  lastReadingDate: string;
  createdAt: string;
  updatedAt: string;
}

// Create/Update Types
export interface CreateApartmentData {
  name: string;
  address: string;
  units: number;
}

export interface UpdateApartmentData extends Partial<CreateApartmentData> {
  id: string;
}

export interface CreateBillData {
  apartmentId: string;
  amount: number;
  dueDate: string;
}

export interface UpdateBillData extends Partial<CreateBillData> {
  id: string;
}

export interface CreateMeterData {
  apartmentId: string;
  type: "electricity" | "water" | "gas";
  reading: number;
  lastReadingDate: string;
}

export interface UpdateMeterData extends Partial<CreateMeterData> {
  id: string;
}
