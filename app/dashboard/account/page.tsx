"use client";
import { EditDataIcon, Heading } from "@/components/atoms";
import { Button, ListData } from "@/src/components";
import { DeleteDataApi, GetDataApi } from "@/src/utils";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Confirm, Loading } from "notiflix";
import { useEffect, useState } from "react";
import mixpanel from "@/config/mixpanel";

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const responseProfile = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`,
        1
      );
      setProfile(responseProfile.data);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    Loading.circle();
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      async () => {
        try {
          const responseLogout = await DeleteDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/logout`
          );

          mixpanel.track("Button Clicked", {
            "Button Name": "Keluar Aplikasi",
            "Button Type": "Text",
            status: responseLogout?.success,
            message: responseLogout.message || "",
          });

          if (responseLogout.success) {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            window.location.reload();
            Loading.remove();
          }
        } catch (error) {
          console.error(error);
          Loading.remove();
        }
      },
      () => {
        Loading.remove();
      },
      {
        okButtonBackground: "#FF0000",
        titleColor: "#FF0000",
      }
    );
  };

  return (
    <div>
      <Heading>Profile</Heading>
      <div className="bg-white dark:bg-slate-800 p-2 rounded my-2">
        <ListData label="nama" value={profile.nama} />
        <ListData label="Username" value={profile.username} />
        <ListData label="Email" value={profile.email} />
        <ListData label="Whatsapp" value={profile.whatsapp} />
        <EditDataIcon />
      </div>
      <div className="bg-white dark:bg-slate-800 p-2 rounded">
        <ListData label="Kota" value={profile.kota} />
        <ListData label="Alamat" value={profile.alamat} />
      </div>
      <div className="mt-2 hidden sm:flex">
        <Button onClick={handleLogout} variant="text" size="full">
          Keluar
        </Button>
      </div>
    </div>
  );
}
