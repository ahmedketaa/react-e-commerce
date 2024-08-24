import React, { useState, useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";
import { getWishlist, toggleWishlistItem } from "../Utlities/WishlistServices";
import { CartContext } from "../Context/cartContext";
import { toggleCartItem } from "../Utlities/CartServices";
import useAuth from "../hooks/useAuth";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { updateCartCount } = useContext(CartContext);
  const { auth } = useAuth();
  const userId = JSON.parse(localStorage.getItem("active-user"))&& JSON.parse(localStorage.getItem("active-user")).id;

  useEffect(() => {
    getWishlist(userId)
      .then((data) => {
        setWishlist(data);
      })
      .catch((err) => console.error(err));
  }, [updateCartCount]);

  const handleAddToCart = (product) => {
    toggleCartItem(userId, product, 1)
      .then(() => getWishlist(userId))
      .then((data) => {
        setWishlist(data);
        updateCartCount();
      })
      .catch((error) => console.error("Error adding item to cart:", error));
  };

  const handleRemoveFromWishlist = (product) => {
    toggleWishlistItem(userId, product)
      .then(() => getWishlist(userId))
      .then((data) => {
        setWishlist(data);
      })
      .catch((error) =>
        console.error("Error removing item from wishlist:", error)
      );
  };

  return (
    <Container>
      <h1 className="my-4">
        My Wishlist
        <FontAwesomeIcon
          className="heart text-danger ms-2"
          style={{ fontSize: "30px" }}
          icon={faHeart}
        />
      </h1>
      <Row>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Delete</th>
              <th colSpan={2} scope="col" className="ps-5">
                Product Name
              </th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((product, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn xxbtn"
                    onClick={() => handleRemoveFromWishlist(product)}
                  >
                    <FontAwesomeIcon className="xx text-danger" icon={faX} />
                  </button>
                </td>
                <td>
                  <img
                    className="rounded mx-auto d-block pt-2"
                    style={{ width: "100px", height: "100px" }}
                    src={product.image}
                    alt="..."
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Container>
  );
}

export default Wishlist;
