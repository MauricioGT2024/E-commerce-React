import type { Product } from "../types/Product";
import styles from "../styles/ProductDetail.module.css"
interface Props {
	product: Product;
	onBack: () => void;
}

const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
	return (
		<div className={styles.detailContainer}>
			<div className={styles.imageWrapper}>
				<img src={product.image} alt={product.title} className={styles.image} />
			</div>
			<article className={styles.article}>
				<h1 className={styles.title}>{product.title}</h1>
				<p className={styles.description}>{product.description}</p>
			</article>
			<div className={styles.buttonGroup}>
				<button className={styles.backButton} onClick={onBack}>
					Volver
				</button>
				<button
					className={styles.buyButton}
					onClick={() => alert("Gracias por tu compra")}
				>
					Comprar
				</button>
			</div>
		</div>
	);
};

export default ProductDetail;
