import { Heading, ListData } from "@/components/atoms";
import { SectionLayout } from "@/components/organisms";
import { FormWebstore, NotMembership, PaymentChecking } from "@/layouts";
import { SSRGetDataApi } from "@/utils/fetchingSSR";

export default async function Webstore() {
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

  if (!profile?.id_webstore) {
    return <FormWebstore />;
  }

  return (
    <div className="py-8">
      <Heading>Webstore</Heading>
      <SectionLayout>
        <div>
          <ListData label="Id Webstore" value={profile?.id_webstore} />
        </div>
      </SectionLayout>
    </div>
  );
}
