import {
	createContext,
	useContext,
	useState,
	type ReactNode,
	useEffect,
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
  CartQuantity: () => number;
  clearCart: () => void;
};

const CartContext = createContext({} as CartContextType);

export function useCart() {
	return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) {
			setCartItems(JSON.parse(storedCart));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	function getItemQuantity(id: number) {
		return cartItems.find((i) => i.id === id)?.quantity || 0;
	}

	function increaseCartQuantity(id: number) {
		setCartItems((currItems) => {
			const product = currItems.find((i) => i.id === id);
			if (product == null) {
				return [...currItems, { id, quantity: 1, price: 0 }];
			} else {
				return currItems.map((i) => {
					if (i.id === id) {
						return { ...i, quantity: i.quantity + 1 };
					} else {
						return i;
					}
				});
			}
		});
	}

	function decreaseCartQuantity(id: number) {
		setCartItems((currItems) => {
			if (currItems.find((i) => i.id === id)?.quantity === 1) {
				return currItems.filter((i) => i.id !== id);
			} else {
				return currItems.map((i) => {
					if (i.id === id) {
						return { ...i, quantity: i.quantity - 1 };
					} else {
						return i;
					}
				});
			}
		});
	}

	function removeFromCart(id: number) {
		setCartItems((currItems) => currItems.filter((i) => i.id !== id));
	}

	function CartQuantity() {
		return cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
	}

	function clearCart() {
		setCartItems([]);
	}

	return (
    <CartContext.Provider
      value={{
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        CartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
