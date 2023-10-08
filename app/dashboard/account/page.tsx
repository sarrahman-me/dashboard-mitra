"use client";
import { EditDataIcon, Heading, ListData } from "@/components/atoms";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const responseProfile = await GetDataApi(
        `/api/auth/profile`
      );
      setProfile(responseProfile.data);
    }
    fetchData();
  }, []);

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
    </div>
  );
}
