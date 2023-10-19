"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import {
  Button,
  Checkbox,
  Container,
  Typography,
  TextfieldGroup,
  Footer,
  NavBar,
} from "@/src/components";
import { authPages } from "@/src/data/pages";
import { formRegister } from "@/src/data/forms";

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
      setCookie("email", data.email);
      Loading.remove();
      Notify.success(response.message);
      router.push("/verify-email");
    } else {
      setLoading(false);
      seterror(response.error);
      Loading.remove();
      Notify.failure(response.message);
    }
  };

  return (
    <section>
      <NavBar pages={authPages} />
      <div className="flex flex-col items-center justify-center">
        <Container otherClass="my-5 min-w-full md:min-w-[30%]">
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <TextfieldGroup
              forms={formRegister}
              error={error}
              setData={setData}
              data={data}
            />
            <Checkbox
              onChange={setAcceptedPolicy}
              label={
                <span>
                  Saya menyetujui{" "}
                  <Link className="underline" href={"/syarat-dan-ketentuan"}>
                    Syarat dan Ketentuan
                  </Link>
                </span>
              }
              name="policy"
              value={acceptPolicy}
            />
            <Button
              disabled={!acceptPolicy}
              loading={loading}
              type="submit"
              size="full"
            >
              Daftar
            </Button>
            <Typography color="secondary" align="center">
              Sudah punya akun{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-indigo-500 cursor-pointer"
              >
                Masuk
              </span>
            </Typography>
          </form>
        </Container>
      </div>
      <Footer />
    </section>
  );
}
