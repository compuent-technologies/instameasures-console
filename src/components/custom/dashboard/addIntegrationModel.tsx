import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INTEGRATION_TYPES = ["API", "Webhook", "MQTT", "iPaaS", "Other"];

export default function AddIntegrationModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [integrationName, setIntegrationName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async () => {
    if (!integrationName || !type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://imrabo.onrender.com/integration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ integrationName, apiKey, type }),
      });

      if (!response.ok) throw new Error("Failed to add integration");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding integration:", error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-6 rounded-2xl bg-white dark:bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Add Integration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-300">
              Integration Name
            </Label>
            <Input
              value={integrationName}
              onChange={(e) => setIntegrationName(e.target.value)}
              placeholder="Enter integration name"
              className="mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200 dark:focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-300">
              API Key
            </Label>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key (optional)"
              className="mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-300">
              Type
            </Label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200 dark:focus:ring-blue-400"
              required
            >
              <option value="">Select Type</option>
              {INTEGRATION_TYPES.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            variant="ghost"
            className="rounded-lg text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!integrationName || !type}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
