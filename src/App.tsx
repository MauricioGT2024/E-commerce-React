import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
