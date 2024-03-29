"use client";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
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
import { authPages } from "@/src/data/pages";
import { formLogin } from "@/src/data/forms";
import mixpanel from "@/config/mixpanel";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    Loading.hourglass();

    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/login`,
      data
    );

    mixpanel.track("Login", {
      "Button Name": "Masuk",
      "Button Type": "Contained",
      status: response?.success,
      message: response.message || "",
      data: data,
    });

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
    } else {
      setLoading(false);
      seterror(response.error);
      Notify.failure(response.message);
    }
    Loading.remove();
  };

  return (
    <section>
      <NavBar pages={authPages} />
      <div className="flex flex-col items-center justify-center">
        <Container otherClass="my-5 min-w-[95%] sm:min-w-[50%] lg:min-w-[30%]">
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <TextfieldGroup
              error={error}
              forms={formLogin}
              setData={setData}
              data={data}
            />
            <Button loading={loading} size="full" type="submit">
              Masuk
            </Button>
            <Typography variant="helper" color="secondary" align="center">
              Belum punya akun{" "}
              <span
                onClick={() => {
                  router.push("/register");

                  // mixpanel tracker
                  mixpanel.track("Button Clicked", {
                    "Button Name": "Daftar",
                    "Button Type": "Text",
                  });
                }}
                className="underline text-indigo-500 cursor-pointer"
              >
                Daftar
              </span>
            </Typography>
          </form>
        </Container>
      </div>
      <Footer />
    </section>
  );
}
