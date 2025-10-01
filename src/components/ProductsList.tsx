import { useState } from "react";
import type { Product } from "../types/Product";
import Pagination from "./Pagination";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductsList: React.FC = () => {
  const [filters, setFilters] = useState({
    categorias: "all",
    minPrice: 0,
  });
  const { loading, products } = useProducts();
  const { increaseCartQuantity } = useCart();

  const [productsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = products.length;

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categorias === "all" || product.categorias === filters.categorias;
    const matchesPrice = product.precio >= filters.minPrice;
    return matchesCategory && matchesPrice;
  });

  const categoriaUnica = Array.from(
    new Set(products.map((p) => p.categorias).filter(Boolean))
  );

  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-12 sm:mb-16 mt-8 sm:mt-12 flex flex-col justify-center text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Bienvenido a mi Tienda
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
          Descubre nuestra selección de productos ⬇️
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <select
              className="w-full sm:w-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 transition-colors"
              value={filters.categorias}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, categorias: e.target.value }));
                setCurrentPage(1);
              }}
            >
              <option value="all">Todas</option>
              {categoriaUnica.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-48 flex items-center gap-4">
                <input
                  type="range"
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  min={0}
                  max={999}
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: Number(e.target.value),
                    }))
                  }
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[100px]">
                  ${filters.minPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mb-8">
            {filteredProducts
              .slice(firstIndex, lastIndex)
              .map((product: Product) => (
                <div
                  key={product.id}
                  className="group flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col h-full">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex flex-col flex-grow"
                    >
                      <div className="relative pt-[100%] overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700"></div>

                      <div className="p-4 flex-grow">
                        <h5 className="mb-2 text-sm sm:text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
                          {product.nombre}
                        </h5>
                        <p className="mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {product.descripcion}
                        </p>
                      </div>
                    </Link>

                    <div className="px-4 pb-4">
                      <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                        ${product.precio}
                      </p>
                      <button
                        onClick={() => increaseCartQuantity(product.id)}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 transition-colors"
                      >
                        Comprar
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {filters.categorias === "all" && (
            <Pagination
              productsPerPage={productsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalProducts={totalProducts}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsList;
