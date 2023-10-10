import { CatalogProducts } from "@/components/organisms";
import { HeaderAndBackIcon } from "@/components/molecules";
import { SSRGetDataApi } from "@/utils/fetchingSSR";
import { NotMembership, PaymentChecking } from "@/layouts";

export default async function Motif({
  params,
}: {
  params: { motif: string };
}) {
  const motif = params.motif;

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
      <HeaderAndBackIcon title={`Motif ${motif}`} />
      <CatalogProducts
        persentaseHarga={persentaseHarga}
        atribut={`motif=${motif}`}
      />
    </div>
  );
}
