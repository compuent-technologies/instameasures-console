"use client";
import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  onRowClick?: (row: T) => void;
}

function renderCellValue(value: any) {
  // Firestore Timestamp object
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    "nanoseconds" in value
  ) {
    const date = new Date(value.seconds * 1000);
    return date.toLocaleString();
  }
  // Arrays/objects
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  // Primitives
  return value ?? "-";
}

export function DataTable<T>(props: DataTableProps<T>) {
  const { columns, data, caption, onRowClick } = props;
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.key)}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow
            key={(row as any).id ?? idx}
            className={onRowClick ? "cursor-pointer" : undefined}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map((col) => (
              <TableCell key={String(col.key)}>
                {col.render
                  ? col.render((row as any)[col.key], row)
                  : renderCellValue((row as any)[col.key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
