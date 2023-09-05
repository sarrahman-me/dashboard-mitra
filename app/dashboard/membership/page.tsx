import moment from "moment";
import { ButtonStopMembership, Heading, ListData } from "@/components/atoms";
import { MembershipPlanList, PaymentChecking } from "@/layouts";
import { formatCurrency } from "@/utils";
import { SSRGetDataApi } from "@/utils/fetchingSSR";
import { SectionLayout } from "@/components/organisms";

const Membership = async () => {
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
    return (
      <div>
        <Heading>Membership</Heading>
        <MembershipPlanList />
      </div>
    );
  }

  if (!transaksi?.verifikasi) {
    return (
      <div>
        <Heading>Membership</Heading>
        <PaymentChecking />
      </div>
    );
  }

  return (
    <div className="py-8">
      <Heading>Membership</Heading>
      <SectionLayout>
        <div>
          <ListData label="Id membership" value={membership.id_membership} />
          <ListData
            label="Biaya bulanan"
            value={formatCurrency(Number(transaksi.nominal))}
          />
          <ListData
            label="Tanggal mulai"
            value={moment(Number(membership.startDate)).format("LL")}
          />
          <ListData
            label="Tanggal berakhir"
            value={moment(Number(membership.endDate)).format("LL")}
          />
        </div>
      </SectionLayout>
      <ButtonStopMembership id_membership={profile?.id_membership} />
    </div>
  );
};

export default Membership;
