"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export function AutomationModal({
  onAdd,
  initialData = null,
  isEdit = false,
  onClose,
}: {
  onAdd: (automation: any) => void;
  initialData?: any;
  isEdit?: boolean;
  onClose?: () => void;
}) {
  const [automation, setAutomation] = useState({
    name: "",
    enabled: false,
    rules: "",
  });

  useEffect(() => {
    if (initialData) {
      setAutomation(initialData);
    } else {
      setAutomation({ name: "", enabled: false, rules: "" });
    }
  }, [initialData]);

  const handleSave = () => {
    onAdd(automation);
    if (onClose) onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Automation" : "Add Automation"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="automation-name" className="text-right">
              Name
            </Label>
            <Input
              id="automation-name"
              placeholder="Enter automation name"
              value={automation.name}
              onChange={(e) =>
                setAutomation({ ...automation, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Enabled</Label>
            <Switch
              checked={automation.enabled}
              onCheckedChange={(value) =>
                setAutomation({ ...automation, enabled: value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="automation-rules" className="text-right">
              Rules
            </Label>
            <Textarea
              id="automation-rules"
              placeholder="Define rules here..."
              value={automation.rules}
              onChange={(e) =>
                setAutomation({ ...automation, rules: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEdit ? "Save Changes" : "Add Automation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
