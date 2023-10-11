"use client";
import { Report } from "notiflix";
import Button from "../button";

export default function TombolPesan() {
  const handlePesan = () => {
    Report.info(
      "Info",
      "Fitur ini sedang dalam pengembangan. <br/><br/> Mohon maaf ketidaknyamanan ini",
      "Okay"
    );
  };

  return (
    <div className="my-1">
      <Button onClick={handlePesan}>Pesan</Button>
    </div>
  );
}
