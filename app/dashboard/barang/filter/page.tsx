"use client";
import { HeaderAndBackIcon } from "@/components/molecules";
import {
  CatalogProducts,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
} from "@/src/components";
import { SearchBar } from "@/src/components/molecules";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Motif() {
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori");
  const ukuran = searchParams.get("ukuran");
  const motif = searchParams.get("motif");
  const queryAtribute = `kategori=${kategori || ""}&ukuran=${
    ukuran || ""
  }&motif=${motif || ""}`;
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <HeaderAndBackIcon
        title={`${kategori || ""} ${ukuran || ""} ${motif || ""}`}
      />
      <SearchBar />
      <div>
        <p className="underline font-semibold m-2">Promo</p>
        <CatalogProducts
          limit="100"
          unPagination={true}
          atribut={`${queryAtribute}&promo=true`}
        />
      </div>
      <p className="underline font-semibold m-2">Pilihan Barang</p>
      <CatalogProducts atribut={queryAtribute} />
    </div>
  );
}
