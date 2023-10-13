"use client";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import { TextfieldGroup } from "@/components/organisms";
import { Footer, NavigationBar } from "@/layouts";

export default function VerifyEmail() {
  const router = useRouter();
  const email = getCookie("email") || "";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email,
      code: data.code,
    };
    setLoading(true);
    Loading.hourglass();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/verify-email`,
      payload
    );

    if (response?.success) {
      setCookie("tx", response.data.token, {
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24,
      });
      setCookie("rtx", response.data.refreshToken, {
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      Notify.success(response.message);
      router.push("/dashboard");
      Loading.remove();
    } else {
      setLoading(false);
      seterror(response.error);
      Loading.remove();
      Notify.failure(response.message);
    }
  };

  const form = [
    {
      type: "number",
      label: "Kode verifikasi",
      name: "code",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-sm">
              {email && ` Masukkan 5 digit angka yang dikirimkan ke ${email}`}
            </p>

            <TextfieldGroup
              error={error}
              form={form}
              setData={setData}
              data={data}
            />
            <Button isLoading={loading} isFullWidth={true} isSubmit={true}>
              Submit
            </Button>
            <p className="text-xs text-indigo-500 text-center cursor-pointer">
              Kirim ulang
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}
