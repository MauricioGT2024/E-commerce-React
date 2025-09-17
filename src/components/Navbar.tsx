import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useCart();
  return (
    <nav className='dark:bg-gray-800  p-4 dark:text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-lg font-bold'>Mi Tienda</div>
        <div>
          <Link to='/' className='px-4'>
            Productos
          </Link>
          <Link to='/cart' className='px-4'>
            Carrito
          </Link>
          {cartItems.length > 0 && (
            <span className='bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold'>
              {cartItems.length}
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
