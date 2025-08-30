import { useState } from "react";
import styles from "../styles/ProductList.module.css";
import type { Product } from "../types/Product";

interface Props {
	products: Product[];
	onProductSelected: (product: Product) => void;
}

const ProductsList: React.FC<Props> = ({ products, onProductSelected }) => {
	const [filters, setFilters] = useState({
		category: "all",
		minPrice: 0,
	});

	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			filters.category === "all" || product.category === filters.category;
		const matchesPrice = product.price >= filters.minPrice;
		return matchesCategory && matchesPrice;
	});
	return (
		<>
			<h1>Bienvenido a mi Tienda Falsa</h1>
			<p>aca podras ver cualquier producto ⬇️</p>
			<div className={styles.filters}>
				<select
					value={filters.category}
					onChange={(e) =>
						setFilters((prev) => ({ ...prev, category: e.target.value }))
					}
				>
					<option value="all">Todas</option>
					<option value="electronics">Electrónica</option>
					<option value="jewelery">Joyería</option>
					<option value="men's clothing">Hombre</option>
					<option value="women's clothing">Mujer</option>
				</select>
				<input
					type="range"
					min={0}
					max={500}
					value={filters.minPrice}
					onChange={(e) =>
						setFilters((prev) => ({
							...prev,
							minPrice: Number(e.target.value),
						}))
					}
				/>
				<span>Precio minimo: {filters.minPrice}</span>
			</div>
			<div className={styles.productList}>
				{filteredProducts.map((product: Product) => (
					<article
						key={product.id}
						className={styles.productCard}
						onClick={() => onProductSelected(product)}
					>
						<img
							src={product.image}
							alt={product.title}
							className={styles.productImage}
						/>
						<h3 className={styles.productTitle}>{product.title}</h3>
						<p className={styles.productPrice}>${product.price.toFixed(2)}</p>
						<button
							className={styles.buyButton}
							onClick={(e) => (
								e.stopPropagation(), alert("Gracias por tu compra")
							)}
						>
							Comprar
						</button>
					</article>
				))}
			</div>
		</>
	);
};

export default ProductsList;
