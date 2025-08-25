// src/hooks/useApartmentForm.ts
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { apartmentSchema } from "@/validations/apartment.validation";
import { useZodForm } from "@/hooks/useZodForm";

// ✅ Infer form type directly from Zod schema
export type ApartmentFormValues = z.infer<typeof apartmentSchema>;

type UseApartmentFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<ApartmentFormValues>;
};
export function useApartmentForm({
    defaultValues,
}: UseApartmentFormProps): UseFormReturn<ApartmentFormValues> {
    return useZodForm(apartmentSchema, {
        defaultValues: {
            name: "",
            address: "",
            city: "",
            pinCode: "",
            meterType: "",
            displayImage: "",
            //   rate: undefined, // ✅ matches number | null | undefined
            ...defaultValues,
        } satisfies Partial<ApartmentFormValues>,
    });
}
