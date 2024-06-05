import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { cartContext } from '../../context/Cart.Context'

export default function ProductCard({product}) {
    const {addToCart} = useContext(cartContext);
    return (
        <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-md shadow-md '>
            <div className='relative overflow-hidden'>
                <img src={product.imageCover} alt="" className='w-full rounded-md'/>
                <div className='overlay bg-black bg-opacity-15 absolute left-0 top-0 opacity-0 hover:opacity-100 transition-opacity duration-300  w-full h-full flex gap-2 justify-center items-center text-sm'>
                    <div className='w-9 h-9 bg-mainColor text-white hover:scale-110 hover:rotate-6 transition-transform duration-300 rounded-full flex justify-center items-center cursor-pointer'>
                        <i className='fa-solid fa-heart'></i>
                    </div>
                    <div onClick={()=>{addToCart(product.id)}} className='w-9 h-9 bg-mainColor text-white hover:scale-110 hover:rotate-6 transition-transform duration-300 rounded-full flex justify-center items-center cursor-pointer'>
                        <i className='fa-solid fa-cart-shopping'></i>
                    </div>
                    <NavLink to={`/products/${product._id}`} className='w-9 h-9 bg-mainColor text-white hover:scale-110 hover:rotate-6 transition-transform duration-300 rounded-full flex justify-center items-center'>
                        <i className='fa-solid fa-eye'></i>
                    </NavLink>
                </div>
            </div>
            <div className='p-4'>
                <h3 className='text-mainColor'>{product.category.name}</h3>
                <h2 className='font-semibold line-clamp-2'>{product.title}</h2>
                <div className='flex justify-between mt-2'>
                    <h6>{product.price} L.E</h6>
                    <div className='flex items-center gap-1'>
                        <i className='text-ratingColor fa-solid fa-star'></i>
                        <span>{product.ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
