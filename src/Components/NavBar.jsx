import React from 'react';
import { InputText } from "primereact/inputtext";
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ margin: "0 190px", fontWeight: "600" }}>
          Exclusive
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>
          <form className="d-flex">
            <InputText className="form-control me-2" style={{ background: '#F5F5F5' }} type="search" placeholder="Search" aria-label="Search" />
            {/* <i className="pi pi-search" style={{top:"35%"}}> </i> */}
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
          </form>
          <ul className='navbar-nav me-auto mx-4 mb-2 mb-lg-0 gap-4'>
            <li>
              <Link to="/favorites">
                <i className="pi pi-heart" style={{ color: 'gray', fontSize: "20px" }} aria-label="Favorites"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="pi pi-shopping-cart" style={{ color: 'gray', fontSize: "20px" }} aria-label="Shopping Cart"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
