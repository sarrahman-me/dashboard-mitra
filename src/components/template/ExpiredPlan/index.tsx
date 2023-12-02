"use client";
import { FcExpired } from "react-icons/fc";
import { Button, Container, Typography } from "../../atoms";
import { Confirm, Loading, Notify } from "notiflix";
import { PostDataApi } from "@/src/utils";
import { useRouter } from "next/navigation";

export default function ExpiredPlan(props: { id_membership: string }) {
  const router = useRouter();
  const handleBerhentiMembership = () => {
    Confirm.show(
      "Konfirmasi",
      "Apakah kamu yakin?",
      "Yakin",
      "Batal",
      async () => {
        Loading.circle();
        const response = await PostDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/membership/berhenti`,
          {
            id_membership: props.id_membership,
          }
        );

        if (response.success) {
          Loading.remove();
          window.location.reload();
        } else {
          Loading.remove();
          Notify.failure(response.message);
        }
      },
      () => {},
      {
        okButtonBackground: "red",
        titleColor: "red",
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Container otherClass="p-8">
        <Typography align="center" variant="h4">
          Langganan Berakhir
        </Typography>
        <div className="flex justify-center">
          <FcExpired className="text-9xl" />
        </div>
        <div className="flex mt-5 justify-around">
          <Button
            variant="outlined"
            color="red"
            onClick={handleBerhentiMembership}
          >
            Berhenti
          </Button>
          <Button onClick={() => router.push("/dashboard/membership/renew")}>
            Perpanjang
          </Button>
        </div>
      </Container>
    </div>
  );
}
