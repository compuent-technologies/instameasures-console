// src/components/forms/BillForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBillForm, type BillFormValues } from "../hook/useBillForm";
import { FormProvider } from "react-hook-form";

type BillFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<BillFormValues>;
    onSubmit: (values: BillFormValues) => void;
};

export function BillForm({ mode, defaultValues, onSubmit }: BillFormProps) {
    const methods = useBillForm({ mode, defaultValues });
    const { register } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input {...register("amount")} placeholder="Amount" type="number" />
                    <Input {...register("dueDate")} placeholder="Due Date" type="date" />
                    <Input {...register("status")} placeholder="Status" />
                </div>

                <Button type="submit">
                    {mode === "create" ? "Create Bill" : "Update Bill"}
                </Button>
            </form>
        </FormProvider>
    );
}
