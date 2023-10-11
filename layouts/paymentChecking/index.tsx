"use client";
import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function PaymentChecking() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow text-center">
        <h1 className="text-xl md:text-2xl font-semibold">
          {" "}
          Menunggu verifikasi pembayaran
        </h1>
        <div className="flex justify-center">
          <Player
            autoplay
            loop
            src="https://lottie.host/52a9a577-6df8-40e4-8aa1-cee07b153545/ir8pOdy5MP.json"
            style={{ height: "300px", width: "300px" }}
          >
            <Controls buttons={["play", "repeat", "frame", "debug"]} />
          </Player>
        </div>
        <p className="">
          Pembayaranmu sedang dalam proses verifikasi. Mohon tunggu beberapa
          saat hingga verifikasi selesai.
        </p>
      </div>
    </div>
  );
}
