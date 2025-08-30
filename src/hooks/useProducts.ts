import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';

const API_URL = 'https://fakestoreapi.com/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);





  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
      setError('');
      setLoading(false);
    } catch (error) {
      setError('Hubo un error con el fetch' + error);
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
