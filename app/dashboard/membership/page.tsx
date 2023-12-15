"use client";
import moment from "moment";
import { formatCurrency } from "@/utils";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  ExpiredPlan,
  ListData,
  MembershipPlanList,
  PaymentChecking,
  Typography,
} from "@/src/components";
import { Report } from "notiflix";

const Membership = async () => {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  const threeDaysBeforeExpiration = moment().add(3, "days").startOf("day"); // Tanggal saat ini ditambah 3 hari dan diatur ke awal hari

  const isThreeDaysBeforeExpiration = endDate.isSameOrBefore(
    threeDaysBeforeExpiration,
    "day"
  );

  if (!profile.id_membership) {
    return <MembershipPlanList />;
  }

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi.verifikasi) {
    return <PaymentChecking />;
  }

  const canUpgrade = membership.klasifikasi !== "premium";

  const handleUpgrade = () => {
    Report.info(
      "Info",
      "Fitur ini sedang dalam pengembangan. <br/><br/> Mohon maaf ketidaknyamanan ini",
      "Okay"
    );
  };

  return (
    <div className="mt-2">
      <Typography variant="subtitle">Membership</Typography>
      {isThreeDaysBeforeExpiration && !isMembershipExpired && (
        <div className="text-center bg-indigo-600 dark:bg-indigo-800 rounded text-white my-2">
          <p>Pemberitahuan !</p>
          <p>
            Membership Anda akan berakhir. Perpanjangan dan pemberhentian dapat
            dilakukan saat membership telah berakhir.
          </p>
        </div>
      )}
      <Container otherClass="p-3">
        <div>
          <ListData label="Id membership" value={membership.id_membership} />
          <ListData label="Paket" value={membership.klasifikasi} />
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
      </Container>
      {canUpgrade && (
        <div onClick={handleUpgrade} className="mt-3">
          <Button variant="text">Upgrade ke Premium</Button>
        </div>
      )}
    </div>
  );
};

export default Membership;
