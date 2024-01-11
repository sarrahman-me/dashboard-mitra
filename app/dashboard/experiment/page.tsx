"use client";
import { Heading } from "@/components/atoms";
import {
  Container,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
  Typography,
} from "@/src/components";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Experiment() {
  const { profile, transaksi, membership } = useSelector(
    (state: any) => state.profile
  );

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      <Heading>Experiment</Heading>

      {/* pengantar */}
      <Container otherClass="p-2 my-1">
        <div className="space-y-2">
          <Typography variant="subtitle">
            customer-centric product development
          </Typography>
          <Typography>
            Saya memegang prinsip bahwa produk terbaik adalah produk yang
            dibangun bersama pelanggan. Konsep ini juga dikenal sebagai
            pengembangan produk berbasis pelanggan atau customer-centric product
            development.
          </Typography>
          <Typography>
            Kamu adalah orang yang dipilih untuk menguji coba fitur ini dan
            memberikan umpan balik terhadap fitur yang sedang kami kembangkan
          </Typography>
        </div>
      </Container>

      <p className="text-lg font-bold text-center">
        Kami belum melakukan experiment apapun
      </p>
    </div>
  );
}
