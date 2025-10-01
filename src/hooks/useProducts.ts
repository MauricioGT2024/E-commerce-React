import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

const API_URL = "http://localhost:3000/productos";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const rawData = await res.json();
      const data: Product[] = rawData.map((item: any) => ({
        ...item,
        activo: Boolean(item.activo),
      }));
      setProducts(data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Hubo un error con el fetch" + error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    products,
    error,
    loading,
  };
}
