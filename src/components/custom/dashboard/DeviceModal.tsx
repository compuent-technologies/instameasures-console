"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { ArrowDown } from "lucide-react";

// Define the structure for device modal properties
export function DeviceModal({
  onAdd,
  initialData = null,
  isEdit = false,
  onClose,
}: {
  onAdd: (device: any) => void;
  initialData?: any;
  isEdit?: boolean;
  onClose: () => void;
}) {
  const [device, setDevice] = useState({
    deviceName: "",
    deviceType: "",
  });
  const [open, setOpen] = useState(true); // Local state to control the modal visibility

  const deviceModels = [
    "ESP32",
    "ESP8266",
    "Arduino",
    "Raspberry Pi",
    "BeagleBone",
  ]; // Device models list

  useEffect(() => {
    if (initialData) {
      setDevice(initialData);
    } else {
      setDevice({ deviceName: "", deviceType: "" });
    }
  }, [initialData]);

  const handleSave = () => {
    onAdd(device);
    setOpen(false); // Close the modal
    onClose(); // Optional: Close the modal externally
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-zinc-100">
            {isEdit ? "Edit Device" : "Add Device"}
          </DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400">
            {isEdit
              ? "Update the details of your device."
              : "Enter the details of your device."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Device Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="device-name"
              className="text-right text-zinc-900 dark:text-zinc-200"
            >
              Device Name
            </Label>
            <Input
              id="device-name"
              placeholder="Enter device name"
              value={device.deviceName}
              onChange={(e) =>
                setDevice({ ...device, deviceName: e.target.value })
              }
              className="col-span-3 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
            />
          </div>

          {/* Device Model */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="device-model"
              className="text-right text-zinc-900 dark:text-zinc-200"
            >
              Device Model
            </Label>

            <Select
              value={device.deviceType}
              onValueChange={(value) =>
                setDevice({ ...device, deviceType: value })
              }
              // className="dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-600"
            >
              <SelectTrigger className="bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500">
                {device.deviceType ? device.deviceType : "Select a Model"}
                <ArrowDown className="ml-2" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-800">
                {deviceModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {isEdit ? "Save Changes" : "Add Device"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
