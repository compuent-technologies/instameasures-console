"use client";

import { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { fetchBills } from "@/store/slices/bill-slice";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { billTableColumns } from "./bill-column";
import type { Bill } from "@/types";
import CommonTableComponent from "../../common/table/common-table-component";
import { CommonPagination } from "../../common/table/common-pagination";

export default function BillTable() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const { data, total, page, pageSize, isLoading, error } = useAppSelector(
    (state) => state.bills
  );

  // Fetch bills whenever page, pageSize, or search changes
  useEffect(() => {
    dispatch(
      fetchBills({
        page,
        limit: pageSize,
        searchField: "apartmentId",
        searchValue: search,
      })
    );
  }, [dispatch, page, pageSize, search]);

  const table = useReactTable<Bill>({
    data: data || [],
    columns: billTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRefresh = () => {
    dispatch(
      fetchBills({
        page,
        limit: pageSize,
        searchField: "apartmentId",
        searchValue: search,
      })
    );
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
      title="Bills"
      subTitle="View and manage apartment bills"
      addTitle="New Bill"
      search={search}
      onSearchChange={setSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
      loading={isLoading}
      error={error}
    >
      {!isLoading ? (
        <div>
          <CommonTableComponent table={table} columns={billTableColumns} isLoading={isLoading} />
          <CommonPagination
            page={page}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={(newPage) =>
              dispatch(
                fetchBills({
                  page: newPage,
                  limit: pageSize,
                  searchField: "apartmentId",
                  searchValue: search,
                })
              )
            }
          />
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading bills...
        </div>
      )}
    </PageWrapper>
  );
}
