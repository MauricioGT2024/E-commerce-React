import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";

function Navbar() {
  const { cartItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Limpia el listener al desmontar
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login")
  };

  return (
    <nav className="dark:bg-gray-800  p-4 dark:text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Mi Tienda</div>
        <div>
          <Link to="/" className="px-4">
            Productos
          </Link>
          <Link to="/cart" className="px-4">
            Carrito
          </Link>
          {cartItems.length > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
              {cartItems.length}
            </span>
          )}
          {user ? (
            <>
              <Link to="/panel" className="px-4">
                Panel
              </Link>
              <button onClick={handleLogout} className="px-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="px-4">
                Login
              </Link>
              <Link to="/auth/register" className="px-4">
                Register
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
