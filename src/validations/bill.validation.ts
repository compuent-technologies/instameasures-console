import z from "zod";
import { validations } from "./common.validation";

// 🔹 Bill
export const billSchema = z.object({
    id: validations.idSchema.optional(),
    apartmentId: validations.idSchema,
    apartmentName: z.string().min(2),
    amount: z.number().min(0),
    dueDate: validations.dateStringSchema,
    status: z.enum(["paid", "unpaid", "overdue"]),
    createdAt: validations.dateStringSchema,
    updatedAt: validations.dateStringSchema,
});


// 🔹 Create / Update DTOs
export const createApartmentSchema = z.object({
    name: validations.nameSchema,
    address: z.string(),
    units: z.number().min(1),
});
export const updateApartmentSchema = createApartmentSchema.partial().extend({ id: validations.idSchema });

export const createBillSchema = z.object({
    apartmentId: validations.idSchema,
    amount: z.number().min(0),
    dueDate: validations.dateStringSchema,
});
export const updateBillSchema = createBillSchema.partial().extend({ id: validations.idSchema });

export const createMeterSchema = z.object({
    apartmentId: validations.idSchema,
    type: z.enum(["electricity", "water", "gas"]),
    reading: z.number().min(0),
    lastReadingDate: validations.dateStringSchema,
});
export const updateMeterSchema = createMeterSchema.partial().extend({ id: validations.idSchema });
