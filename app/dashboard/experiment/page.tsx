import { Heading } from "@/components/atoms";
import { SectionLayout } from "@/components/organisms";
import SearchByImage from "@/public/searchByImage.png";
import Image from "next/image";
import { AiOutlineFileImage } from "react-icons/ai";

export default function Experiment() {
  return (
    <div>
      <Heading>Experiment</Heading>
      <SectionLayout>
        <div>
          <h2 className="font-bold">customer-centric product development</h2>
          <p className="text-sm mt-2 text-gray-600">
            Saya memegang prinsip bahwa produk terbaik adalah produk yang
            dibangun bersama pelanggan. Konsep ini juga dikenal sebagai
            pengembangan produk berbasis pelanggan atau customer-centric product
            development.
          </p>
          <p className="text-sm mt-2 text-gray-600">
            Kamu adalah orang yang dipilih untuk menguji coba fitur ini dan
            memberikan umpan balik terhadap fitur yang sedang kami kembangkan
          </p>
        </div>
      </SectionLayout>
      <SectionLayout>
        <div>
          <span>
            Experiment 1:{" "}
            <p className="font-semibold">Pencarian keramik dengan gambar</p>
          </span>
          <div className="flex justify-center items-center">
            <Image
              src={SearchByImage}
              alt="pencarian dari gambar"
              className="max-w-xs"
            />
          </div>
          <div className="my-4 divide-y-8 divide-transparent">
            <p>
              Apakah kamu pernah pergi ke rumah kerabat mu dan melihat keramik
              yang menarik pandangan matamu tetapi sayangnya kamu tidak tahu
              dimana kamu menemukan keramik yang sama serupa.
            </p>
            <p>
              Dari permasalahan itu kami mencoba mengembangkan fitur ini,
              berikan saran dan masukan terbaik mu dari fitur ini untuk
              pengembangan yang lebih baik.
            </p>
          </div>
        </div>
      </SectionLayout>
      <div className="border p-10 border-dashed flex justify-center items-start bg-gray-100 text-gray-500">
        <div>
          <div className="flex justify-center text-3xl">
            <AiOutlineFileImage />
          </div>
          <p className="text-center">klik untuk masukkan gambar</p>
        </div>
      </div>
    </div>
  );
}
