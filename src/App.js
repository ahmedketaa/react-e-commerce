import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home/Home";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Dashboard from "./pages/dashboard/dashboard";
import Orders from "./pages/dashboard/orders/orders";
import AddProduct from "./pages/dashboard/addProuduct/addProduct";
import Customers from "./pages/dashboard/customers/customers";
import Products from "./pages/dashboard/products/products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Routes>
        {/* <NavBar/>
      <Home/> */}
        {/* <Signup />
      <Login /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
