import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import ProfilePage from './pages/ProfilePage';
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/MenuPage" element={<MenuPage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/OrdersPage" element={<OrdersPage />} />
        <Route path="/" element={<HomePage/>}/>
        <Route path="/ProfilePage" element={<ProfilePage/>}/>
        <Route path="/SignupPage" element={<SignupPage/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer/>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  )
}

export default App