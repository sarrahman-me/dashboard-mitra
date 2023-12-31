import { BackIcon } from "../../atoms";

export default function HeaderAndBackIcon(props: { title: string }) {
  return (
    <div className="flex items-center m-2">
      <BackIcon />
      <h2 className="font-semibold underline">{props.title}</h2>
    </div>
  );
}
