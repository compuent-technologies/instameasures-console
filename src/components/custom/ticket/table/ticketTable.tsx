import React from "react";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store"; // adjust paths
import { fetchTickets } from "@/store/slices/ticket.slice";
import { ticketTableColumns } from "./ticketColumn"; // define columns separately
import type { TicketType } from "@/store/slices/ticket-slice";
import CommonTableComponent from "../../common/table/common-table-component";

export default function TicketsTable() {
  const [search, setSearch] = React.useState("");
  const dispatch = useAppDispatch();

  const { data, loading: isLoading } = useAppSelector((state) => state.ticket);

  React.useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // Filter tickets based on search input (title or description)
  const filteredTickets = (data || []).filter((ticket: TicketType) =>
    ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
    ticket.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    console.log("Add new ticket clicked");
  };

  const handleRefresh = () => {
    dispatch(fetchTickets());
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

  const table = useReactTable<TicketType>({
    data: filteredTickets ?? [],
    columns: ticketTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper
      title="Tickets"
      subTitle="View and manage tickets"
      addTitle="New Ticket"
      search={search}
      onSearchChange={setSearch}
      onAddClick={handleAdd}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
    >
      {!isLoading ? (
        <CommonTableComponent
          table={table}
          columns={ticketTableColumns}
          isLoading={isLoading}
        />
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading tickets...
        </div>
      )}
    </PageWrapper>
  );
}
