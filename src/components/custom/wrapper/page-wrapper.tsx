"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  // Plus,
  Search,
  RefreshCcw,
  Download,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface PageWrapperProps {
  title: string;
  subTitle?: string;
  addTitle?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  onAddClick?: ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
  onSortToggle?: () => void;
  onFilterClick?: () => void;
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
}

export default function PageWrapper({
  title,
  subTitle,
  // addTitle,
  search,
  onSearchChange,
  onAddClick,
  onRefresh,
  onExport,
  onSortToggle,
  onFilterClick,
  children,
  loading = false,
  error = null,
}: PageWrapperProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {subTitle && (
          <p className="text-muted-foreground text-sm">{subTitle}</p>
        )}
      </div>

      {/* Search + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            className="pl-8"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onSortToggle}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Button variant="outline" onClick={onFilterClick}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {/* <Button onClick={onAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            {addTitle ?? "Add New"}
          </Button> */}
          {onAddClick && (onAddClick)}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10 text-muted-foreground">
          <Loader2 className="h-6 w-6 mr-2 animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </div>
  );
}
