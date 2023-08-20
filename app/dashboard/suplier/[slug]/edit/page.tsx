import { FormEditData } from "@/layouts/template";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";

export default function EditSuplier({ params }: { params: { slug: string } }) {
  const form = [
    {
      type: "text",
      label: "Nama Perusahaan",
      name: "nama_perusahaan",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
    },
    {
      type: "number",
      label: "Whatsapp",
      name: "no_whatsapp",
    },
    {
      type: "text",
      label: "Kota",
      name: "kota",
    },
  ];

  return (
    <div>
      <HeaderAndBackIcon title="Edit Suplier" />
      <FormEditData
        submitEndpoint={`/suplier/pemasok/${params.slug}`}
        formInput={form}
      />
    </div>
  );
}
