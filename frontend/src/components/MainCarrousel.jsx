import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const MainCarrousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='h-96 flex justify-center items-center bg-center bg-cover bg-[url("https://images.unsplash.com/photo-1599412227383-b7d4751c8765?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
                <h1 className='text-neutral-50 uppercase font-bold text-3xl px-20'>Conoce nuestros productos</h1>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className=' h-96 flex justify-center items-center bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1584466990376-09422a2b033a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
                <h1 className='text-neutral-100 uppercase font-bold text-3xl px-20'>Tenemos productos de calidad</h1>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default MainCarrousel
