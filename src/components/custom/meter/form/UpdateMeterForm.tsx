// src/components/forms/MeterForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeterForm, type MeterFormValues } from "../hook/useMeterForm";
import { FormProvider } from "react-hook-form";

type MeterFormProps = {
    mode: "create" | "update";
    defaultValues?: Partial<MeterFormValues>;
    onSubmit: (values: MeterFormValues) => void;
};

export function MeterForm({ mode, defaultValues, onSubmit }: MeterFormProps) {
    const methods = useMeterForm({ mode, defaultValues });
    const { register } = methods;

    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6" >
                <div className="space-y-4" >
                    <Input {...register("apartmentId")} placeholder="Apartment ID" />
                    <Input {...register("flatNumber")} placeholder="Flat Number" />
                    <Input {...register("meterId")} placeholder="Meter ID" />
                    <Input {...register("ownerName")} placeholder="Owner Name" />
                    <Input {...register("email")} placeholder="Email" type="email" />
                    <Input {...register("phoneNumber")} placeholder="Phone Number" />
                    <Input {...register("status")} placeholder="Status" />
                </div>

                < Button type="submit" >
                    {mode === "create" ? "Create Meter" : "Update Meter"
                    }
                </Button>
            </form>
        </FormProvider>
    );
}
