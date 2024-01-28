import { Footer, MembershipPlanList, NavBar } from "@/src/components";
import { mainPages } from "@/src/data/pages";
import mixpanel from "@/config/mixpanel";

export default function Harga() {
  mixpanel.track("Page viewed", {
    Page: "Harga",
  });

  return (
    <>
      <NavBar pages={mainPages} />
      <MembershipPlanList />
      <Footer />
    </>
  );
}
