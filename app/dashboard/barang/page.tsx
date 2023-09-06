import { SearchBar } from "@/components/molecules";
import { CatalogProducts, SwiperProduct } from "@/components/organisms";
import { PaymentChecking } from "@/layouts";
import { NotMembership } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const Barang = async () => {
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

  const responseBarangPromo = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?promo=true`
  );

  const barangPromo = responseBarangPromo.data;

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <SearchBar />
      <SwiperProduct
        url="/dashboard/barang/promo"
        title="Promo"
        products={barangPromo}
      />
      <p className="underline font-semibold m-2">{"Semua Barang"}</p>
      <CatalogProducts />
    </div>
  );
};

export default Barang;
