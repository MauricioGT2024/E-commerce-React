import { useState } from "react";
import ProductsList from "./components/ProductsList";
import { ThemeToggle } from "./components/ThemeToggle";
import type { Product } from "./types/Product";
import ProductDetail from "./components/ProductDetail";
import { useProducts } from "./hooks/useProducts";

function App() {
	const [productSelected, setProductSelected] = useState<Product | null>(null);
	const { products } = useProducts();
	const handleProductSelected = (products: Product) => {
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				setProductSelected(products);
			});
		} else {
			setProductSelected(products);
		}
	};

	const handleBack = () => {
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				setProductSelected(null);
			});
		} else {
			setProductSelected(null);
		}
	};

	return (
		<div>
			<ThemeToggle />
			{productSelected ? (
				<ProductDetail product={productSelected} onBack={handleBack} />
			) : (
				<ProductsList
					products={products}
					onProductSelected={handleProductSelected}
				/>
			)}
		</div>
	);
}

export default App;
