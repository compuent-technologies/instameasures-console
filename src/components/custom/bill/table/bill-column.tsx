import type { Bill } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
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

export const billTableColumns: ColumnDef<Bill>[] = [
  {
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("amount") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "apartmentId",
    header: "Apartment ID",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("apartmentId") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("updatedAt") || "N/A"}
      </div>
    ),
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
