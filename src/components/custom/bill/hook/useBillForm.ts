// src/hooks/useBillForm.ts
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { billSchema } from "@/validations/bill.validation";

// infer type from schema
export type BillFormValues = z.infer<typeof billSchema>;

type UseBillFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<BillFormValues>;
};

export function useBillForm({
    defaultValues,
}: UseBillFormProps): UseFormReturn<BillFormValues> {
    return useZodForm(billSchema, {
        defaultValues: {
            apartmentId: "",
            apartmentName: "",
            amount: 0,
            dueDate: new Date().toISOString(),
            status: "unpaid",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...defaultValues,
        } satisfies Partial<BillFormValues>,
    });
}
