import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import HomeSlider from '../../components/homeSider/HomeSlider';
import CategoriesSlider from '../../components/categoriesSlider/CategoriesSlider';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

export default function Home() {

  async function getAllProducts() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data
  }

  let {data, isLoading} = useQuery({
    queryKey: ['products'], // array contain query key name
    queryFn:getAllProducts // func which call api
  })

  if(isLoading){
    return <Loading/>
  }

  return (
    <>
        <Helmet>
                <title>Home</title>
        </Helmet>
        <HomeSlider/>
        <CategoriesSlider/>
        <div className='grid grid-cols-12 gap-5 pt-10'> {
          data.data.map((p, index) => {
            return (
              <ProductCard product={p} key={index} />
            )
          })
        }
      </div>

    </>
  )
}
