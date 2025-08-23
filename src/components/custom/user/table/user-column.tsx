import type { ColumnDef } from "@tanstack/react-table";
import type { UserType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const userColumns: ColumnDef<UserType>[] = [
  {
    header: "S. No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "displayImage",
    header: "Image",
    cell: ({ row }) => {
      const value = row.getValue("displayImage");
      return value ? (
        <Avatar className="h-8 w-8">
          <AvatarImage src={value as string} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("email") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("phoneNumber") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("role") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-white">
        {row.getValue("createdBy") || "N/A"}
      </div>
    ),
  },
];
