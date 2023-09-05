"use client";
import { PostDataApi } from "@/utils";
import { useRouter } from "next/navigation";
import { Confirm, Loading, Notify } from "notiflix";

export default function ButtonStopMembership(props: { id_membership: any }) {
  const router = useRouter();

  const berhentiMembership = async (id_membership: any) => {
    Confirm.show(
      "Konfirmasi",
      "Yakin untuk berhenti?",
      "Yakin",
      "Batal",
      async () => {
        Loading.circle();
        const response = await PostDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/berhenti`,
          { id_membership }
        );
        if (response.success) {
          Notify.success("berhasil berhenti langganan");
          router.push("/dashboard");
          Loading.remove();
        }
      }
    );
  };

  return (
    <div>
      <button
        className="border border-red-500 hover:shadow shadow-red-500 bg-white text-red-500 dark:bg-slate-800 p-2 px-4 rounded"
        onClick={() => berhentiMembership(props.id_membership)}
      >
        Berhenti Berlangganan
      </button>
    </div>
  );
}
