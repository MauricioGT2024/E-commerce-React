import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductsList: React.FC = () => {
  const [filters, setFilters] = useState({
    categorias: "all",
    minPrice: 0,
  });
  const { products, error, loading } = useProducts();
  const { increaseCartQuantity } = useCart();

  const [productsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        filters.categorias === "all" ||
        product.categorias === filters.categorias;
      const matchesPrice = product.precio >= filters.minPrice;
      return matchesCategory && matchesPrice;
    });
  }, [products, filters]);

  const paginatedProducts = useMemo(() => {
    const firtsIndex = (currentPage - 1) * productsPerPage;
    const lastIndex = currentPage * productsPerPage;
    return filteredProducts.slice(firtsIndex, lastIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  const categoriaUnica = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.categorias).filter(Boolean))
    );
  }, [products]);

  if (error) {
    return (
      <p className="text-center text-red-600 mt-8">Ocurrió un error: {error}</p>
    );
  }

  if (loading) {
    return <p className="text-center mt-8">Cargando productos...</p>;
  }
  if (products.length === 0) {
    return <p className="text-center mt-8">No hay productos disponibles.</p>;
  }

  // UI re-diseñada
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center mt-8 mb-12">
        <h1 className="text-4xl font-bold mb-2">🛍️ Tienda</h1>
        <p className="text-gray-500">Descubre lo que tenemos para vos</p>
      </header>

      {/* 🔍 Filtros */}
      <section className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-8 flex flex-col sm:flex-row gap-4 items-center justify-around">
        <div className="flex gap-4 flex-wrap w-full sm:w-auto">
          <select
            className="p-2 rounded border dark:bg-gray-800 dark:text-white"
            value={filters.categorias}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, categorias: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="all">Todas las categorías</option>
            {categoriaUnica.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: Number(e.target.value),
                }))
              }
              className="w-32"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Desde ${filters.minPrice}
            </span>
          </div>

          <button
            onClick={() => {
              setFilters({ categorias: "all", minPrice: 0 });
              setCurrentPage(1);
            }}
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Reset filtros
          </button>
        </div>
      </section>

      {/* 🛒 Productos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <Link to={`/product/${product.id}`}>
              <div className="h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={product.imagenUrl || "https://via.placeholder.com/150"}
                  alt={product.nombre}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                  {product.nombre}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.descripcion || "Sin descripción"}
                </p>
                <p className="text-xs text-gray-400">{product.categorias}</p>
              </div>
            </Link>
            <div className="mt-auto px-4 py-3 flex justify-between items-center">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {product.precio.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
              <button
                onClick={() => increaseCartQuantity(product.id)}
                className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 📄 Paginación */}
      <div className="mt-10 flex justify-center">
        {filteredProducts.length > productsPerPage && (
          <Pagination
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsList;
