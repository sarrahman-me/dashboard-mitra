"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { CardProduct } from "../../molecules";
import SectionLayout from "../sectionLayout";

export default function SwiperProduct(props: { products: any[] }) {
  return (
    <SectionLayout>
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
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
    </SectionLayout>
  );
}
