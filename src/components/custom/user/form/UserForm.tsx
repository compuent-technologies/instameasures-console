// src/components/forms/UserForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserForm, type UserFormValues } from "../hook/useUserForm";
import { FormProvider } from "react-hook-form";

type UserFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<UserFormValues>;
    onSubmit: (values: UserFormValues) => void;
};

export function UserForm({ mode, defaultValues, onSubmit }: UserFormProps) {
    const methods = useUserForm({ mode, defaultValues });
    const { register } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input {...register("name")} placeholder="Full Name" />
                    <Input {...register("email")} placeholder="Email" type="email" />
                    <Input {...register("role")} placeholder="Role" />
                </div>

                <Button type="submit">
                    {mode === "create" ? "Create User" : "Update User"}
                </Button>
            </form>
        </FormProvider>
    );
}
