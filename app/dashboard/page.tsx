import { GiHand } from "react-icons/gi";

export default function Dashboard() {
  return (
    <div>
      <p className="hidden md:inline-flex font-bold justify-center items-center">
        Hay !! Selamat datang di{" "}
        <span className="text-indigo-500 mx-2">sarrahman bangunan</span>{" "}
        <span>
          <GiHand />
        </span>{" "}
      </p>
      <p className="inline-flex md:hidden text-lg font-bold justify-center items-center">
        Hay !! Selamat datang{" "}
        <span>
          <GiHand />
        </span>{" "}
      </p>
    </div>
  );
}
