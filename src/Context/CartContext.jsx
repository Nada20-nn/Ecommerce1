import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

export const CartContext = createContext()

export default function CartContextProvider({ children }) {
    const { token } = useContext(UserContext)
    const [cartItemsNum, setCartItemsNum] = useState('0')
    const headers = {
        token
    }
    useEffect(()=> {
        numItems()
    } , [])


    function getLoggedUserCart() {
        try {
            return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers
            })
        } catch (error) {
            console.log(error);

        }
    }
    function addProductToCart(id) {
        try {
            return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId: id
            }, {
                headers
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    function deleteProduct(id) {
        try {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    function updateItemCounter(id , count) {
        try {
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, {
                headers
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    function deleteUserCart() {
        try {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    function CkeckOutSession(cartId , values) {
        try {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
                shippingAddress : values
            }, {
                headers
            })

        } catch (error) {
            console.log(error);
        }
    }

    async function numItems() {
        const {data} = await getLoggedUserCart()
        if (data.status == 'success') {
            setCartItemsNum(data.numOfCartItems)
        }
    }






    return <CartContext.Provider value={{ CkeckOutSession , getLoggedUserCart, addProductToCart, deleteProduct , updateItemCounter , deleteUserCart , cartItemsNum , setCartItemsNum}}>
        {children}
    </CartContext.Provider>
}
