import { Footer, MembershipPlanList, NavBar } from "@/src/components";
import { mainPages } from "@/src/data/pages";

export default function Harga() {
  return (
    <>
      <NavBar pages={mainPages} />
      <MembershipPlanList />
      <Footer />
    </>
  );
}
