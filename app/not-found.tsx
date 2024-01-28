"use client";
import { Button, LottiePlayer, Typography } from "@/src/components/atoms";
import { useRouter } from "next/navigation";
import mixpanel from "@/config/mixpanel";

/**
 * Halaman NotFound digunakan untuk menampilkan pesan kesalahan saat halaman tidak ditemukan.
 */

export default function NotFound() {
  const router = useRouter();
  mixpanel.track("Page Not Found");

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="text-center p-2">
        <LottiePlayer
          url={
            "https://lottie.host/e03e05a9-9549-4835-ae1a-b4d0e497baf5/MTprdbG0As.json"
          }
          height={"500px"}
          width={"500px"}
        />
        <Typography variant="subtitle">
          Halaman yang Anda cari tidak ditemukan
        </Typography>
      </div>
      <Button variant="outlined" onClick={() => router.back()}>
        Kembali
      </Button>
    </div>
  );
}
