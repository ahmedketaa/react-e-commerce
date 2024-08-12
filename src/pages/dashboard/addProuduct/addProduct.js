import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../api/products"; // Adjust the import based on your API setup

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    // Validate the specific field on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "title" && !value.trim()) {
      errorMessage = "Product title is required.";
    } else if (name === "category" && !value) {
      errorMessage = "Category is required.";
    } else if (name === "image" && !value.trim()) {
      errorMessage = "Image URL is required.";
    } else if (name === "price" && (!value || value <= 0)) {
      errorMessage = "Price must be greater than 0.";
    } else if (name === "quantity" && (!value || value <= 0)) {
      errorMessage = "Quantity must be greater than 0.";
    } else if (name === "description" && !value.trim()) {
      errorMessage = "Product description is required.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    let isValid = true;

    // Validate all fields at once
    Object.keys(product).forEach((key) => {
      const value = product[key];
      if (!value.trim()) {
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
        isValid = false;
      }
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const sendingProduct = {
        ...product,
        rating: {
          rate: 0,
          count: 0,
        },
      };

      try {
        const response = await api.post("/products", sendingProduct);
        setSuccessMessage("Product added successfully!");
        setErrorMessage("");

        // Hide success message after 1 second
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);

        // Reset form after successful submission
        setProduct({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          quantity: "",
        });
        setErrors({});
      } catch (error) {
        setErrorMessage("Failed to add product. Please try again.");
      }
    } else {
      setSuccessMessage(""); // Clear success message if there are errors
    }
  };

  return (
    <div className="container d-flex">
      <div className="card p-4 mb-4 w-100 position-relative">
        <h4 className="mb-3">New Product</h4>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4 position-relative">
            <label className="form-label">Product Title</label>
            <input
              type="text"
              name="title"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              value={product.title}
              onChange={handleChange}
              required
            />
            {errors.title && (
              <div className="invalid-feedback position-absolute">
                {errors.title}
              </div>
            )}
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label">Category</label>
            <select
              name="category"
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
            {errors.category && (
              <div className="invalid-feedback position-absolute">
                {errors.category}
              </div>
            )}
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              value={product.image}
              onChange={handleChange}
              required
            />
            {errors.image && (
              <div className="invalid-feedback position-absolute">
                {errors.image}
              </div>
            )}
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label">Price</label>
            <input
              type="number"
              min="0"
              name="price"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              value={product.price}
              onChange={handleChange}
              required
            />
            {errors.price && (
              <div className="invalid-feedback position-absolute">
                {errors.price}
              </div>
            )}
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              min="0"
              name="quantity"
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
              value={product.quantity}
              onChange={handleChange}
              required
            />
            {errors.quantity && (
              <div className="invalid-feedback position-absolute">
                {errors.quantity}
              </div>
            )}
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              value={product.description}
              onChange={handleChange}
              required
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback position-absolute">
                {errors.description}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary me-2">
              Add Product
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="alert alert-success mt-3 position-absolute w-100 top-0 end-0">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-3 position-absolute w-100 top-0 end-0">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
