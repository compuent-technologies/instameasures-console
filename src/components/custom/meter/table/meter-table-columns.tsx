import type { ColumnDef } from "@tanstack/react-table";
import type { MeterType } from "@/types/meter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const meterTableColumns: ColumnDef<MeterType>[] = [
  {
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "Apartment ID",
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-600 dark:text-white">
        {row.getValue("id") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "ownerName",
    header: "Owner Name",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("ownerName") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "flatNumber",
    header: "Flat No.",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "meterId",
    header: "Meter ID",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => console.log("View", row.original)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Edit", row.original)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => console.log("Delete", row.original)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
