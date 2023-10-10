"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "next/image";
import WoodTexture from "@/public/wood.png";
import StoneTexture from "@/public/stone.png";
import RusticTexture from "@/public/rustic.png";
import MarbleTexture from "@/public/marble.png";
import FancyTekstur from "@/public/fancy.png";
import BasicTekstur from "@/public/basic.png";

const teksturList = [
  {
    title: "Marble",
    image: MarbleTexture,
  },
  {
    title: "Wood",
    image: WoodTexture,
  },
  {
    title: "Basic",
    image: BasicTekstur,
  },
  {
    title: "Fancy",
    image: FancyTekstur,
  },
  {
    title: "Stone",
    image: StoneTexture,
  },
  {
    title: "Rustic",
    image: RusticTexture,
  },
];

export default function TextureList() {
  return (
    <div>
      <div className="flex justify-between items-center mr-5">
        <p className="underline font-semibold m-2">Pilihan Tekstur</p>
      </div>
      <div className="cursor-grab select-none">
        <Swiper
          slidesPerView={2}
          spaceBetween={3}
          modules={[Pagination]}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 3,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 3,
            },
          }}
        >
          {teksturList?.map((tekstur) => (
            <SwiperSlide key={tekstur.title} className="p-2">
              <Image
                className="mx-2 rounded-md"
                src={tekstur.image}
                alt={tekstur.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
