// import logo from "./logo.svg";
import "./App.css";
// import Signup from "./pages/signup/signup";
// import Login from "./pages/login/login";


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
import ProductsPage from "./pages/Products/ProductsPage";
function AppContent() {
  const location = useLocation();

  // Define the routes where the footer should not appear
  const hideFooterRoutes = ["/login", "/signup", "/dashboard"];

  // Check if the current path matches any of the hideFooterRoutes
  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/products" element={<ProductsPage/>} />

        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="addproduct" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
        </Route>
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
