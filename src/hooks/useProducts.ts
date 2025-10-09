import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

export const API_URL = "http://localhost:3000";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/productos`);
      if (!res.ok) {
        throw new Error("Error en el fetch de datos");
      }
      const rawData = await res.json();
      const data: Product[] = rawData.map((item: any) => ({
        ...item,
        precio: parseInt(item.precio),
        activo: Boolean(item.activo),
        descripcion: item.descripcion || "",
        categorias: item.categorias || "",
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
