import api from '../api/products'; 
import { getProductById, updateProductQuantity } from './ProductServices';



export const getCart =async (userId) => {
  if (!userId) {
    // console.error('User ID is missing');
    return []; 
  }
    return api.get(`/users/${userId}`)
      .then(response => response.data.cart)
      .catch(error => {
        console.error('Error fetching cart:', error);
        throw error;
      });
  };

  export const getCartItemsCount = async (userId) => {
    const cartItems = await getCart(userId);
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    return totalCount;
  };

  export const updateProductQuantityAfterPurchase = async (userId, productId, delta) => {
   

    try {

        const productResponse = await getProductById(productId);
        const productQuantity = productResponse.quantity;

        const newQuantity = productQuantity - delta;

        await updateProductQuantity(productId, newQuantity);

        return { productId, newQuantity };
    } catch (error) {
        console.error('Error updating product quantity after purchase:', error);
        throw error;
    }
};


  export const toggleCartItem =async (userId, product, quantity) => {
    return api.get(`/users/${userId}`)
      .then(response => {
        const user = response.data;
        if (!user) {
          throw new Error('User not found');
        }
        const existingItemIndex = user.cart.findIndex(item => item.id === product.id);
        if (existingItemIndex > -1) {
          user.cart.splice(existingItemIndex, 1);
        } else {
          
          user.cart.push({ ...product, quantity });
        }

        return api.put(`/users/${userId}`, user);
      })
      .then(response => response.data)
      .catch(error => {
        console.error('Error toggling cart item:', error);
        throw error;
      });
};



export const updateCartItem = async(userId, product, quantityChange) => {
  
  return api.get(`/users/${userId}`)
    .then(response => {
      const user = response.data;
      if (!user) {
        throw new Error('User not found');
      }
      
      const existingItemIndex = user.cart.findIndex(item => item.id === product.id);      
      if (existingItemIndex > -1) {  
        
      user.cart[existingItemIndex].quantity=quantityChange;
       
    }
      return api.put(`/users/${userId}`, user);
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating cart item:', error);
      throw error;
    });
};

export const clearCart =async (userId) => {
  return api.get(`/users/${userId}`)
    .then(response => {
      const user = response.data;
      if (!user) {
        throw new Error('User not found');
      }
      user.cart = [];
      return api.put(`/users/${userId}`, user);
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error clearing cart:', error);
      throw error;
    });
};