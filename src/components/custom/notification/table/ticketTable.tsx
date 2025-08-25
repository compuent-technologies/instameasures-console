"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store/hook";
import { fetchTickets } from "@/store/slices/ticket.slice";
import { ticketTableColumns } from "./ticketColumn";
import CommonTableComponent from "../../common/table/common-table-component";
import { CommonPagination } from "../../common/table/common-pagination";
import type { TicketType } from "@/types/ticket";


export default function TicketsTable() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const { data, total, page, pageSize, loading, error } = useAppSelector(
    (state) => state.tickets
  );

  // Fetch tickets when component mounts or when search/page/pageSize changes
  useEffect(() => {
    dispatch(fetchTickets({ page, limit: pageSize, search }));
  }, [dispatch, page, pageSize, search]);

  const table = useReactTable<TicketType>({
    data: data || [],
    columns: ticketTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRefresh = () => {
    dispatch(fetchTickets({ page, limit: pageSize, search }));
  };

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleSort = () => {
    console.log("Sort toggled");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  return (
    <PageWrapper
      title="Tickets"
      subTitle="View and manage tickets"
      addTitle="New Ticket"
      search={search}
      onSearchChange={setSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
      loading={loading}
      error={error}
    >
      {!loading ? (
        <div>
          <CommonTableComponent
            table={table}
            columns={ticketTableColumns}
            loading={loading}
          />
          <CommonPagination
            page={page}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={(newPage) =>
              dispatch(fetchTickets({ page: newPage, limit: pageSize, search }))
            }
          />
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading tickets...
        </div>
      )}
    </PageWrapper>
  );
}
