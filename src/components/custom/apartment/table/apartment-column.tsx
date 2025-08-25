/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { Link } from "react-router-dom";
import ROUTES from "@/constants/ROUTES";
import type { ApartmentType } from "@/types/apartment";

export const apartmentTableColumns: ColumnDef<ApartmentType, any>[] = [
  {
    id: "serial", // ✅ give it an id (computed column)
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
  {
    id: "action", // ✅ must have an id for action column
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
          <DropdownMenuItem asChild>
            <Link to={ROUTES.NAVIGATE.APARTMENT_DETAIL(row.getValue("id"))}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.NAVIGATE.APARTMENT_USERS(row.getValue("id"))}>
              Users
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.NAVIGATE.APARTMENT_METERS(row.getValue("id"))}>
              Meters
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.NAVIGATE.APARTMENT_RATE_CONFIG(row.getValue("id"))}>
              Config Rates
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
