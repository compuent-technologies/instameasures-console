"use client";

import { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import PageWrapper from "@/components/custom/wrapper/page-wrapper";
import { userColumns } from "./user-column";
import type { UserType } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { listUsers, setSearch, setSort } from "@/store/slices/user-slice";
import CommonTableComponent from "../../common/table/common-table-component";
import { CommonPagination } from "../../common/table/common-pagination";
import { FormDialog } from "../../common/dialog/FormDialog";
import { UserForm } from "../form/UserForm";
import { UserRoles } from "@/constants/ROLES";

export default function SuperAdminsTable() {
    const dispatch = useAppDispatch();
    const { users, loading, page, pageSize, total, sortField, sortOrder } = useAppSelector(
        (state) => state.users
    );

    const [searchValue, setSearchValue] = useState("");

    // Fetch users from server whenever page, sort, or search changes
    useEffect(() => {
        dispatch(
            listUsers({
                page,
                limit: pageSize,
                sortField,
                sortOrder,
                role: UserRoles.SUPERADMIN,
                searchField: searchValue ? "name" : undefined,
                searchValue: searchValue || undefined,
            })
        );
    }, [dispatch, page, pageSize, sortField, sortOrder, searchValue]);

    const table = useReactTable<UserType>({
        data: users,
        columns: userColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        dispatch(setSearch({ searchField: "name", searchValue: value }));
    };

    const handleSortToggle = (columnId: string) => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        dispatch(setSort({ sortField: columnId, sortOrder: newOrder }));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(listUsers({ page: newPage, limit: pageSize, sortField, sortOrder, searchField: searchValue ? "name" : undefined, searchValue: searchValue || undefined }));
    };

    return (
        <PageWrapper
            title="Users"
            subTitle="View and manage apartment users"
            addTitle="New User"
            search={searchValue}
            onSearchChange={handleSearchChange}
            onAddClick={<FormDialog title="User Form" description="nothing" children={<UserForm mode="create" defaultValues={{}} onSubmit={() => { }} />} triggerLabel={"Create Form"} />}
            onRefresh={() => dispatch(listUsers({ page: 1, limit: pageSize, sortField, sortOrder, role: UserRoles.SUPERADMIN }))}
            onExport={() => console.log("Export clicked")}
            onSortToggle={() => handleSortToggle("name")}
            onFilterClick={() => console.log("Filter clicked")}
        >
            {!loading ? (
                <div>
                    <CommonTableComponent
                        table={table}
                        columns={userColumns}
                        isLoading={loading}
                    />
                    <CommonPagination
                        page={page}
                        totalPages={Math.ceil(total / pageSize)}
                        onPageChange={handlePageChange}
                    />
                </div>
            ) : (
                <div className="p-4 text-center text-muted-foreground">
                    Loading users...
                </div>
            )}
        </PageWrapper>
    );
}
