import type { ColumnDef } from "@tanstack/react-table";
import type { MeterType } from "@/types/meter";

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
];
