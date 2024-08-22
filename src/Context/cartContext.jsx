import React, { createContext, useState, useEffect } from 'react';
import { getCartItemsCount } from '../Utlities/CartServices';
import { getWishlistItemsCount } from '../Utlities/WishlistServices';
import useAuth from '../hooks/useAuth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const [wishlistItemCount, setWishlistItemCount] = useState(0);
    const { auth, logOut } = useAuth();
    const userId = JSON.parse(localStorage.getItem("active-user")).id

    const updateCartCount = async () => {
        const count = await getCartItemsCount(userId);
        setCartItemCount(count);
        
        
    };
    const updateWishlistCount = async () => {
        const count = await getWishlistItemsCount(userId);
        setWishlistItemCount(count);
    };

    useEffect(() => {
        updateCartCount();
        updateWishlistCount();
    }, [userId]);

    return (
        <CartContext.Provider value={{ cartItemCount, wishlistItemCount, updateCartCount, updateWishlistCount }}>
            {children}
        </CartContext.Provider>
    );
};
