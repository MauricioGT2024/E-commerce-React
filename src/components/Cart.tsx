// src/pages/Cart.tsx
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function Cart() {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart();

  const { loading, products } = useProducts();

  const navigate = useNavigate();
  const getProductData = (id: number) => products.find((p) => p.id === id);

  const total = cartItems.reduce((sum, item) => {
    const product = getProductData(item.id);
    const precio = Number(product?.precio);
    return sum + (isNaN(precio) ? 0 : precio * item.quantity);
  }, 0);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Cargando carrito...</p>
    );
  }

  const handlePagar = () => {
    alert("Funcionalidad de pago implementada Redirigiendo...");
    navigate("/checkout");
  };
  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío 🛒</h2>
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Tu Carrito</h2>

      <ul className="space-y-6">
        {cartItems.map((item) => {
          const product = getProductData(item.id);
          if (!product) return null;

          return (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b pb-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Placeholder de imagen */}
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0" />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Precio unitario:{" "}
                    <span className="font-medium">
                      ${product.precio.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal:{" "}
                    <span className="font-semibold text-green-600">
                      ${(product.precio * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Controles cantidad */}
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => decreaseCartQuantity(item.id)}
                  disabled={item.quantity <= 1}
                  className={`px-3 py-1 rounded border ${
                    item.quantity <= 1
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-300 dark:hover:bg-gray-600"
                  } transition`}
                >
                  −
                </button>

                <span className="w-6 text-center">{item.quantity}</span>

                <button
                  onClick={() => increaseCartQuantity(item.id)}
                  className="px-3 py-1 rounded border hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800 font-semibold"
                  aria-label={`Eliminar ${product.nombre} del carrito`}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Resumen y pagar */}
      <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-semibold">
          Total: <span className="text-green-600">${total.toFixed(2)}</span>
        </p>

        <button
          onClick={handlePagar}
          className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Pagar ahora
        </button>
      </div>
    </div>
  );
}
