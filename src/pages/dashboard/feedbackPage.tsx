"use client";

import React from "react";
import { useBills } from "@/api/hooks";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import BillTable from "@/components/custom/bill/table/BillTable";

export default function FeedBackPage() {
  const [search, setSearch] = React.useState("");
  const { data: billsData = [], isLoading, refetch } = useBills();

  const filteredBills = billsData.filter((bill) =>
    bill.apartmentId?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    console.log("Add new bill clicked");
  };

  const handleRefresh = () => {
    refetch();
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
      onAddClick={handleAdd}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSortToggle={handleSort}
      onFilterClick={handleFilter}
    >
      <BillTable bills={filteredBills} isLoading={isLoading} />
    </PageWrapper>
  );
}
