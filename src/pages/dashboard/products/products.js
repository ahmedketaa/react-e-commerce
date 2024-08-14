import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../api/products";
import ConfirmDelete from "./comfirmDelete/comfirmDelete";

function Products() {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch products. Please try again later.");
    }
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${productToDelete}`);
      setProducts(products.filter((product) => product.id !== productToDelete));
      setAlertMessage("Product deleted successfully!");

      // Hide alert message after 2 seconds
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to delete product. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  const handleEdit = (productId) => {
    console.log(productId);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      {alertMessage && (
        <div className="alert alert-success">{alertMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this product?"
      />
    </div>
  );
}

export default Products;
