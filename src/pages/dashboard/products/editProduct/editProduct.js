import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../../api/products";

function EditProduct({ productId, onSave, onCancel }) {
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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProductDetails(productId);
    fetchCategories();
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch product details.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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

    Object.keys(product).forEach((key) => {
      const value = product[key];
      if (!value) {
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
      try {
        const response = await api.put(`/products/${productId}`, product);
        setSuccessMessage("Product updated successfully!");
        setErrorMessage("");

        setTimeout(() => {
          setSuccessMessage("");
          onSave(response.data); // Notify parent component of the successful save
        }, 1000);
      } catch (error) {
        setErrorMessage("Failed to update product. Please try again.");
      }
    } else {
      setSuccessMessage(""); // Clear success message if there are errors
    }
  };

  return (
    <div className="container">
      <div className="card p-4 mb-4 w-100 position-relative">
        <h4 className="mb-3">Edit Product</h4>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary me-2">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>

        {/* Success and Error Messages */}
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

export default EditProduct;
