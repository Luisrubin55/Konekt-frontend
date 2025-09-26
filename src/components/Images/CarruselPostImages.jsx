import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Navigation } from "swiper/modules";
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

function CarruselPostImages({images}) {
    return (
        <Swiper spaceBetween={10} slidesPerView={1} modules={[Navigation, Pagination]} pagination={{ clickable: true }} navigation>
            {images?.map((img, idx) => (
                <SwiperSlide key={idx}>
                    <img src={img.urlImage} className="w-full h-96 object-contain rounded" alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CarruselPostImages