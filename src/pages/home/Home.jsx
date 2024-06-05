import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import HomeSlider from '../../components/homeSider/HomeSlider';
import CategoriesSlider from '../../components/categoriesSlider/CategoriesSlider';

export default function Home() {

  const [products, setProducts] = useState(null);

  async function getAllProducts() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setProducts(data);
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
        <HomeSlider/>
        <CategoriesSlider/>
        {products == null ? <Loading/> :
        <div className='grid grid-cols-12 gap-5 pt-10'> {
          products.data.map((p, index) => {
            return (
              <ProductCard product={p} key={index} />
            )
          })
        }
      </div>
        }
    </>
  )
}