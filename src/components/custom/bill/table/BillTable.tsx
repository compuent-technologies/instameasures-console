import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import PageWrapper from "@/components/custom/wrapper/page-wrapper";


import { fetchBills } from "@/store/slices/bill-slice";
import { useAppSelector } from "@/store/hook";
import { useAppDispatch } from "@/store";
import { billTableColumns } from "./bill-column";
import type { Bill } from "@/types/types";
import CommonTableComponent from "../../common/table/common-table-component";

export default function BillTable() {
  const dispatch = useAppDispatch();

  // Local state for search
  const [search, setSearch] = useState("");

  // Redux state
  const { data: billsData, error } = useAppSelector(
    (state) => state.bills
  );

  // Fetch bills on mount
  useEffect(() => {
    dispatch(fetchBills());
  }, []);

  // Search filter
  const filteredBills = (billsData ?? []).filter((bill) =>
    bill.apartmentId?.toLowerCase().includes(search.toLowerCase())
  );

  // Action handlers
  const handleAdd = () => {
    console.log("Add new bill clicked");
  };

  const handleRefresh = () => {
    dispatch(fetchBills());
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

  // Table columns
  const columns = billTableColumns;

  const table = useReactTable<Bill>({
    data: filteredBills,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper
      title="Bills"
      subTitle="View and manage apartment bills"
      addTitle="New Bill"
      search={search}
      onSearchChange={setSearch}
      onAddClick={handleAdd}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
      // loading={loading}
      error={error}
    >
      <CommonTableComponent table={table} columns={columns} />
    </PageWrapper>
  );
}
