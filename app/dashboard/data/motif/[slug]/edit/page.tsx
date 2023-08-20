import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { FormEditData } from "@/layouts/template";

export default function EditMotif({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Motif",
      name: "nama_motif",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Motif" />
      <FormEditData
        submitEndpoint={`/products/motif/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
