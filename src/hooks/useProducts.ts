import { useEffect, useState } from "react";
import type { Root } from "../types/Product";

const API_URL = "https://fakestoreapi.com/products";


export function useProducts() {
  const [products, setProducts] = useState<Root>([])
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json()
        setProducts(data);
      } catch (error) {
        console.error(error)
      }
    }
    fetchProduct()
  }, [])
  return{
    products
  }
}
