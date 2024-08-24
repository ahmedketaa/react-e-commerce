import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import "./products.css";
import CategoryFilter from "./CategoryFilter";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../ReduxToolkit/categorySlice";
import {
  getWishlist,
  toggleWishlistItem,
} from "../../Utlities/WishlistServices";
import { toggleCartItem, getCart } from "../../Utlities/CartServices";
import { CartContext } from "../../Context/cartContext";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.prods);

  const selectCategory = useSelector((state) => state.products.selectCategory);
  const productselected = selectCategory
    ? products.filter((product) => product.category === selectCategory)
    : products;

  const [priceOrder, setPriceOrder] = useState("");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const { updateWishlistCount, updateCartCount } = useContext(CartContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("active-user"))&& JSON.parse(localStorage.getItem("active-user")).id;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    getWishlist(userId).then(setWishlist);
    getCart(userId).then(setCart);
  }, [userId]);

  const handlePrice = (e) => {
    setPriceOrder(e.target.value);
  };

  const sortedProducts = [...productselected].sort((a, b) => {
    if (priceOrder === "ascending") {
      return a.price - b.price;
    } else if (priceOrder === "descending") {
      return b.price - a.price;
    }
    return 0;
  });

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const handleToggleWishlist = (product) => {
    if (auth.user) {
      toggleWishlistItem(userId, product)
        .then(() => getWishlist(userId))
        .then(setWishlist)
        .then(updateWishlistCount)
        .catch((error) =>
          console.error("Error toggling wishlist item:", error)
        );
    } else {
      navigate("/login");
    }
  };

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleToggleCart = (product, quantity) => {
    if (auth.user) {
      toggleCartItem(userId, product, quantity)
        .then(() => getCart(userId))
        .then(setCart)
        .then(updateCartCount)
        .catch((error) => console.error("Error toggling cart item:", error));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-light w-50 mt-5 mx-auto">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mr-sm-2 bg-light"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <div className="">
        <span style={{ fontWeight: "500" }}>Price Order:</span>
        <select
          onChange={(e) => handlePrice(e)}
          className="custom-select selectPrice"
        >
          <option selected>Price</option>
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </select>
      </div>

      <CategoryFilter />

      <div className="row mt-5 row-cols-1 row-cols-md-4 g-4 d-flex justify-content-evenly ms-5 mx-5">
        {sortedProducts
          .filter((product) =>
            search.toLowerCase() === ""
              ? product
              : product.title.toLowerCase().includes(search)
          )
          .map((product, index) => (
            <div key={index}>
              <Card
                category={product.category}
                img={product.image}
                title={product.title}
                rating={product.rating.rate}
                price={product.price}
                onWishlistToggle={() => handleToggleWishlist(product)}
                onCartToggle={() => handleToggleCart(product, 1)}
                isInWishlist={isProductInWishlist(product.id)}
                isInCart={isProductInCart(product.id)}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default ProductsPage;
