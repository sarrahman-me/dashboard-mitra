import { CatalogProducts } from "@/components/organisms";
import { HeaderAndBackIcon } from "@/components/molecules";
import { SSRGetDataApi } from "@/utils/fetchingSSR";
import { NotMembership, PaymentChecking } from "@/layouts";

export default async function Pencarian(req: any) {
  const { query } = req.searchParams;

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

  const persentaseHarga = membership?.klasifikasi?.kategori_harga?.persentase;

  return (
    <div>
      <HeaderAndBackIcon title={`pencarian ${query}`} />
      <CatalogProducts
        persentaseHarga={persentaseHarga}
        atribut={`query=${query}`}
        path="products/search"
      />
    </div>
  );
}
