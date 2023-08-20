"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaPen } from "react-icons/fa";

export default function EditDataIcon() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <FaPen
        onClick={() => router.push(`${pathname}/edit`)}
        className="m-1 w-9 h-9 cursor-pointer hover:text-orange-500 border p-2 rounded text-white hover:bg-white bg-orange-500"
      />
    </div>
  );
}
