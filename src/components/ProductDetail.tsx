import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { products, loading } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { increaseCartQuantity } = useCart();

  if (loading) {
    return (
      <div className='text-center mt-10 text-gray-500'>
        <p>Cargando producto...</p>
      </div>
    );
  }
  // Buscar el producto por ID
  const product = products.find((p: Product) => p.id.toString() === id);

  if (!product) {
    return (
      <div className='text-center mt-10 text-red-500'>
        <p>Producto no encontrado</p>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded'
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mt-8 mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col md:flex-row gap-6 transition-colors duration-300'>
      {/* Imagen */}
      <div className='md:w-1/2 flex justify-center items-center'>
       
      </div>

      {/* Detalles */}
      <article className='md:w-1/2 flex flex-col justify-between'>
        <div className='p-6 rounded shadow max-w-max'>
          <h1 className='text-2xl font-bold  '>{product.nombre}</h1>
          <p
            className='
    mt-4 text-gray-700 dark:text-gray-300 leading-relaxed 
    whitespace-pre-line overflow-x-auto
  '
          >
            {product.descripcion}
          </p>
        </div>

        {/* Botones */}
        <div className='mt-6 flex space-x-4'>
          <button
            onClick={() => navigate('/', { viewTransition: true })}
            className='px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition'
          >
            Volver
          </button>

          <button
            onClick={() => {
              increaseCartQuantity(product.id);
              alert('Producto añadido al carrito');
            }}
            className='px-4 py-2 rounded-md bg-yellow-400 text-white hover:bg-yellow-500 transition'
          >
            Comprar
          </button>
        </div>
      </article>
    </div>
  );
};

export default ProductDetail;
