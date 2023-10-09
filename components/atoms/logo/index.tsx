import { FaMountainSun } from "react-icons/fa6";

export default function Logo(props: {
  size: "text-base" | "text-xl" | "text-2xl";
}) {
  return (
    <span
      className={`flex items-center divide-x-2 divide-transparent font-serif ${props.size} mx-1`}
    >
      <p>tokokera</p>
      <FaMountainSun className="text-indigo-600" />
      <p>ik.com</p>
    </span>
  );
}
