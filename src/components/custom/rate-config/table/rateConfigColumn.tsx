import type { Apartment } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";


export const apartmentTableColumns: ColumnDef<Apartment>[] = [
  {
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "Apartment ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-gray-600 dark:text-white">
        {row.getValue("id") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("name") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("city") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("address") || "N/A"}
      </div>
    ),
  },
];
