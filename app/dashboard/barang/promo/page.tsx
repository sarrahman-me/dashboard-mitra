import { HeaderAndBackIcon, SearchBar } from "@/components/molecules";
import { CatalogProducts } from "@/components/organisms";
import { PaymentChecking, NotMembership } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const BarangPromo = async () => {
  const responseProfile = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );

  const profile = responseProfile.data;
  let membership = null;
  let transaksi = null;
  let persentaseHarga = null;

  if (profile?.id_membership) {
    const responseMembership = await SSRGetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/member/${profile?.id_membership}`
    );

    membership = responseMembership.data.membership;
    persentaseHarga = responseMembership?.data?.harga?.persentase;

    if (membership?.id_transaksi) {
      const responseTransaksi = await SSRGetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${membership.id_transaksi}`
      );

      transaksi = responseTransaksi.data;
    }
  }

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <SearchBar />
      <HeaderAndBackIcon title="Promo" />
      <CatalogProducts persentaseHarga={persentaseHarga} atribut={`promo=true`} />
    </div>
  );
};

export default BarangPromo;
