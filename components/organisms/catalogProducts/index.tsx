"use client";
import { CardProduct } from "@/components/molecules";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";

export default function CatalogProducts(props: {
  atribut?: string;
  path?: string;
}) {
  const [barang, setBarang] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [metadata, setMetadata] = useState({} as any);

  const path = props.path || "products/barang";

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/${path}?${
          props.atribut || ""
        }&limit=25&page=${currentPage}`
      );
      setBarang(response.data);
      setMetadata(response.metadata);
    }
    fetchData();
  }, [currentPage, props.atribut, path]);

  const handleNextPage = () => {
    if (currentPage < metadata?.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {barang.map((item: any, i: any) => (
            <div key={i}>
              <CardProduct product={item} />
            </div>
          ))}
        </div>
      </div>
      {barang.length > 0 ? (
        <div className="flex justify-between items-center p-2">
          <div>
            <p className="text-xs md:text-sm text-gray-500">
              {metadata.totalData > 0
                ? `${Math.min(
                    (currentPage - 1) * metadata.limit + 1,
                    metadata.totalData
                  )} - ${Math.min(
                    currentPage * metadata.limit,
                    metadata.totalData
                  )} dari ${metadata.totalData}`
                : "Tidak ada barang yang tersedia"}
            </p>
          </div>
          <div className="flex justify-around items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-4xl text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed mr-5"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === metadata?.totalPages}
              className="text-4xl text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
}
