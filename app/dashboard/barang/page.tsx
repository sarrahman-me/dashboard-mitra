import { Heading } from "@/components/atoms";
import { CardProduct } from "@/components/molecules";
import { SwiperProduct } from "@/components/organisms";
import { PaymentChecking } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

const Barang = async () => {
  const responseProfile = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );

  const responseBarang = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang`
  );

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

  if (!profile.id_membership) {
    return (
      <div>
        <Heading>Barang</Heading>
        <p>pilih membership dulu</p>
      </div>
    );
  }

  if (!transaksi.verifikasi) {
    return (
      <div>
        <Heading>Barang</Heading>
        <PaymentChecking />
      </div>
    );
  }

  return (
    <div>
      <Heading>Barang</Heading>
      <SwiperProduct products={barang} title={"semua barang"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {barang.map((item: any, i: any) => (
          <div key={i}>
            <CardProduct product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Barang;
