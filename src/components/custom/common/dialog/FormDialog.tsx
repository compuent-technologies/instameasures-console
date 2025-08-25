// src/components/common/FormDialog.tsx
"use client";

import type { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type FormDialogProps = {
    title: string;
    description?: string;
    triggerLabel: string;
    children: ReactNode; // form goes here
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export function FormDialog({
    title,
    description,
    triggerLabel,
    children,
    open,
    onOpenChange,
}: FormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="mt-4">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
