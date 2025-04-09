"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useProduct } from "@/context/ProductContext";
import { formatDate } from "@/utils/formatDate";
import { getStatusStyle } from "@/utils/getStatusStyle";
import Pagination from "./Pagination";
import { toast } from "sonner";
import { useCallback, useMemo } from "react";

export default function OrderTable() {
  const {
    filteredProductsForSearch,
    selectedAmount,
    currentPage,
    setCurrentPage,
    totalPages,
    removeProduct,
  } = useProduct();

  const displayedProducts = useMemo(() => {
    return filteredProductsForSearch.slice(
      (currentPage - 1) * selectedAmount,
      currentPage * selectedAmount
    );
  }, [filteredProductsForSearch, currentPage, selectedAmount]);

  const handleDelete = useCallback(
    (productId: number) => {
      removeProduct(productId);
      toast.success("Product deleted successfully");
    },
    [removeProduct]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages]
  );

  return (
    <div className="overflow-x-auto w-full dark:bg-dark-custom">
      <Table className="border-separate border-spacing-0">
        <TableHeader className="hidden md:table-header-group">
          <TableRow className="bg-white dark:bg-dark-custom">
            <TableHead className="font-bold text-center">Tracking ID</TableHead>
            <TableHead className="font-bold">Product</TableHead>
            <TableHead className="font-bold">Customer</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Amount</TableHead>
            <TableHead className="font-bold">Payment Mode</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedProducts.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <TableRow
                key={item["Tracking ID"]}
                className={clsx(
                  "transition-colors md:table-row flex flex-col md:flex-row",
                  isEven
                    ? "bg-[#F7F6FE] dark:bg-[#26264F]"
                    : "bg-white dark:bg-dark-custom"
                )}
              >
                <TableCell className="text-center md:table-cell">
                  <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400 mr-3">
                    Tracking ID:
                  </span>
                  #{item["Tracking ID"]}
                </TableCell>
                <TableCell className="flex items-center gap-2 md:table-cell">
                  <div
                    className="flex flex-col md:flex-row items-center justify-center md:justify-normal 
                  gap-2 w-full"
                  >
                    <Image
                      src={item["Product Image"]}
                      alt={item["Product Name"]}
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover"
                    />
                    <span>
                      <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400">
                        Product:{" "}
                      </span>
                      {item["Product Name"]}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell">
                  <div className="flex items-center gap-2 justify-center md:justify-normal">
                    <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400">
                      Customer:{" "}
                    </span>
                    <span>{item.Customer}</span>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell">
                  <div className="flex items-center gap-2 justify-center md:justify-normal">
                    <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400">
                      Date:{" "}
                    </span>
                    <span>{formatDate(item.Date)}</span>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell">
                  <div className="flex items-center justify-center md:justify-normal gap-2">
                    <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400">
                      Amount:{" "}
                    </span>
                    <span>${item.Amount.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell">
                  <div className="flex items-center justify-center md:justify-normal gap-2">
                    <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400">
                      Payment:{" "}
                    </span>
                    <span>{item["Payment Mode"]}</span>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell">
                  <div className="flex items-center justify-center md:justify-normal gap-3">
                    <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400">
                      Status:{" "}
                    </span>
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        getStatusStyle(item.Status)
                      )}
                    >
                      {item.Status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button size="icon" variant="ghost">
                    <SquarePen className="size-6 text-purple-600 dark:text-purple-400" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item["Tracking ID"])}
                  >
                    <Trash2 className="size-6 text-trash-icon" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
