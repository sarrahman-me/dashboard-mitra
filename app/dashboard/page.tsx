"use client";
import { Logo } from "@/components/atoms";
import { GiHand } from "react-icons/gi";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { profile } = useSelector((state: any) => state.profile);

  return (
    <div>
      <div className="hidden md:inline-flex font-bold justify-center items-center">
        Hay !! Selamat datang di <Logo size="text-base" />
        <span>
          <GiHand />
        </span>{" "}
      </div>
      <p className="inline-flex md:hidden text-lg font-bold justify-center items-center">
        Hay !! Selamat datang
        <span>
          <GiHand />
        </span>{" "}
      </p>
    </div>
  );
}
