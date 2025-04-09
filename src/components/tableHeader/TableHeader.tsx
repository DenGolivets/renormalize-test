"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SwitchThemeMode } from "./SwitchThemeMode";
import { Loader2, Search } from "lucide-react";
import { useProduct } from "@/context/ProductContext";
import { ChangeEvent } from "react";

const TableHeader = () => {
  const {
    selectedAmount,
    setSelectedAmount,
    filteredProductsForSearch,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    currentPage,
    loading,
    setLoading,
  } = useProduct();

  const handleSelectChange = (value: string) => {
    setLoading(true);
    const newAmount =
      value === "show-all" ? filteredProductsForSearch.length : Number(value);
    setSelectedAmount(newAmount);

    const maxPages = Math.ceil(filteredProductsForSearch.length / newAmount);

    if (currentPage > maxPages) {
      setCurrentPage(maxPages);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const selectedLabel =
    selectedAmount === filteredProductsForSearch.length
      ? "Show All"
      : selectedAmount.toString();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="w-full h-full px-4 py-6 dark:bg-dark-custom">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3 items-center">
          <span className="hidden sm:block">Show</span>
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-fit flex items-center justify-center px-4 py-2 bg-[#E0E0E0] dark:bg-[#141432] rounded-md">
                <Loader2 
                  className="animate-spin text-purple-600 dark:text-purple-400"
                  size={16}
                />
              </div>
            ) : (
              <Select
                value={
                  selectedAmount === filteredProductsForSearch.length
                    ? "show-all"
                    : selectedAmount.toString()
                }
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-fit bg-[#E0E0E0] dark:bg-[#141432] dark:border-none">
                  <SelectValue
                    placeholder={selectedLabel}
                    className="text-sm sm:text-xs"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="show-all">Show All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <span className="hidden sm:block">entries</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="ml-3 border outline-none pt-2 pb-2 pr-2 pl-8 rounded-[8px] placeholder:text-white"
            />
            <Search className="absolute size-4 left-5 top-1/2 -translate-y-1/2 z-1" />
          </div>
        </div>
        <div>
          <SwitchThemeMode />
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
