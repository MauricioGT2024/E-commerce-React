import styles from '../styles/Pagination.module.css';

interface Props {
    productsPerPage: number;
    totalProducts: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination:React.FC<Props> = ({
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


  const handlePageChange = (page:number ) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  const onAnterior = () => {
    setCurrentPage(currentPage -1)
  };

  const onSiguiente = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <nav className={styles.paginationContainer}>
      <button
        className={`${styles.prevButton} ${
          currentPage === 1 ? styles.disabledButton : ''
        }`}
        disabled={currentPage === 1}
        onClick={onAnterior}
      >
        ⬅️ Anterior
      </button>

      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${styles.pageItem} ${
              currentPage === number ? styles.activeItem : ''
            }`}
          >
            <button
              className={`${styles.pageButton} ${
                currentPage === number ? styles.activeButton : ''
              }`}
              onClick={() => handlePageChange(number)}
              disabled={currentPage === number}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button
        disabled={currentPage === TotalPages}
        className={`${styles.nextButton} ${
          currentPage === TotalPages ? styles.disabledButton : ''
        }`}
        onClick={onSiguiente}
      >
        Siguiente ➡️
      </button>
    </nav>
  );
};

export default Pagination;
