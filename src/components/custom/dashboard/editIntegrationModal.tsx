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
import AddIntegrationModal from "./addIntegrationModel";

export default function EditIntegrationModal({
  integration,
  onClose,
  onSuccess,
}: {
  integration: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [integrationName, setIntegrationName] = useState(
    integration.integrationName,
  );
  const [apiKey, setApiKey] = useState(integration.apiKey);
  const [type, setType] = useState(integration.type);

  const handleUpdate = async () => {
    await fetch(`https://imrabo.onrender.com/integration/${integration._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ integrationName, apiKey, type }),
    });
    onSuccess();
    onClose();
  };

  return <AddIntegrationModal onClose={onClose} onSuccess={handleUpdate} />;
}
