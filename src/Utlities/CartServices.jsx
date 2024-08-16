import api from '../api/products'; 

export const getCart = (userId) => {
    return api.get(`/users/${userId}`)
      .then(response => response.data.cart)
      .catch(error => {
        console.error('Error fetching cart:', error);
        throw error;
      });
  };
  export const toggleCartItem = (userId, product, quantity) => {
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
          // Add the complete product with quantity
          user.cart.push({ ...product, quantity });
        }

        // Update the user with the new cart
        return api.put(`/users/${userId}`, user);
      })
      .then(response => response.data)
      .catch(error => {
        console.error('Error toggling cart item:', error);
        throw error;
      });
};



export const updateCartItem = (userId, product, quantityChange) => {
  
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
      // Update the user with the new cart
      return api.put(`/users/${userId}`, user);
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating cart item:', error);
      throw error;
    });
};