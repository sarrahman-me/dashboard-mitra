"use client";
import { Button, Container, Typography } from "@/src/components";
import { menuItemsPageMobile } from "@/src/data/menu";
import { DeleteDataApi } from "@/utils";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Confirm, Loading } from "notiflix";

const Menu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Loading.circle();
    Confirm.show(
      "Konfirmasi",
      "Yakin Untuk Keluar ?",
      "Keluar",
      "Batal",
      async () => {
        try {
          const responseLogout = await DeleteDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/logout`
          );
          if (responseLogout.success) {
            deleteCookie("tx");
            deleteCookie("rtx");
            router.push("/login");
            window.location.reload();
            Loading.remove();
          }
        } catch (error) {
          console.error(error);
          Loading.remove();
        }
      },
      () => {
        Loading.remove();
      },
      {
        okButtonBackground: "#FF0000",
        titleColor: "#FF0000",
      }
    );
  };

  return (
    <div>
      <Typography variant="subtitle">Menu</Typography>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
        {menuItemsPageMobile.map((menu, i) => (
          <Container key={i} otherClass="p-2 divide-y-4 divide-transparent">
            <div className="text-indigo-600 text-xl">{menu.icon}</div>
            <Typography>{menu.label}</Typography>
          </Container>
        ))}
      </div>
      <Button onClick={handleLogout} variant="outlined" size="full">
        Keluar
      </Button>
    </div>
  );
};

export default Menu;
