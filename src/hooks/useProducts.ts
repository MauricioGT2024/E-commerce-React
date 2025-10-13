import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

export const API_URL = import.meta.env.VITE_API_URL || null;

function mapApiToProduct(item: any): Product {
  return {
    ...item,
    precio: parseInt(item.precio),
    activo: Boolean(item.activo),
    descripcion: item.descripcion || "",
    categorias: item.categorias || "",
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = async (signal: AbortSignal) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/productos`, { signal });
      if (!res.ok) {
        throw new Error("Error en el fetch de datos");
      }
      const rawData = await res.json();
      const data: Product[] = rawData.map(mapApiToProduct);
      setProducts(data);
      setError("");
    } catch (error: any) {
      if (error.name === "AbortError") return;
      setError("Hubo un error con el fetch: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);
    return () => controller.abort();
  }, []);

  return {
    products,
    refetch:fetchProduct,
    error,
    loading,
  };
}
