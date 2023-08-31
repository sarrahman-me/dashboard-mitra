import { Heading } from "@/components/atoms";
import { CardProduct } from "@/components/molecules";
import { GetDataApi } from "@/utils";

const Barang = async () => {
  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang`
  );
  const barang = responseBarang.data;
  return (
    <div>
      <Heading>Barang</Heading>
      {barang.map((item: any, i: any) => (
        <div key={i} className="flex flex-wrap">
          <CardProduct product={item} />
        </div>
      ))}
    </div>
  );
};

export default Barang;
