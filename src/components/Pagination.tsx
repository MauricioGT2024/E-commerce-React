interface Props {
	productsPerPage: number;
	totalProducts: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
	productsPerPage,
	totalProducts,
	currentPage,
	setCurrentPage,
}) => {
	const pageNumbers = [];
	const TotalPages = Math.ceil(totalProducts / productsPerPage);
	for (let i = 1; i <= TotalPages; i++) {
		pageNumbers.push(i);
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const onAnterior = () => {
		setCurrentPage(currentPage - 1);
	};

	const onSiguiente = () => {
		setCurrentPage(currentPage + 1);
	};
	return (
		<nav>
			<ul className="flex items-center justify-center mt-8 -space-x-px h-8 text-sm">
				<li>
					<button
						onClick={onAnterior}
						disabled={currentPage === 1}
						className="disabled:bg-slate-900 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						<span className="sr-only">Anterior</span>
						<svg
							className="w-2.5 h-2.5 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
					</button>
				</li>
				<ul className="flex items-center -space-x-px h-8 text-sm">
					{pageNumbers.map((num) => (
						<li
							key={num}
							onClick={() => handlePageChange(num)}
							className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							{num}
						</li>
					))}
				</ul>
				<li>
					<button
						onClick={onSiguiente}
						disabled={currentPage === TotalPages}
						className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						<span className="sr-only">Siguiente</span>
						<svg
							className="w-2.5 h-2.5 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
