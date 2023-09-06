import { HeaderAndBackIcon } from "@/components/molecules";
import { CatalogProducts } from "@/components/organisms";
import { PaymentChecking } from "@/layouts";
import { NotMembership } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const BarangPromo = async () => {
  const responseProfile = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );

  const profile = responseProfile.data;
  let membership = null;
  let transaksi = null;

  if (profile?.id_membership) {
    const responseMembership = await SSRGetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/member/${profile?.id_membership}`
    );

    membership = responseMembership.data;

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
      <HeaderAndBackIcon title="Promo" />
      <CatalogProducts atribut={`promo=true`} />
    </div>
  );
};

export default BarangPromo;
