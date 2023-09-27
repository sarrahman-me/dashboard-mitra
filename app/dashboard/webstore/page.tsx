import { Heading, ListData } from "@/components/atoms";
import { SectionLayout } from "@/components/organisms";
import { FormWebstore, NotMembership, PaymentChecking } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";
import moment from "moment";

export default async function Webstore() {
  const responseProfile = await SSRGetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );

  const profile = responseProfile.data;

  let membership = null;
  let webstore = null;
  let transaksi = null;

  if (profile?.id_membership) {
    const responseMembership = await SSRGetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/member/${profile?.id_membership}`
    );

    membership = responseMembership.data.membership;

    if (membership?.id_transaksi) {
      const responseTransaksi = await SSRGetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${membership.id_transaksi}`
      );

      transaksi = responseTransaksi.data;
    }
  }

  if (profile?.id_webstore) {
    const responseWebstore = await SSRGetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/${profile.id_webstore}`
    );

    webstore = responseWebstore.data;
  }

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  if (!profile?.id_webstore) {
    return <FormWebstore />;
  }

  return (
    <div className="py-6">
      <Heading>Webstore</Heading>
      <SectionLayout>
        <div>
          <ListData label="Id Webstore" value={webstore?.id_webstore} />
          <ListData label="Nama Webstore" value={webstore?.nama_webstore} />
          <ListData label="URL" value={webstore?.url} />
          <ListData label="Dibuat tanggal" value={moment(webstore?.createdAt).format('LL')} />
        </div>
      </SectionLayout>
    </div>
  );
}
