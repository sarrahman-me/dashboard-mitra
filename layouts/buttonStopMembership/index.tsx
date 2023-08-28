import { PostDataApi } from "@/utils";

export default function ButtonStopMembership(props: { id_membership: any }) {
  const berhentiMembership = async (id_membership: any) => {
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/membership/berhenti`,
      { id_membership }
    );
    console.log(response);
  };

  return (
    <div>
      <button
        className="bg-red-500 p-2 px-4 rounded"
        onClick={() => berhentiMembership(props.id_membership)}
      >
        Berhenti Berlangganan
      </button>
    </div>
  );
}
