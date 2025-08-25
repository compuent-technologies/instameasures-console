// src/hooks/useUserForm.ts
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { userSchema } from "@/validations/user.validation";

export type UserFormValues = z.infer<typeof userSchema>;

type UseUserFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<UserFormValues>;
};

export function useUserForm({
    defaultValues,
}: UseUserFormProps): UseFormReturn<UserFormValues> {
    return useZodForm(userSchema, {
        defaultValues: {
            apartmentId: "",
            createdAt: new Date().toISOString(),
            updatedAt: null,
            createdBy: "",
            updatedBy: null,
            displayImage: "",
            email: "",
            name: "",
            phoneNumber: "",
            role: "delegate", // fallback
            ...defaultValues,
        } satisfies Partial<UserFormValues>,
    });
}
