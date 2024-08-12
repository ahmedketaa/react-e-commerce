import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home/Home";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addproduct" element={<AddProuduct />} />
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
