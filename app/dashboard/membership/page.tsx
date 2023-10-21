"use client";
import moment from "moment";
import { ButtonStopMembership, Heading, ListData } from "@/components/atoms";
import { MembershipPlanList, PaymentChecking } from "@/layouts";
import { formatCurrency } from "@/utils";
import { SectionLayout } from "@/components/organisms";
import { useSelector } from "react-redux";
import { LoadingAnimation } from "@/src/components";

const Membership = async () => {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

  if (!profile) {
    <LoadingAnimation />;
  }

  if (!profile.id_membership) {
    return (
      <div>
        <MembershipPlanList />
      </div>
    );
  }

  if (!transaksi.verifikasi) {
    return (
      <div>
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
