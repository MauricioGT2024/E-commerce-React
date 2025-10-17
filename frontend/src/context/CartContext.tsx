import {
  createContext,
  useContext,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  price: number; // Optional, can be used for total price calculation
};

type CartContextType = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getCartQuantity: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "INITIALIZE_CART"; payload: CartItem[] }
  | { type: "INCREASE_QUANTITY"; payload: { id: number; price?: number } }
  | { type: "DECREASE_QUANTITY"; payload: { id: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INITIALIZE_CART":
      return { items: action.payload };
    case "INCREASE_QUANTITY": {
      const { id, price } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          items: [...state.items, { id, quantity: 1, price: price ?? 0 }],
        };
      }
    }
    case "DECREASE_QUANTITY": {
      const { id } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return state;
      if (existing.quantity === 1) {
        return { items: state.items.filter((i) => i.id === id) };
      } else {
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
    }
    case "REMOVE_ITEM": {
      const { id } = action.payload;
      return { items: state.items.filter((i) => i.id !== id) };
    }
    case "CLEAR_CART": {
      return { items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed: CartItem[] = JSON.parse(storedCart);
        dispatch({ type: "INITIALIZE_CART", payload: parsed });
      } catch (error) {
        console.error("Error al parsear carrito desde localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    } else {
      localStorage.removeItem("cart");
    }
  }, [state.items]);

  function getItemQuantity(id: number) {
    return state.items.find((i) => i.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number, price?: number) {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id, price } });
  }

  function decreaseCartQuantity(id: number) {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  }

  function removeFromCart(id: number) {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }

  function getCartQuantity() {
    return state.items.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
