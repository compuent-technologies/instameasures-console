import z from "zod";
import { validations } from "./common.validation";

// 🔹 User
export const userSchema = z.object({
    id: validations.idSchema.optional(),
    userId: z.string().optional(),
    apartmentId: validations.idSchema,
    createdAt: validations.dateStringSchema,
    updatedAt: validations.dateStringSchema.nullable(),
    createdBy: validations.idSchema,
    updatedBy: z.string().nullable(),
    displayImage: validations.urlSchema,
    email: validations.emailSchema,
    name: validations.nameSchema,
    phoneNumber: validations.phoneSchema,
    role: z.string(),
});