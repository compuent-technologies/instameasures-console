/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * ✅ Generic hook for forms with Zod validation
 * - Works with any Zod schema
 * - Provides strong typing for form values
 * - Centralizes resolver + mode config
 */
export function useZodForm<
    TSchema extends z.ZodTypeAny,
    TFieldValues extends FieldValues = z.infer<TSchema> & FieldValues
>(
    schema: TSchema | any,
    options?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
    return useForm<TFieldValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
        ...options,
    });
}

// 🔹 Helper type (optional) so you can reuse inferred form values
export type ZodFormValues<TSchema extends z.ZodTypeAny> = z.infer<TSchema>;
