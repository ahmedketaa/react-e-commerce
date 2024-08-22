import React, { useState ,useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/dashboard/dashboard";
import Orders from "./pages/dashboard/orders/orders";
import AddProduct from "./pages/dashboard/addProuduct/addProduct";
import Customers from "./pages/dashboard/customers/customers";
import Products from "./pages/dashboard/products/products";
import NavBar from "./Components/NavBar";
import PrivateRoute from "./protectedRoutes";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Footer from "./Components/Footer";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Cart from "./pages/cart/Cart";
import ProductsPage from "./pages/Products/ProductsPage";

import AllCategories from "./pages/dashboard/Categories/AllCategories";
import CategoryForm from "./pages/dashboard/dashComponents/categoryForm";
import CategoryList from "./pages/dashboard/dashComponents/categoryList";
import { CartProvider } from "./Context/cartContext";
import Checkout from "./pages/checkout/Checkout";
import Success from "./pages/checkout/successPage/SuccessPage";
import Cancel from "./pages/checkout/cancelPage/CancelPage";
import ContactUs from "./pages/contactUs/contactUs";
import AboutUs from "./pages/aboutUs/aboutUs";
import NotFoundPage from "./pages/404Page/notFound";
import { ContextProvider } from "./Context/authContext";
import UserList from "./pages/dashboard/users/usersList";
import UserForm from "./pages/dashboard/users/usersForm";
import AllUsers from "./pages/dashboard/users/allUsers";
import Wishlist from "./pages/Wishlist/Wishlist";
import LocalizationProvider from "./localization/langlocalization";
import useAuth from "./hooks/useAuth";




function AppContent() {
  const location = useLocation();
  const [locale, setLocale] = useState('en');

  const hideFooterRoutes = ["/login", "/signup", "/dashboard"];

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const { checkLocalAuth } = useAuth();
  useEffect(() => {
    checkLocalAuth();
  }, []);
  return (
    <>
        <LocalizationProvider locale={locale}>
        
      {!shouldHideFooter && <NavBar  setLocale={setLocale} />}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="addproduct"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="customers"
            element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            }
          />
          {/* nested route 34an el category ya :: :')*/}
          <Route
            path="categories"
            element={
              <PrivateRoute>
                <AllCategories />
              </PrivateRoute>
            }
          >
            <Route index element={<CategoryList />} />
            <Route path="add-category" element={<CategoryForm />} />
            <Route
              path="update-category/:categoryId"
              element={<CategoryForm />}
            />
          </Route>
          {/* nested tany  */}
          <Route
                path="users"
                element={
                    <PrivateRoute>
                        <AllUsers />
                    </PrivateRoute>
                }
            >
                <Route index element={<UserList />} />
                <Route path="add-user" element={<UserForm />} />
                <Route path="update-user/:userId" element={<UserForm />} />
            </Route>
        </Route>
      </Routes>
      {!shouldHideFooter && <Footer />}
      </LocalizationProvider>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
