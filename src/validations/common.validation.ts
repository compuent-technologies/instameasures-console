import { z } from "zod";

// 🔹 Common reusable validators
const idSchema = z.string().min(1, "ID is required");
const emailSchema = z.string().email("Invalid email address");
const phoneSchema = z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");
const urlSchema = z.string().url("Invalid URL").nullable();
const dateStringSchema = z.string().datetime().or(z.string()); // flexible for Firebase timestamps
const roleSchema = z.enum(["sysadmin", "superadmin", "admin", "delegate", "meters"]);



export const validations = {
    idSchema,
    emailSchema, phoneSchema, nameSchema, urlSchema, dateStringSchema, roleSchema
}

// 🔹 Query & Pagination
export const queryParamsSchema = z.object({
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
    search: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    filters: z.any(),
});

// 🔹 Auth
export const loginCredentialsSchema = z.object({
    email: emailSchema,
    password: z.string().min(6, "Password must be at least 6 characters"),
});