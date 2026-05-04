import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export function useProducts() {
  return useContext(ProductContext);
}