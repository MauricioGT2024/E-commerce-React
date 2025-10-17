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
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return (
    <nav>
      <ul className="flex items-center justify-center mt-8 mb-4 -space-x-px h-8 text-sm ">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:hover:bg-white
						disabled:hover:text-gray-500
						disabled:dark:hover:bg-gray-800
							disabled:opacity-50
						disabled:dark:hover:text-gray-400 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-300"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        <ul className="flex items-center -space-x-px h-8 text-sm">
          {pageNumbers.map((num) => (
            <li key={num}>
              <button
                onClick={() => handlePageChange(num)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  num === currentPage
                    ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
                    : ""
                }`}
              >
                {num}
              </button>
            </li>
          ))}
        </ul>
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:hover:bg-white
						disabled:hover:text-gray-500
						disabled:dark:hover:bg-gray-800
							disabled:opacity-50
						disabled:dark:hover:text-gray-400 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-300"
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
