"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store/hook";
import CommonTableComponent from "../../common/table/common-table-component";
import { CommonPagination } from "../../common/table/common-pagination";
import { fetchRateConfigs } from "@/store/slices/rate-config.slice";
import { rateConfigTableColumns } from "./rateConfigColumn";
import type RateConfigType from "@/types/rateConfig";

export default function RateConfigTable() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const { data, total, page, pageSize, loading, error } = useAppSelector(
    (state) => state.rateConfig
  );

  // Fetch rate configs on mount or when search/page/pageSize changes
  useEffect(() => {
    dispatch(fetchRateConfigs({ page, limit: pageSize, search }));
  }, [dispatch, page, pageSize, search]);

  const table = useReactTable<RateConfigType>({
    data: data || [],
    columns: rateConfigTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRefresh = () => {
    dispatch(fetchRateConfigs({ page, limit: pageSize, search }));
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
      title="Rate Configurations"
      subTitle="View and manage rate configuration records"
      addTitle="New Rate Config"
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
            columns={rateConfigTableColumns}
            isLoading={loading}
          />
          <CommonPagination
            page={page}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={(newPage) =>
              dispatch(fetchRateConfigs({ page: newPage, limit: pageSize, search }))
            }
          />
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading rate configs...
        </div>
      )}
    </PageWrapper>
  );
}
