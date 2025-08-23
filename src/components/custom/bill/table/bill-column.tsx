import type { Bill } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";

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
];
