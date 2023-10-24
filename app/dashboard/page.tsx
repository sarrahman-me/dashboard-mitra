"use client";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { profile } = useSelector((state: any) => state.profile);

  return (
    <div>
      <p>Selamat datang {profile.nama}</p>
    </div>
  );
}
