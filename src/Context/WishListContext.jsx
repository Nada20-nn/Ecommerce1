import React from 'react';
import {  useState, useEffect, createContext } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';


export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    // const [wishlist, setWishlist] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
        token
    }

    const addToWishlist = (productId) => {
        try {
            return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers });

        } catch (error) {
            console.error('Error adding to wishlist:', error);
            toast.error('Failed to add item to wishlist');
        }
    };

    const removeFromWishlist = (productId) => {
        try {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });

        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Failed to remove item from wishlist');
        }
    };

    const getLoggedUserWishlist = () => {
        try {
            return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    headers
                }
            );

        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    return <WishlistContext.Provider value={{  addToWishlist, removeFromWishlist, getLoggedUserWishlist }}>
        {children}
    </WishlistContext.Provider>

}