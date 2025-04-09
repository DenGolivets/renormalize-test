"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { Product } from "@/types/product";
import { productData } from "@/services/mock";

interface ProductContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  selectedAmount: number;
  setSelectedAmount: Dispatch<SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredProductsForSearch: Product[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  removeProduct: (productId: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProductsForSearch = useMemo(() => {
    return products.filter((product) =>
      product["Product Name"].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const totalPages = useMemo(() => {
    const totalProducts = filteredProductsForSearch.length;
    const pages = totalProducts > 0 ? Math.ceil(totalProducts / selectedAmount) : 1;
  
    if (currentPage > pages) {
      setCurrentPage(pages);
    }
  
    return pages;
  }, [filteredProductsForSearch.length, selectedAmount, currentPage]);

  const removeProduct = (productId: number) => {
    setProducts((prevProducts) => 
      prevProducts.filter((product) => product["Tracking ID"] !== productId)
    );
  };

  const value = {
    products, setProducts,
    selectedAmount, setSelectedAmount,
    searchQuery, setSearchQuery,
    filteredProductsForSearch,
    currentPage, setCurrentPage, totalPages,
    removeProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
