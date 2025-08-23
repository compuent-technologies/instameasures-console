"use client";

import { useEffect, useState } from "react";
import { fetchMeters } from "@/store/slices/meter-slice";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { meterTableColumns } from "./meter-table-columns";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store/hook";
import type { MeterType } from "@/types/meter";
import CommonTableComponent from "../../common/table/common-table-component";
import { CommonPagination } from "../../common/table/common-pagination";

export default function MetersTable() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const { data, loading, error, page, pageSize, total } = useAppSelector(
    (state) => state.meters
  );

  useEffect(() => {
    dispatch(fetchMeters());
  }, [dispatch]);

  const filteredMeters = data.filter(
    (meter: MeterType) =>
      meter.meterId?.toLowerCase().includes(search.toLowerCase()) ||
      meter.phoneNumber?.includes(search)
  );

  const table = useReactTable<MeterType>({
    data: filteredMeters || [],
    columns: meterTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper
      title="Meters"
      subTitle="View and manage meters records"
      addTitle="New Apartment"
      search={search}
      onSearchChange={setSearch}
      onAddClick={() => console.log("Add new apartment clicked")}
      onRefresh={() => dispatch(fetchMeters())}
      onExport={() => console.log("Export clicked")}
      onSortToggle={() => console.log("Sort toggled")}
      onFilterClick={() => console.log("Filter clicked")}
      loading={loading}
      error={error}
    >
      {!loading ? (
        <div>
          <CommonTableComponent
            table={table}
            columns={meterTableColumns}
            isLoading={loading}
          />
          <CommonPagination page={page} totalPages={total} onPageChange={() => {}} />
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading meters...
        </div>
      )}
    </PageWrapper>
  );
}
