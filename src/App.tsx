import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import { Route, Routes, } from "react-router-dom";


function App() {
	return (
		<div>
				<Routes>
					<Route path="/" element={<ProductsList /> } />
					<Route path="/product/:id" element={<ProductDetail />} />
				</Routes>
		</div>
	);
}

export default App;
