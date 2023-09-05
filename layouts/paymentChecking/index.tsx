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
              Sedang dalam Proses Verifikasi
            </p>
            <p>
              Pembayaranmu sedang dalam proses verifikasi. Mohon tunggu sebentar
              hingga verifikasi selesai.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Player
              autoplay
              loop
              src="https://lottie.host/4329cab5-2cb6-40f8-8604-7604031b0e44/aGazObx7ge.json"
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
