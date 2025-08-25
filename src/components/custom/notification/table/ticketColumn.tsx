
import type { TicketType } from "@/types/ticket";
import type { ColumnDef } from "@tanstack/react-table";

export const ticketTableColumns: ColumnDef<TicketType>[] = [
  {
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-gray-600 dark:text-white">
        {row.getValue("id") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("title") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("status") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("description") || "N/A"}
      </div>
    ),
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => {
  //     const date = row.getValue("createdAt");
  //     return (
  //       <div className="text-gray-500 dark:text-gray-300 text-sm">
  //         {date ? new Date(date).toLocaleString() : "N/A"}
  //       </div>
  //     );
  //   },
  // },
];
