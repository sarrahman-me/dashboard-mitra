"use client";
import { FcExpired } from "react-icons/fc";
import { Button, Container, Typography } from "../../atoms";

export default function ExpiredPlan() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Container otherClass="p-8">
        <Typography align="center" variant="h4">
          Langganan Berakhir
        </Typography>
        <div className="flex justify-center">
          <FcExpired className="text-9xl" />
        </div>
        <div className="flex mt-5 justify-around">
          <Button
            variant="outlined"
            color="red"
            onClick={() => console.log("berhenti")}
          >
            Berhenti
          </Button>
          <Button onClick={() => console.log("perpanjang")}>Perpanjang</Button>
        </div>
      </Container>
    </div>
  );
}
