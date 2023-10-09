"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Button } from "@/components/atoms";

export default function Jumbotron() {
  return (
    <>
      <div className="container p-8 mx-auto xl:px-0 flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
              Jual Keramik Tak Pernah Semudah Ini
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Tokokeramik.com adalah platform yang menyediakan semua yang kamu
              butuhkan untuk menjalankan bisnis keramik secara online. Dengan
              satu tempat, kamu dapat membuat situs web toko keramik sendiri dan
              dapatkan informasi keramik dari suplier terdekat.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Button href="/register">Daftar</Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Player
              autoplay
              loop
              src="https://lottie.host/1b94bb9c-c6a3-44e5-843f-47cccf7abc6f/x8RTjXGVi1.json"
              style={{ height: "400", width: "400" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
      </div>
    </>
  );
}
