import api from '../api/products';
export const getProducts = () => {

  return api.get('/products');
};

export const getProductById =async (id) => {
  return fetch(`https://react-e-commerce-json-server-jhau.vercel.app/products/${id}`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching product by ID:', error);
      throw error;
    });
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

export const updateProductQuantity = async (productId, newQuantity) => {
  
  try {

      await fetch(`https://react-e-commerce-json-server-jhau.vercel.app/products/${productId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity }),
      });
      
  } catch (error) {
      console.error('Error updating product quantity:', error);
      throw error;
  }
};
