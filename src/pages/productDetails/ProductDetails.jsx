import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import ReactImageGallery from 'react-image-gallery';
import { cartContext } from '../../context/Cart.Context'
import { Helmet } from 'react-helmet';



export default function ProductDetails() {
    const {addToCart} = useContext(cartContext);

    const params = useParams(); 

    const [product, setProduct] = useState(null)

    const imageItems = product?.images.map((i)=>{
        return {
            original: i ,
            thumbnail: i
        }
    })
    
    async function getProductByID(){
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.id}`)
        setProduct(data.data);
    }

    useEffect(()=>{
        getProductByID()
    },[])
    
    return (
        <>
        <Helmet>
            <title>Products</title>
        </Helmet>
        {product ?<div className='grid grid-cols-12  gap-8 shadow-sm my-5'>
            <div className="img col-span-12  md:col-span-4">
                <ReactImageGallery items={imageItems} showNav={false} />
            </div>
            <div className="details col-span-12  md:col-span-8">
                <h2 className='text-2xl font-semibold'>{product.title}</h2>
                <h5 className='text-mainColor mb-2'>{product.category.name}</h5>
                <div className='mt-4'>
                <h4 className='text-slate-700'>{product.description}</h4>
                    <div className='flex justify-between'>
                    <h6>{product.price} L.E</h6>
                    <div className='flex items-center gap-1 my-2'>
                        <i className='text-ratingColor fa-solid fa-star'></i>
                        <span>{product.ratingsAverage}</span>
                    </div>
                </div>
                </div>
                <button className='w-full btn-primary' onClick={()=>{addToCart(product.id)}}>+ add to cart</button>
            </div>
        </div>
        : <Loading/> }
        
        </>
    )
}
