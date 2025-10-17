import { useState } from "react";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
  });

  const { cartItems, clearCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const enrichedCart = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return {
        product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as { product: Product; quantity: number }[];

  const total = enrichedCart.reduce(
    (sum, item) => sum + item.product.precio * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const carritoPayload = enrichedCart.map((item) => ({
      product: item.product,
      cantidad: item.quantity,
    }));

    // Simular envío con setTimeout
    console.log("Simulando envío de orden:", {
      nombre: form.nombre,
      email: form.email,
      direccion: form.direccion,
      carrito: carritoPayload,
    });

    // Simulación asincrónica
    setTimeout(() => {
      const ordenIdFicticio = Math.floor(Math.random() * 100000);
      alert(`✅ Orden simulada correctamente. ID ficticio: ${ordenIdFicticio}`);

      // Vaciar carrito (opcional)
      clearCart();

      // Redirigir (opcional)
      navigate("/"); // Asegurate de tener esta ruta definida
    }, 1500);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 gap-8 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 space-y-6 animate-fade-in-up"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Formulario de Checkout
          </h2>

          <div>
            <label className="block text-gray-700 dark:text-white font-bold mb-1 transition-all duration-300">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-white font-bold mb-1 transition-all duration-300">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-white font-bold mb-1 transition-all duration-300">
              Dirección:
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="px-3 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Enviar
          </button>
        </form>
        <aside className="flex-1 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-4 max-w-md mx-auto animate-fade-in-up">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            Resumen de la Orden
          </h3>

          <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 max-w-md mx-auto flex flex-col h-[500px]">
            {enrichedCart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                Tu carrito está vacío.
              </p>
            ) : (
              <>
                {/* Lista scrollable */}
                <ul className="divide-y divide-gray-600 overflow-y-auto pr-2 flex-1">
                  {enrichedCart.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="py-2 flex justify-between gap-4 items-start text-sm"
                    >
                      <div>
                        <p className="font-semibold">{product.nombre}</p>
                        <p className="text-xs text-gray-400">
                          {product.descripcion}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>
                          {quantity} × ${product.precio.toFixed(2)}
                        </p>
                        <p className="font-semibold text-blue-400">
                          ${(product.precio * quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer fijo */}
                <div className="border-t border-gray-600 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-extrabold text-xl text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Checkout;
