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
          <div key={i} onClick={() => router.push(menu.href)}>
            <Container otherClass="bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-gray-700 dark:to-gray-800 text-white p-2 divide-y-4 divide-transparent cursor-pointer">
              <div className="text-white text-2xl">
                {menu.icon}
              </div>
              <p>{menu.label}</p>
            </Container>
          </div>
        ))}
      </div>
      <Button onClick={handleLogout} variant="text" size="full">
        Keluar
      </Button>
    </div>
  );
};

export default Menu;
