import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column p-3 bg-light"
      style={{ width: "100%", height: "100vh" }}
    >
      <h4 className="text-center">Dashboard</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="products" className="nav-link">
            <i className="bi bi-house-door-fill"></i> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="addproduct" className="nav-link">
            <i className="bi bi-bag-fill"></i> add product
          </NavLink>
        </li>
        <li>
          <NavLink to="orders" className="nav-link">
            <i className="bi bi-bag-fill"></i> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="customers" className="nav-link">
            <i className="bi bi-bag-fill"></i> Customers
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;