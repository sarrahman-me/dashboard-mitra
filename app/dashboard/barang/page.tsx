import { Heading } from "@/components/atoms";
import { CardProduct } from "@/components/molecules";
import { GetDataApi } from "@/utils";

const Barang = async () => {
  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/products/barang`
  );
  const responseProfile = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`
  );
  const profile = responseProfile.data;
  const barang = responseBarang.data;

  console.log(responseProfile)

  return (
    <div>
      <Heading>Barang</Heading>
      <p>{profile.slug}</p>
      {barang.map((item: any, i: any) => (
        <div key={i} className="flex flex-wrap">
          <CardProduct product={item} />
        </div>
      ))}
    </div>
  );
};

export default Barang;
