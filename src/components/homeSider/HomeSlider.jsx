import React from 'react'
import sliderImg1 from '/slider-image-3.jpeg'
import sliderImg2 from '/slider-image-2.jpeg'
import sliderImg3 from '/slider-image-1.jpeg'

export default function HomeSlider() {
    return (
        <div className='grid grid-cols-12 my-3'>
            <div className='col-span-8 h-full'>
                <swiper-container loop={true} style={{height:'100%'}}>
                    <swiper-slide className='h-full'>
                        <img src={sliderImg1} alt="" className='w-full h-full object-cover' />
                    </swiper-slide>
                    <swiper-slide className='h-full'>
                        <img src={sliderImg2} alt="" className='w-full h-full object-cover' />
                    </swiper-slide>
                    <swiper-slide className='h-full'>
                        <img src={sliderImg3} alt="" className='w-full h-full object-cover' />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div className='col-span-4 h-full'>
                <img src={sliderImg2} alt="" className='w-full h-1/2 object-cover' />
                <img src={sliderImg3} alt="" className='w-full h-1/2 object-cover' />
            </div>
        </div>
    )
}
