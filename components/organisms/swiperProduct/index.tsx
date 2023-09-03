"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { CardProduct } from "../../molecules";

export default function SwiperProduct(props: {
  products: any[];
  title: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 p-2 my-3 md:mx-2 shadow sm:border rounded">
      <p>{props.title}</p>
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        >
          {props.products?.map((product) => (
            <SwiperSlide key={product.slug}>
              <CardProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
