// Example usage inside a dialog
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SupportForm } from "../form/SupportForm";
import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";


export default function HelpSupportDialog() {
    const handleSubmit = async (data: unknown) => {
        // Here you can call your API endpoint
        // await api.post("/support", data);
        console.log("Support request:", data);
        alert("Your message has been sent!");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost"><LifeBuoy /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Help & Support</DialogTitle>
                    <DialogDescription>Your connect to the compuent for the help</DialogDescription>
                </DialogHeader>
                <SupportForm onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    );
}
