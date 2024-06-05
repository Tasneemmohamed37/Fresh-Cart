import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { cartContext } from '../../context/Cart.Context'
import Loading from '../../components/loading/Loading';


export default function Cart() {

    const { getCart, cartInfo, removeCartItem, clearCart, updateCartItemCount } = useContext(cartContext);


    useEffect(() => {
        getCart()
    },[])

    return (
        <>
            {!cartInfo ? <Loading /> :
                <section className='bg-slate-100 p-5'>
                    <h2>
                        <span className='text-black font-semibold'>Shop Cart </span>
                        <i className="fa-solid fa-cart-shopping "></i>
                    </h2>
                    {
                        cartInfo.numOfCartItems > 0 ?
                            <div className='my-3'>
                                <h3 className='text-mainColor text-lg'>Total Cart Price: <span className='font-bold'>{cartInfo.data.totalCartPrice}</span> EGP</h3>
                                {cartInfo.data.products.map(prd => 
                                <div key={prd._id} className="cart-item mt-5 grid grid-cols-12 gap-1">
                                    <div className='col-span-2'>
                                        <img src={prd.product.imageCover} alt="" className='w-full h-32 object-contain' />
                                    </div>
                                    <div className='col-span-10 flex justify-between'>
                                        <div>
                                            <h4 className='font-semibold'>{prd.product.title}</h4>
                                            <h6 className='text-mainColor my-1'>Price: {prd.price}</h6>
                                            <button onClick={()=>{removeCartItem(prd.product._id)}} className='btn-primary bg-red-500 text-sm px-3'><i className='fa-solid fa-trash-can'></i> remove</button>
                                        </div>
                                        <div className='flex items-center gap-2 h-fit'>
                                            <button onClick={()=>{updateCartItemCount(prd.product._id,++prd.count)}} className='btn-fa-primary bg-mainColor text-white p-1 text-sm'><i className='fa-solid fa-plus'></i></button>
                                            <span>{prd.count}</span>
                                            <button onClick={()=>{
                                                if(prd.count > 1)
                                                    updateCartItemCount(prd.product._id,--prd.count)
                                                else
                                                    removeCartItem(prd.product._id)
                                                }} className='btn-fa-primary bg-mainColor text-white p-1 text-sm'><i className='fa-solid fa-minus'></i></button>
                                        </div>
                                    </div>
                                </div>
                                )}
                                <div className='flex justify-end'>
                                <button onClick={clearCart} className='btn-primary bg-red-600'>clear cart</button>
                                </div>
                            </div>
                            :
                            <div className='flex flex-col gap-3 justify-center items-center my-14'>
                                <p>there is are items yet!</p>
                                <NavLink to={'/products'} className='btn-primary'>add your first product to cart</NavLink>
                            </div>
                    }
                </section>
            }

        </>
    )
}
