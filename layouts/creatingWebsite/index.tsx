"use client";
import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function PaymentChecking() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded p-6">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">
              Webstore mu sedang dalam pengecekan
            </p>
            <p>
              Situs mu sudah dalam antrian, Tim kami akan melakukan pengecekan
              situs kamu sebelum bisa diluncurkan ke public maksimal 1x24 jam
            </p>
            <p>Kami akan mengirimkan mu email jika situs mu sudah siap</p>
          </div>
          <div className="w-full md:w-1/2">
            <Player
              autoplay
              loop
              src="https://lottie.host/ff6d244f-0c1f-44be-be49-8bae9fd30832/AQMO92eQ6D.json"
              style={{ height: "300px", width: "300px" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
      </div>
    </div>
  );
}
