import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useMemo } from "react";

const ProductDetail = () => {
  const { products, loading } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { increaseCartQuantity } = useCart();

  // product puede ser undefined
  const product: Product | undefined = useMemo(() => {
    return products.find((p: Product) => p.id === Number(id));
  }, [products, id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Producto no encontrado.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col md:flex-row gap-8">
      {/* Imagen */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square">
        <img
          src={product.imagenUrl || "https://via.placeholder.com/300"}
          alt={product.nombre}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      {/* Detalles y acciones */}
      <article className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.nombre}
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {product.descripcion}
          </p>
          <p className="mt-4 text-2xl font-semibold text-green-600">
            ${product.precio.toFixed(2)}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-grow px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Volver
          </button>

          <button
            onClick={() => {
              increaseCartQuantity(product.id);
              alert("Producto añadido al carrito");
            }}
            className="flex-grow px-4 py-3 rounded-md bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
          >
            Comprar
          </button>
        </div>
      </article>
    </div>
  );
};

export default ProductDetail;
