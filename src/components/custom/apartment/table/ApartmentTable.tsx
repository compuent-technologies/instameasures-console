import React from "react";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useAppDispatch } from "@/store"; // ✅ adjust paths as per your store
import { fetchApartments } from "@/store/slices/apartment-slice";
import { useAppSelector } from "@/store/hook";
import { apartmentTableColumns } from "./apartment-column";
import type { Apartment } from "@/types/types";
import CommonTableComponent from "../../common/table/common-table-component";

export default function ApartmentsTable() {
  const [search, setSearch] = React.useState("");
  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector(
    (state) => state.apartments // ✅ match slice key
  );

  React.useEffect(() => {
    dispatch(fetchApartments());
  }, []);

  const filteredApartments = (data || []).filter((apartment: Apartment) =>
    apartment.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    console.log("Add new apartment clicked");
  };

  const handleRefresh = () => {
    dispatch(fetchApartments());
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


  const table = useReactTable<Apartment>({
    data: filteredApartments ?? [],
    columns: apartmentTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper
      title="Apartments"
      subTitle="View and manage apartment records"
      addTitle="New Apartment"
      search={search}
      onSearchChange={setSearch}
      onAddClick={handleAdd}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
    >
      {!isLoading ? (
        <CommonTableComponent table={table} columns={apartmentTableColumns} isLoading={isLoading} />
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          Loading apartments...
        </div>
      )}
    </PageWrapper>
  );
}
