import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/dashboard/dashboard";
import Orders from "./pages/dashboard/orders/orders";
import AddProduct from "./pages/dashboard/addProuduct/addProduct";
import Customers from "./pages/dashboard/customers/customers";
import Products from "./pages/dashboard/products/products";
import NavBar from './Components/NavBar';
import PrivateRoute from "./protectedRoutes"; 
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Footer from "./Components/Footer";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Cart from "./pages/cart/Cart";
import ProductsPage from "./pages/Products/ProductsPage";
import Wishlist from "./Wishlist/Wishlist";

import AllCategories from "./pages/dashboard/Categories/AllCategories";
import CategoryForm from "./pages/dashboard/dashComponents/categoryForm";
import CategoryList from "./pages/dashboard/dashComponents/categoryList";
import { CartProvider } from "./Context/cartContext";

function AppContent() {
  const location = useLocation();

  const hideFooterRoutes = ["/login", "/signup", "/dashboard"];

  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
    
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/products" element={<ProductsPage/>} />

        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="addproduct" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          {/* nested route 34an el category ya */}
          <Route path="categories" element={<PrivateRoute><AllCategories /></PrivateRoute>}>
            <Route index element={<CategoryList />} />
            <Route path="add-category" element={<CategoryForm />} />
            <Route path="update-category/:categoryId" element={<CategoryForm/>} />
          </Route>
        </Route>
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
    <AppContent />
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
