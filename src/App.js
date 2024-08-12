import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./pages/Home/Home";
import "primereact/resources/themes/lara-light-cyan/theme.css";

        
function App() {
  return (
    <>
    
    <BrowserRouter>
      <NavBar/>
      <Home/>
      {/* <Signup />
      <Login /> */}
      </BrowserRouter>

    </>
  );
}

export default App;
