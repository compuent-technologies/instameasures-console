// src/components/forms/UpdateApartmentForm.tsx
import { FormProvider } from "react-hook-form";
import { useApartmentForm, type ApartmentFormValues } from "../hook/useApartmentForm";

type UpdateApartmentFormProps = {
    initialData: ApartmentFormValues;
    onSubmit: (data: ApartmentFormValues) => void;
};

export default function UpdateApartmentForm({ initialData, onSubmit }: UpdateApartmentFormProps) {
    const form = useApartmentForm({
        mode: "update",
        defaultValues: initialData, // ✅ prefill with apartment data
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...form.register("name")}
                    placeholder="Apartment Name"
                    className="border p-2"
                />
                {form.formState.errors.name && (
                    <p className="text-red-500">{form.formState.errors.name.message}</p>
                )}

                <input
                    {...form.register("address")}
                    placeholder="Address"
                    className="border p-2"
                />
                {form.formState.errors.address && (
                    <p className="text-red-500">{form.formState.errors.address.message}</p>
                )}

                <input
                    {...form.register("city")}
                    placeholder="City"
                    className="border p-2"
                />

                <input
                    {...form.register("pinCode")}
                    placeholder="Pin Code"
                    className="border p-2"
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </FormProvider>
    );
}
