"use client";
import Image from "next/image";
import { useState } from "react";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import { Button, Input } from "@/components/atoms";
import siteBuild from "@/public/webstore-deploy.svg";

const FormWebstore = () => {
  const [namaWebstore, setNamaWebstore] = useState("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    Loading.circle();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/deploy`,
      {
        nama_webstore: namaWebstore,
      }
    );

    if (response.success) {
      Loading.remove();
      Notify.success(response.message);
      window.location.reload();
    } else {
      Loading.remove();
      Notify.failure(response.message);
    }
  };

  return (
    <div className={`flex h-96 md:flex-row flex-col items-center`}>
      <div className="">
        <Image src={siteBuild} alt="build site" />
      </div>
      <div className="w-full p-2">
        <p className="text-lg font-semibold text-center">
          Buat situs toko onlinemu
        </p>
        <form onSubmit={handleFormSubmit} className="py-5">
          <Input
            label={"Nama Toko Online"}
            onChange={(event) => setNamaWebstore(event.target.value)}
            name={"nama_webstore"}
          />
          <Button isSubmit={true} className="mt-4">
            Buat Situs
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormWebstore;
