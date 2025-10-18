import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import Panel from "./components/Panel";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./routes/PrivatedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/panel"
            element={
              <PrivateRoute>
                <Panel />
              </PrivateRoute>
            }
          />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
