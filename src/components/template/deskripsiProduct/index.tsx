import { IconSelect } from "@/components/molecules";
import { Container } from "../../atoms";

interface DeskripsiProdukProps {
  barang: {
    ukuran: string;
    kualitas: string;
    motif: string;
    tekstur: string;
    penggunaan_umum: string[];
    area_penggunaan: string[];
  };
}

const DeskripsiProduk = ({ barang }: DeskripsiProdukProps) => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row ml-2">
        <div className="text-sm md:text-base divide-y-8 divide-transparent my-2 w-1/2">
          <span className="flex items-center">
            <p className="font-medium mr-2">Ukuran:</p> {barang.ukuran}
          </span>
          <span className="flex items-center">
            <p className="font-medium mr-2">Kualitas:</p> {barang.kualitas}
          </span>
          <span className="flex items-center">
            <p className="font-medium mr-2">Motif:</p> {barang.motif}
          </span>
          <span className="flex items-center">
            <p className="font-medium mr-2">Tekstur:</p> {barang.tekstur}
          </span>
        </div>
        <div className="w-1/2">
          <div className="my-2">
            <div className="my-2">
              <IconSelect options={barang.penggunaan_umum} />
            </div>
          </div>
          <div className="my-2">
            <div className="my-2">
              <IconSelect options={barang.area_penggunaan} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DeskripsiProduk;
