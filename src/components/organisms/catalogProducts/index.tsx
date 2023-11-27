"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardProduct } from "../../molecules";
import { IconButton, Typography } from "../../atoms";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { LoadingAnimation } from "../../template";
import { GetDataApi } from "@/src/utils";
import { Tb3DCubeSphereOff } from "react-icons/tb";

interface CatalogProductsProps {
  atribut?: string;
  path?: string;
  unPagination?: boolean;
  limit?: string;
}

export default function CatalogProducts({
  atribut,
  limit,
  unPagination,
  path,
}: CatalogProductsProps) {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page");
  const [barang, setBarang] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const [metadata, setMetadata] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const pathUrl = path || "products/barang";

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/${pathUrl}?${atribut || ""}&limit=${
          limit || "48"
        }&page=${currentPage}`,
        3600
      );
      setBarang(response.data);
      setMetadata(response.metadata);
      setLoading(false);
    }
    fetchData();
  }, [currentPage, atribut, pathUrl, limit]);

  const handleNextPage = () => {
    if (currentPage < metadata?.totalPages) {
      const nextPage = currentPage + 1;
      const pathname = window.location.pathname;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", nextPage.toString());
      router.push(`${pathname}?${queryParams.toString()}`);
      setCurrentPage(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const pathname = window.location.pathname;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", prevPage.toString());
      router.push(`${pathname}?${queryParams.toString()}`);
      setCurrentPage(prevPage);
    }
  };

  return (
    <div>
      <div className="p-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-y-4 gap-x-2">
          {loading ? (
            <LoadingAnimation />
          ) : barang.length > 0 ? (
            barang.map((item: any, i: any) => (
              <div key={i}>
                <CardProduct product={item} />
              </div>
            ))
          ) : (
            <div className="my-2">
              <div className="flex justify-center m-1">
                <Tb3DCubeSphereOff className="text-indigo-500 text-4xl md:text-5xl shadow shadow-indigo-300 p-1 border rounded-full" />
              </div>
              <Typography
                otherClass="my-2"
                color="secondary"
                variant="helper"
                align="center"
              >
                Tidak ada barang
              </Typography>
            </div>
          )}
        </div>
      </div>

      {!loading && !unPagination && barang.length > 0 ? (
        <div className="flex justify-between items-center p-2">
          {/* detail pagination */}

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

          {/* button pagination */}

          <div className="flex justify-around items-center space-x-5 md:space-x-10">
            <IconButton
              size="small"
              icon={<AiOutlineArrowLeft />}
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            />
            <IconButton
              size="small"
              icon={<AiOutlineArrowRight />}
              disabled={currentPage === metadata?.totalPages}
              onClick={handleNextPage}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
