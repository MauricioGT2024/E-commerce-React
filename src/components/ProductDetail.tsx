import type { Product } from "../types/Product";
interface Props {
	product: Product;
	onBack: () => void;
}

const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
	return (
		<div className="max-w-xl mt-8 mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col md:flex-row gap-6 transition-colors duration-300">
			{/* Imagen */}
			<div className="md:w-1/2 flex justify-center items-center">
				<img
					src={product.image}
					alt={product.title}
					className="rounded-md object-contain max-h-auto w-full"
				/>
			</div>

			{/* Detalles */}
			<article className="md:w-1/2 flex flex-col justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
						{product.title}
					</h1>
					<p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
						{product.description}
					</p>
				</div>

				{/* Botones */}
				<div className="mt-6 flex space-x-4">
					<button
						onClick={onBack}
						className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
					>
						Volver
					</button>

					<button
						onClick={() => alert("Gracias por tu compra")}
						className="px-4 py-2 rounded-md bg-yellow-400 text-white hover:bg-yellow-500 transition"
					>
						Comprar
					</button>
				</div>
			</article>
		</div>
	);
};

export default ProductDetail;
