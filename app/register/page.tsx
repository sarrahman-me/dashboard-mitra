"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import { TextfieldGroup } from "@/components/organisms";
import { Footer, NavigationBar } from "@/layouts";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [error, seterror] = useState({} as any);
  const [acceptPolicy, setAcceptedPolicy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    Loading.circle();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/register`,
      data
    );
    if (response?.success) {
      Loading.remove();
      Notify.success(response.message);
      router.push("/login");
    } else {
      setLoading(false);
      seterror(response.error);
      Loading.remove();
      Notify.failure(response.message);
    }
  };

  const form = [
    {
      type: "text",
      label: "Nama",
      name: "nama",
      placeholder: "eg. Jhon Doe",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "yourMail@example.com",
    },
    {
      type: "number",
      label: "Whatsapp",
      name: "whatsapp",
      placeholder: "08123456789",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "******",
    },
  ];

  return (
    <section>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <TextfieldGroup
              error={error}
              form={form}
              setData={setData}
              data={data}
            />
            <div className="flex items-center">
              <input
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-medium"
              >
                Saya menyetujui{" "}
                <Link className="underline" href={"/privasi-data"}>Syarat dan Ketentuan</Link>
              </label>
            </div>
            <Button
              disabled={!acceptPolicy}
              isLoading={loading}
              isFullWidth={true}
              isSubmit={true}
            >
              Daftar
            </Button>
            <p className="text-center">
              Sudah punya akun{" "}
              <span
                onClick={() => router.push("/login")}
                className="underline text-indigo-500 cursor-pointer"
              >
                Masuk
              </span>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}
