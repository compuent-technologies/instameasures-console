
import type RateConfigType from "@/types/rateConfig";
import type { ColumnDef } from "@tanstack/react-table";

export const rateConfigTableColumns: ColumnDef<RateConfigType>[] = [
  {
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "Config ID",
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("type") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("rate") ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-gray-500 dark:text-gray-300">
        {row.getValue("createdAt")
          ? new Date(row.getValue("createdAt")).toLocaleDateString()
          : "N/A"}
      </div>
    ),
  },
];
