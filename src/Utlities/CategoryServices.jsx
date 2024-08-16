import api from "../api/products"

export const getCategories = () => {
  return api.get('/categories');
};

export const getCategoryById = (id) => {
  return api.get(`/categories/${id}`);
};

export const addCategory = (category) => {
  return api.post('/categories', category);
};

export const updateCategory = (id, updatedCategory) => {
  return api.put(`/categories/${id}`, updatedCategory);
};

export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};
