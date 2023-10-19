"use client";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import {
  Button,
  Container,
  Footer,
  NavBar,
  TextfieldGroup,
  Typography,
} from "@/src/components";
import { formVerifyEmail } from "@/src/data/forms";
import { mainPages } from "@/src/data/pages";

export default function VerifyEmail() {
  const router = useRouter();
  const email = getCookie("email") || "";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email,
      code: data.code,
    };
    setLoading(true);
    Loading.hourglass();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/verify-email`,
      payload
    );

    if (response?.success) {
      setCookie("tx", response.data.token, {
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24,
      });
      setCookie("rtx", response.data.refreshToken, {
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      Notify.success(response.message);
      router.push("/dashboard");
      Loading.remove();
    } else {
      setLoading(false);
      seterror(response.error);
      Loading.remove();
      Notify.failure(response.message);
    }
  };

  const sendCodeAgain = async () => {
    setLoading(true);
    Loading.hourglass();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/code-verify`,
      {
        email,
      }
    );

    if (response?.success) {
      Notify.success(response.message);
      Loading.remove();
      setLoading(false);
    } else {
      setLoading(false);
      Loading.remove();
      setLoading(false);
      Notify.failure(response.message);
    }
  };

  return (
    <section>
      <NavBar pages={mainPages} />
      <div className="flex flex-col items-center justify-center">
        <Container otherClass="my-5 min-w-full md:min-w-[30%]">
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            {
              <Typography align="center">
                Masukkan 5 digit angka yang dikirimkan ke{" "}
                {email && <Typography align="center">{email}</Typography>}
              </Typography>
            }

            <TextfieldGroup
              error={error}
              forms={formVerifyEmail}
              setData={setData}
              data={data}
            />
            <Button loading={loading} size="full" type="submit">
              Submit
            </Button>
            <Typography
              otherClass="cursor-pointer"
              align="center"
              onClick={sendCodeAgain}
              variant="helper"
              color="secondary"
            >
              Kirim ulang
            </Typography>
          </form>
        </Container>
      </div>
      <Footer />
    </section>
  );
}
