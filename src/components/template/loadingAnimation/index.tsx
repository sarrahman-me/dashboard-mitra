"use client";
import { LottiePlayer, Typography } from "@/src/components/atoms";

/**
 * Halaman Loading digunakan untuk menampilkan animasi saat halaman loading.
 */

const LoadingAnimation = () => {
  return (
    <div
      className="flex justify-center items-center"
      role="status"
    >
      <LottiePlayer
        url={
          "https://lottie.host/a07b9995-147c-4ee5-9f19-3a830d9a13ec/EVdtHO33Fa.json"
        }
        height={"300px"}
        width={"300px"}
      />
      <Typography otherClass="sr-only">Loading</Typography>
    </div>
  );
};

export default LoadingAnimation;
