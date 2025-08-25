// src/hooks/useMeterForm.ts
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { meterSchema } from "@/validations/meter.validation";

export type MeterFormValues = z.infer<typeof meterSchema>;

type UseMeterFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<MeterFormValues>;
};

export function useMeterForm({
    defaultValues,
}: UseMeterFormProps): UseFormReturn<MeterFormValues> {
    return useZodForm(meterSchema, {
        defaultValues: {
            id: "", // ⚠️ required by schema — but you may want to only enforce in `update`
            apartmentId: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: "",
            updatedBy: null, // matches schema (nullable)
            email: "",
            phoneNumber: "",
            flatNumber: "",
            ownerName: "",
            meterId: "",
            readings: [],
            sampleGraphData: {},
            status: "active",
            ...defaultValues,
        } satisfies Partial<MeterFormValues>,
    });
}
