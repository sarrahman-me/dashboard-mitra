"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function PaymentChecking() {
  return (
    <div className="flex border bg-white dark:bg-slate-800 rounded flex-col md:flex-row">
      <div className="md:w-1/2 text-center flex justify-center items-center w-full m-2">
        <p className="font-semibold">
          Pembayaranmu sedang dalam proses verifikasi
        </p>
      </div>
      <div className="w-1/2">
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
  );
}
