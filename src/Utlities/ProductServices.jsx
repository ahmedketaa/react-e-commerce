import api from '../api/products';
export const getProducts = () => {

  return api.get('/products');
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const addProduct = (product) => {
  return api.post('/products', product);
};

export const updateProduct = (id, updatedProduct) => {
  return api.put(`/products/${id}`, updatedProduct);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};
