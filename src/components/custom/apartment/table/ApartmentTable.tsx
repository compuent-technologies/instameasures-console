import React from "react";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useAppDispatch } from "@/store";
import { fetchApartments } from "@/store/slices/apartment-slice";
import { useAppSelector } from "@/store/hook";
import { apartmentTableColumns } from "./apartment-column";
import CommonTableComponent from "../../common/table/common-table-component";
import { Button } from "@/components/ui/button";
import type { ApartmentType } from "@/types/apartment";

export default function ApartmentsTable() {
  const [search, setSearch] = React.useState("");
  const dispatch = useAppDispatch();

  // ✅ Select from slice
  const { data, hasMore, isLoading } = useAppSelector(
    (state) => state.apartments
  );

  // ✅ Fetch apartments on mount (first page)
  React.useEffect(() => {
    dispatch(fetchApartments({ limit: 10 })); // initial load
  }, [dispatch]);

  // ✅ Refresh (reload from first page)
  const handleRefresh = () => {
    dispatch(fetchApartments({ limit: 10 })); // resets list
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

  // ✅ Setup table
  const table = useReactTable<ApartmentType>({
    data: data ?? [],
    columns: apartmentTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ✅ Load more using Firestore pagination
  const handleLoadMore = () => {
    if (hasMore) {
      dispatch(fetchApartments({ limit: 10, append: true }));
    }
  };

  return (
    <PageWrapper
      title="Apartments"
      subTitle="View and manage apartment records"
      addTitle="New Apartment"
      search={search}
      onSearchChange={setSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
    >
      {!isLoading ? (
        <div>
          <CommonTableComponent
            table={table}
            columns={apartmentTableColumns}
            isLoading={isLoading}
          />

          {/* ✅ Replace numbered pagination with Load More */}
          <div className="flex justify-center mt-4">
            {hasMore && (
              <Button onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading apartments...
        </div>
      )}
    </PageWrapper>
  );
}
