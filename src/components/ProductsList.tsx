import { useState } from "react";
import type { Product } from "../types/Product";
import Pagination from "./Pagination";
import { ThemeToggle } from "./ThemeToggle";
import { useProducts } from "../hooks/useProducts";

interface Props {
	products: Product[];
	onProductSelected: (product: Product) => void;
}

const ProductsList: React.FC<Props> = ({ products, onProductSelected }) => {
	const [filters, setFilters] = useState({
		category: "all",
		minPrice: 0,
	});
	const { loading } = useProducts();

	const [productsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	const totalProducts = products.length;

	const handleBuyClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		alert("Gracias por tu compra");
	};

	const lastIndex = currentPage * productsPerPage;
	const firstIndex = lastIndex - productsPerPage;

	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			filters.category === "all" || product.category === filters.category;
		const matchesPrice = product.price >= filters.minPrice;
		return matchesCategory && matchesPrice;
	});

	return (
		<>
			<div className="mb-20 mt-8 flex flex-col justify-center text-center">
				<h1 className=" text-2xl font-bold">Bienvenido a mi Tienda</h1>
				<p className="font-bold ">aca podras ver cualquier producto ⬇️</p>
			</div>

			<ThemeToggle />
			{loading ? (
				<p>Cargando...</p>
			) : (
				<>
					<div className="flex items-center justify-center gap-4 mb-4">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							value={filters.category}
							onChange={(e) => {
								setFilters((prev) => ({ ...prev, category: e.target.value }));
								setCurrentPage(1);
							}}
						>
							<option value="all">Todas</option>
							<option value="electronics">Electrónica</option>
							<option value="jewelery">Joyería</option>
							<option value="men's clothing">Hombre</option>
							<option value="women's clothing">Mujer</option>
						</select>

						<input
							type="range"
							className="w-auto	 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
							min={0}
							max={999}
							value={filters.minPrice}
							onChange={(e) =>
								setFilters((prev) => ({
									...prev,
									minPrice: Number(e.target.value),
								}))
							}
						/>

						<span className="text-sm text-gray-700 dark:text-gray-300">
							Precio minimo: {filters.minPrice}
						</span>
					</div>
					<div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{filteredProducts
							.slice(firstIndex, lastIndex)
							.map((product: Product) => (
								<div
									onClick={() => onProductSelected(product)}
									className="flex flex-col justify-between h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
								>
									{/* Imagen */}
									<img
										className="rounded-t-lg w-full h-40 object-contain object-center  p-5"
										src={product.image}
										alt={product.title}
									/>

									{/* Contenido */}
									<div className="flex flex-col justify-between flex-1 p-4">
										<div>
											<h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
												{product.title.slice(0, 36)}
											</h5>
											<p className="mb-4 text-sm text-gray-700 dark:text-gray-400 line-clamp-5 ">
												{product.description.slice(0, 48)}
											</p>
										</div>

										{/* Botón */}
										<button
											onClick={handleBuyClick}
											className="mt-auto inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Comprar
											<svg
												className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 14 10"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5h12m0 0L9 1m4 4L9 9"
												/>
											</svg>
										</button>
									</div>
								</div>
							))}
					</div>

					{filters.category === "all" && (
						<Pagination
							productsPerPage={productsPerPage}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalProducts={totalProducts}
						/>
					)}
				</>
			)}
		</>
	);
};

export default ProductsList;
