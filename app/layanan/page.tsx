import { Footer, NavBar } from "@/src/components";
import { mainPages } from "@/src/data/pages";

export default function Harga() {
  return (
    <>
      <NavBar pages={mainPages} />
        <p>Halaman layanan</p>
      <Footer />
    </>
  );
}
