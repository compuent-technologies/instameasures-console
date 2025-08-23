/* eslint-disable @typescript-eslint/no-explicit-any */


import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const MAX_LENGTH = 100;

function truncate(value: any) {
  if (typeof value === "string" && value.length > MAX_LENGTH) {
    return value.slice(0, MAX_LENGTH) + "...";
  }
  return value;
}

const CommonTableComponent = ({ table, columns }: any) => {
  return (
    <>
      <div className="w-full overflow-x-auto border dark:text-white  bg-zinc-50 shadow-md rounded-md dark:bg-zinc-950">
        <Table className="min-w-[700px] w-full table-auto">
          <TableHeader className="dark:text-white">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers
                  .filter((header: any) => header.column?.id !== "id")
                  .map((header: any) => {
                    const columnId = header.column?.id;
                    const alignClass =
                      columnId === "index"
                        ? "text-center"
                        : columnId === "actions"
                          ? "text-right"
                          : "text-left";

                    return (
                      <TableHead
                        key={header.id}
                        className={`px-4 py-2 font-semibold dark:text-white text-sm ${alignClass}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                <TableHead className="px-4 py-2 text-right font-semibold text-sm">
                  Actions
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="dark:text-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row
                    .getVisibleCells()
                    .filter((cell: any) => cell.column.id !== "id")
                    .map((cell: any) => {
                      const isIndex = cell.column.id === "index";
                      return (
                        <TableCell
                          key={cell.id}
                          className={`px-4 py-2 text-sm ${
                            isIndex ? "text-center font-medium" : "text-left"
                          }`}
                        >
                          {isIndex
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )
                            : truncate(
                                flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                ),
                              )}
                        </TableCell>
                      );
                    })}
            
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CommonTableComponent;
