import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading';
import { useQuery } from '@tanstack/react-query';

export default function CategoriesSlider() {

    async function getAllCategories() {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        return data
    }

    let {data, isLoading} = useQuery({
        queryKey: ['categories'], // array contain query key name
        queryFn:getAllCategories // func which call api
        })

        if(isLoading){
            return <Loading/>
        }

    return (
        <>
            <section className='my-20'>
                    <>
                    <h3 className='text-mainColor font-semibold text-lg mb-3'>Shop Popular Categories</h3>
                    <swiper-container loop={true} slides-per-view={6}>
                        {data.data.map((cat,index)=>
                            <swiper-slide  key={index}>
                                <img src={cat.image} alt="" className='w-full h-72 object-cover' />
                                <h6 className='ms-2'>{cat.name}</h6>
                            </swiper-slide>
                        )}
                    </swiper-container>
                    </>
            </section>
        </>
    )
}
