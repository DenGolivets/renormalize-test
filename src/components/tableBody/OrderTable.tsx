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
import { useCallback } from "react";

export default function OrderTable() {
  const {
    products,
    selectedAmount,
    searchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    removeProduct
  } = useProduct();

  const filteredProducts = products.filter((item) =>
    item["Product Name"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * selectedAmount,
    currentPage * selectedAmount
  );

  const handleDelete = useCallback((productId: number) => {
    removeProduct(productId);
    toast.success("Product deleted successfully");
  }, [removeProduct]);
  
  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }, [totalPages]);

  return (
    <div className="overflow-x-auto dark:bg-dark-custom">
      <Table className="border-separate border-spacing-0">
        <TableHeader>
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
                key={index}
                className={clsx(
                  "transition-colors",
                  isEven
                    ? "bg-[#F7F6FE] dark:bg-[#26264F]"
                    : "bg-white dark:bg-dark-custom"
                )}
              >
                <TableCell className="text-center">
                  #{item["Tracking ID"]}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={item["Product Image"]}
                    alt={item["Product Name"]}
                    width={32}
                    height={32}
                    className="size-8 rounded-full object-cover"
                  />
                  {item["Product Name"]}
                </TableCell>
                <TableCell>{item.Customer}</TableCell>
                <TableCell>{formatDate(item.Date)}</TableCell>
                <TableCell>${item.Amount.toFixed(2)}</TableCell>
                <TableCell>{item["Payment Mode"]}</TableCell>
                <TableCell>
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      getStatusStyle(item.Status)
                    )}
                  >
                    {item.Status}
                  </span>
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
