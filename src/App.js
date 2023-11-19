import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/pages/homepage/HomePage";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/pages/adminpages/Admin";
import AdminLogin from "./components/pages/adminpages/AdminLogin";
import AdminProducts from "./components/pages/adminpages/AdminProducts";
import Orders from "./components/pages/adminpages/Orders";
import AddProduct from "./components/pages/CRUD/AddProduct";
import EditProduct from "./components/pages/CRUD/EditProduct";
import axios from "axios";
import { setProduct } from "./helpers/Redux/Reducer/products.reducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import HomeProductsPage from "./components/pages/homepage/HomeProductsPage";
import UserLogin from "./components/pages/userspages/UserLogin";
import UserSignup from "./components/pages/userspages/UserSignup";
import CartPage from "./components/pages/userspages/CartPage";
import BuyProductPage from "./components/pages/userspages/BuyProductPage";

function App() {
  const dispatch = useDispatch();
  const getProducts = async () => {
    await axios
      .get("https://shopzone-backend.vercel.app/products")
      .then((res) => {
        dispatch(setProduct(res.data.products));
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProducts();
  });
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />}>
        <Route path="" element={<HomeProductsPage />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="buyproduct" element={<BuyProductPage />} />
      </Route>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<AdminProducts />} />
        <Route path="order-status" element={<Orders />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path=":id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
