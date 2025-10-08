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
      if (!res.ok) {
        throw new Error("Error en el fetch de datos");
      }
      const rawData = await res.json();
      const data: Product[] = rawData.map((item: any) => ({
        ...item,
        activo: Boolean(item.activo),
        // ✅ convertir precio a número real
        precio:
          typeof item.precio === "object" &&
          typeof item.precio.toNumber === "function"
            ? item.precio.toNumber()
            : Number(item.precio),
      }));
      setProducts(data);
      setError("");
    } catch (error) {
      setError("Hubo un error con el fetch" + error);
    } finally {
      setLoading(false);
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
