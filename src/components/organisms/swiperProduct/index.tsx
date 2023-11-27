"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { CardProduct } from "../../molecules";
import { useRouter } from "next/navigation";

interface SwiperProductProps {
  products: any[];
  title: string;
  url?: string;
}

export default function SwiperProduct({
  products,
  title,
  url,
}: SwiperProductProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mr-5">
        <p className="underline font-semibold m-2">{title}</p>
        {url && (
          <p
            className="text-xs sm:text-sm cursor-pointer text-indigo-500 select-none"
            onClick={() => router.push(url)}
          >
            Lihat Semua
          </p>
        )}
      </div>

      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={3}
          spaceBetween={2}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 2,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 2,
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.slug} className="p-1">
              <CardProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
