import { Heading } from "@/components/atoms";
import { CardProduct } from "@/components/molecules";
import { SectionLayout, SwiperProduct } from "@/components/organisms";
import { PaymentChecking } from "@/layouts";
import { NotMembership } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const Barang = async () => {
  const responseProfile = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );

  const responseBarang = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang`
  );

  const responseBarangPromo = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang?promo=true`
  );

  const barangPromo = responseBarangPromo.data;
  const profile = responseProfile.data;
  const barang = responseBarang.data;
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
      <p className="underline font-semibold m-2">Promo</p>
      <SwiperProduct products={barangPromo} />
      <p className="underline font-semibold m-2">Semua Barang</p>
      <SectionLayout>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {barang.map((item: any, i: any) => (
            <div key={i}>
              <CardProduct product={item} />
            </div>
          ))}
        </div>
      </SectionLayout>
    </div>
  );
};

export default Barang;
