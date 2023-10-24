"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GetDataApi, PatchDataApi } from "@/utils";
import { Notify } from "notiflix";
import { Button } from "@/components/atoms";
import { HeaderAndBackIcon } from "@/components/molecules";
import { TextfieldGroup } from "@/src/components";

export default function FormEditData() {
  const router = useRouter();
  const [profile, setProfile] = useState({} as any);
  const [data, setdata] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const form = [
    {
      type: "text",
      label: "Nama",
      name: "nama",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
    },
    {
      type: "number",
      label: "Whatsapp",
      name: "whatsapp",
    },
    {
      type: "text",
      label: "Alamat",
      name: "alamat",
    },
    {
      type: "text",
      label: "Kota",
      name: "kota",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const authProfile = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
      );
      setProfile(authProfile.data);
      const mitraData = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/mitra/by?slug=${authProfile?.data?.slug}`
      );
      setdata(mitraData.data);
    };
    getData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await PatchDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/mitra/${profile?.slug}`,
      data
    );
    if (response.success) {
      Notify.success(response.message);
      router.back();
    } else {
      seterror(response.error);
      Notify.failure(response.message);
    }
  };

  return (
    <div>
      <HeaderAndBackIcon title="Edit Profile" />
      <form className="md:w-1/2 mt-5" onSubmit={handleSubmit}>
        <TextfieldGroup error={error} forms={form} setData={setdata} data={data} />
        <div className="mt-4">
          <Button isSubmit={true}>Simpan</Button>
        </div>
      </form>
    </div>
  );
}
