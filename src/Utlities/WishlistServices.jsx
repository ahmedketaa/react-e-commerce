import api from '../api/products'; 

export const getWishlist = async(userId) => {
  if (!userId) {
    // console.error('User ID is missing');
    return []; 
  }
    return api.get(`/users/${userId}`)
      .then(response => response.data.wishlist)
      .catch(error => {
        console.error('Error fetching wishlist:', error);
        throw error;
      });
  };
  export const getWishlistItemsCount = async (userId) => {
    const wishlistItems = await getWishlist(userId);
    const totalCount = wishlistItems.length;
    return totalCount;
  };
  export const toggleWishlistItem = (userId, product) => {
    return api.get(`/users/${userId}`)
      .then(response => {
        const user = response.data;
        if (!user) {
          throw new Error('User not found');
        }

        const existingItemIndex = user.wishlist?.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
          user.wishlist.splice(existingItemIndex, 1);
        } else {
          user.wishlist?.push(product);
        }

        return api.put(`/users/${userId}`, user);
      })
      .then(response => response.data)
      .catch(error => {
        console.error('Error toggling wishlist item:', error);
        throw error;
      });
};

