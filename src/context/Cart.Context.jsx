import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.Context";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {

    const {token} = useContext(userContext);
    const [cartInfo, setCartInfo] = useState(null)

    async function getCart(){
        try {
            const options = {
                method: 'GET',
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                headers : {
                    token
                }
            }
            const {data} = await axios.request(options)
            setCartInfo(data)
        } catch (error) { 
            if(error.response.data.message.includes('No cart')){
                setCartInfo([])
            }else{
                console.log(error)
            }
        }
    }

    async function addToCart(prdId) {
        try {
            const options ={
                method: 'POST',
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                headers : {
                    token
                },
                data:{
                    productId : prdId
                }
            }
            const {data} = await axios.request(options);
            if(data.status == 'success'){
                setCartInfo(data)
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    async function removeCartItem(prdId) {
        try {
            const options ={
                method: 'DELETE',
                url: `https://ecommerce.routemisr.com/api/v1/cart/${prdId}`,
                headers : {
                    token
                }
            }
            const {data} = await axios.request(options);
            if(data.status == 'success'){
                setCartInfo(data)
                toast.success('Cart Item Removed Successfully')
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    async function clearCart(){
        try {
            const options = {
                method: 'DELETE',
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                headers : {
                    token
                }
            }
            const {data} = await axios.request(options)
            setCartInfo([])
            toast.success('Cart Cleared Successfully')
        } catch (error) { 
            console.log(error)
        }
    }

    async function updateCartItemCount(prdId, count) {
        try {
            const options ={
                method: 'PUT',
                url: `https://ecommerce.routemisr.com/api/v1/cart/${prdId}`,
                headers : {
                    token
                },
                data:{
                    count 
                }
            }
            const {data} = await axios.request(options);
            if(data.status == 'success'){
                toast.success('update Cart Item Count successfully')
                setCartInfo(data)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return <cartContext.Provider value={{ addToCart, getCart, cartInfo, removeCartItem, clearCart, updateCartItemCount}}>
        {children}
    </cartContext.Provider>
}