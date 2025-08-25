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

  // Fetch data when page, search, or pageSize changes
  useEffect(() => {
    dispatch(
      fetchMeters({
        page,
        limit: pageSize,
        search,
        sortField: "createdAt",
        sortOrder: "asc",
      })
    );
  }, [dispatch, page, pageSize, search]);

  const table = useReactTable<MeterType>({
    data: data || [],
    columns: meterTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper
      title="Meters"
      subTitle="View and manage meters records"
      addTitle="New Meter"
      search={search}
      onSearchChange={setSearch}
      onRefresh={() =>
        dispatch(fetchMeters({ page, limit: pageSize, search }))
      }
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
          <CommonPagination
            page={page}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={(newPage) =>
              dispatch(fetchMeters({ page: newPage, limit: pageSize, search }))
            }
          />
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading meters...
        </div>
      )}
    </PageWrapper>
  );
}
