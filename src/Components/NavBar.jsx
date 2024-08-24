import React, { useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { CartContext } from '../Context/cartContext';
import useAuth from '../hooks/useAuth';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dropdown } from 'react-bootstrap';

function NavBar({ setLocale }) {
  const { auth, logOut } = useAuth();
  

  const { cartItemCount, wishlistItemCount } = useContext(CartContext);  
  const intl = useIntl();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-danger" to="/" style={{ margin: '0 112px', fontWeight: '700' }}>
          Gaza Store
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <FormattedMessage id="home" defaultMessage="Home" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <FormattedMessage id="products" defaultMessage="Products" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <FormattedMessage id="contact" defaultMessage="Contact" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FormattedMessage id="about" defaultMessage="About" />
              </Link>
            </li>
            {!auth?.user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <FormattedMessage id="signup" defaultMessage="Sign Up" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FormattedMessage id="login" defaultMessage="Login" />
                  </Link>
                </li>
              </>
            )}
            {auth?.user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/dashboard">
                  <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
                </Link>
              </li>
            )}
            {auth?.user && (
              <li className="nav-item">
                <p style={{color:"#DB4444"}} className='mt-2 ms-5 fw-bold'>
                  <FormattedMessage  id="hello" values={{ username: auth.user.username.toUpperCase() }} />
                </p>
              </li>
            )}
          </ul>
          <form className="d-flex">
            <InputText className="form-control me-2" style={{ background: '#F5F5F5' }} type="search" placeholder={intl.formatMessage({ id: 'searchPlaceholder', defaultMessage: 'Search' })} aria-label="Search" />
          </form>
          <ul className='navbar-nav me-auto mx-4 mb-2 mb-lg-0 gap-4'>
            <li>
              <Link to="/wishlist">
                <i className="pi pi-heart p-overlay-badge" style={{ color: 'gray', fontSize: '20px' }} aria-label="Favorites">
                  <Badge value={auth?.user ? wishlistItemCount : '0'} severity="danger" style={{ fontSize: '10px' }}></Badge>
                </i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="pi pi-shopping-cart p-overlay-badge" style={{ color: 'gray', fontSize: '20px' }} aria-label="Shopping Cart">
                  <Badge value={auth?.user ? cartItemCount : '0'} severity="danger" style={{ fontSize: '10px' }}></Badge>
                </i>
              </Link>
            </li>
          </ul>
          {auth?.user && (
            <div className='nav-item btn me-5 btn-danger'>
              <div role='button' className="" onClick={logOut}>Logout</div>
            </div>
          )}
          {/* Language Dropdown */}
          <Dropdown className="mx-4">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <FormattedMessage id="language" defaultMessage="Language" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLocale('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocale('ar')}>عربي</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
