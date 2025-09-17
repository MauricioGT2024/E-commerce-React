// src/pages/Cart.tsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

export default function Cart() {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { loading, products } = useProducts();

  const getProductData = (id: number) => products.find((p) => p.id === id);

  const total = cartItems.reduce((sum, item) => {
    const product = getProductData(item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return (
      <p className='text-center mt-10 text-gray-600'>Cargando carrito...</p>
    );
  }

  const handlePagar = () => {
    alert(
      'Funcionalidad de pago no implementada aún. pero el carrito se vaciara'
    );
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className='text-center mt-10'>
        <h2 className='text-xl font-semibold mb-4'>Tu carrito está vacío 🛒</h2>
        <Link
          to='/'
          className='text-blue-600 underline hover:text-blue-800 transition'
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Carrito de compras</h2>
      <ul className='space-y-6'>
        {cartItems.map((item) => {
          const product = getProductData(item.id);
          if (!product) return null;

          return (
            <li
              key={item.id}
              className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b pb-4'
            >
              <div className='flex items-center gap-4 w-full sm:w-auto'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-20 h-20 object-contain'
                />
                <div>
                  <h3 className='text-lg font-medium'>{product.title}</h3>
                  <p className='text-sm text-gray-500'>
                    Precio unitario: ${product.price.toFixed(2)}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Subtotal: ${(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <button
                  onClick={() => decreaseCartQuantity(item.id)}
                  className='px-3 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-500 active:bg-gray-700 transition-colors duration-300 rounded'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseCartQuantity(item.id)}
                  className='px-3 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-500 active:bg-gray-700 transition-colors duration-300 rounded'
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='ml-4 text-red-500 text-sm'
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className='mt-8 text-right'>
        <h3 className='text-xl font-semibold'>
          Total: <span className='text-green-600'>${total.toFixed(2)}</span>
        </h3>
        <button
          className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          onClick={handlePagar}
        >
          Pagar ahora
        </button>
      </div>
    </div>
  );
}
