import z from "zod";
import { validations } from './common.validation'

// 🔹 Apartment
export const apartmentSchema = z.object({
    id: validations.idSchema.optional(),
    name: validations.nameSchema,
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    pinCode: z.string().regex(/^[0-9]{5,6}$/, "Invalid pin code"),
    meterType: z.string(),
    displayImage: validations.urlSchema,
    // rate: z.number().nullable().optional(),
    createdAt: validations.dateStringSchema.optional(),
    updatedAt: validations.dateStringSchema.optional(),
});
