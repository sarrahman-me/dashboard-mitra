import moment from "moment";

// Fungsi untuk memformat waktu
const formatKeteranganWaktu = (time: any) => {
  const now = moment();
  const timeMoment = moment(time);

  if (now.isSameOrBefore(timeMoment)) {
    const diffInMinutes = timeMoment.diff(now, "minutes");

    if (diffInMinutes <= 1) {
      return "Baru saja";
    } else if (diffInMinutes < 60) {
      return `Dalam ${diffInMinutes} menit`;
    } else if (timeMoment.isSame(now, "day")) {
      return `Dalam ${timeMoment.format("HH:mm")}`;
    } else if (timeMoment.clone().subtract(1, "day").isSame(now, "day")) {
      return `Besok ${timeMoment.format("HH:mm")}`;
    } else if (timeMoment.isSame(now, "year")) {
      return timeMoment.format("DD MMMM [pukul] HH:mm");
    } else {
      return timeMoment.format("DD MMMM YYYY [pukul] HH:mm");
    }
  } else {
    const diffInMinutes = now.diff(timeMoment, "minutes");

    if (diffInMinutes < 1) {
      return "Baru saja";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (now.isSame(timeMoment, "day")) {
      return `Hari ini ${timeMoment.format("HH:mm")}`;
    } else if (now.clone().subtract(1, "day").isSame(timeMoment, "day")) {
      return `Kemarin ${timeMoment.format("HH:mm")}`;
    } else if (now.isSame(timeMoment, "year")) {
      return timeMoment.format("DD MMMM [pukul] HH:mm");
    } else {
      return timeMoment.format("DD MMMM YYYY [pukul] HH:mm");
    }
  }
};

export default formatKeteranganWaktu;
