import { validations } from "./common.validation";
import { z } from "zod";

// 🔹 Meter
export const meterSchema = z.object({
    id: validations.idSchema,
    apartmentId: validations.idSchema,
    createdAt: validations.dateStringSchema,
    updatedAt: validations.dateStringSchema,
    createdBy: validations.idSchema,
    updatedBy: z.string().nullable(),
    email: validations.emailSchema,
    phoneNumber: validations.phoneSchema,
    flatNumber: z.string().min(1),
    ownerName: validations.nameSchema,
    meterId: z.string(),
    readings: z.array(z.any()),
    sampleGraphData: z.any(),
    status: z.string(),
});
