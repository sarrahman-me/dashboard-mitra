"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  ExpiredPlan,
  FormWebstore,
  NotMembership,
  PaymentChecking,
  SwitchToggle,
  Textfield,
} from "@/src/components";
import { GetDataApi, PatchDataApi } from "@/src/utils";
import { Notify } from "notiflix";
import { useRouter } from "next/navigation";
import { HeaderAndBackIcon } from "@/components/molecules";
import ImageInputWithPreview from "@/src/components/molecules/imageInputWithPreview";
import mixpanel from "@/config/mixpanel";

export default function Setting() {
  const router = useRouter();
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );
  const [profitPersentase, setPersentase] = useState("" as any);
  const [showPrice, setShowPrice] = useState(false);
  const [showStock, setShowStock] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState([] as string[]);
  const [banner, setBanner] = useState([] as string[]);

  useEffect(() => {
    async function fetchData() {
      if (profile?.id_webstore) {
        const responseWebstore = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`
        );
        const {
          profit_percentage,
          show_stock,
          show_price,
          use_password,
          password,
          logo,
          banner_image,
        } = responseWebstore?.data;
        setPersentase(profit_percentage);
        setShowStock(show_stock);
        setShowPrice(show_price);
        setUsePassword(use_password);
        setPassword(password);
        if (logo) {
          setLogo([logo]);
        }
        if (banner_image) {
          setBanner([banner_image]);
        }
      }
    }
    fetchData();
  }, [profile.id_webstore]);

  if (!profile.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi.verifikasi) {
    return <PaymentChecking />;
  }

  if (!profile.id_webstore) {
    return <FormWebstore />;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (usePassword && !password) {
      Notify.warning("password harus di isi");
    }

    if (showPrice && !profitPersentase) {
      Notify.warning("isi persentase keuntungan");
    }

    const response = await PatchDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`,
      {
        show_price: showPrice,
        show_stock: showStock,
        profit_percentage: profitPersentase,
        use_password: usePassword,
        password: password,
        logo: logo[0],
        banner_image: banner[0],
      }
    );

    mixpanel.track("Setting Webstore", {
      status: response?.success,
      message: response.message || "",
      show_price: showPrice,
      show_stock: showStock,
      profit_percentage: profitPersentase,
      use_password: usePassword,
      password: password,
    });

    if (response.success) {
      Notify.success(response.message);
      router.push("/dashboard/webstore");
    } else {
      Notify.failure(response.message);
    }
  };

  return (
    <div className="mt-2">
      <HeaderAndBackIcon title={"Setting Webstore"} />
      <form className="my-3 space-y-4" onSubmit={handleSubmit}>
        <Textfield
          name={"profit"}
          value={profitPersentase}
          type="number"
          label="Persentase Keuntungan"
          onChange={(value) => setPersentase(Number(value))}
        />
        <SwitchToggle
          label={showPrice ? "tampilkan harga" : "tidak tampilkan harga"}
          setValue={setShowPrice}
          value={showPrice}
        />
        <SwitchToggle
          label={showStock ? "tampilkan stok" : "tidak tampilkan stok"}
          setValue={setShowStock}
          value={showStock}
        />
        <SwitchToggle
          label={showStock ? "gunakan password" : "tidak gunakan password"}
          setValue={setUsePassword}
          value={usePassword}
        />
        <Textfield
          name={"password"}
          value={password}
          type="text"
          label="Password aplikasi"
          onChange={(value) => setPassword(value)}
        />
        <ImageInputWithPreview title="logo" gambar={logo} setGambar={setLogo} />
        <ImageInputWithPreview
          title="banner (700x360 px) "
          gambar={banner}
          setGambar={setBanner}
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
