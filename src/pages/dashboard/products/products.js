import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../api/products";
import ConfirmDelete from "./comfirmDelete/comfirmDelete";
import EditProduct from "./editProduct/editProduct";

function Products() {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

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

      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed to delete product. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product); // Set the product to be edited
  };

  const handleCancelEdit = () => {
    setProductToEdit(null); // Reset the editing state
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setProductToEdit(null);
    setAlertMessage("Product updated successfully!");

    setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      {alertMessage && (
        <div className="alert alert-success">{alertMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {!productToEdit ? (
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
                      onClick={() => handleEdit(product)}
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
      ) : (
        <EditProduct
          productId={productToEdit.id}
          onSave={handleSaveEdit} // Handle the saving of the edited product
          onCancel={handleCancelEdit} // Handle the canceling of the edit
        />
      )}

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
