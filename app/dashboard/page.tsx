"use client";
import {
  Button,
  ExpiredPlan,
  NotMembership,
  PaymentChecking,
  PieChart,
  SwiperProduct,
  Table,
  Typography,
} from "@/src/components";
import { CiWarning } from "react-icons/ci";
import { GetDataApi } from "@/src/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaArrowDown, FaArrowUp, FaEye } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { PiArrowSquareUpRightLight } from "react-icons/pi";

export default function Dashboard() {
  const { profile, transaksi, membership, webstore } = useSelector(
    (state: any) => state.profile
  );
  const [barangTerbaru, setBarangBaru] = useState([] as any);
  const [productInsight, setProductInsight] = useState({
    total_product_view: "",
    top_product_view: [],
  } as {
    total_product_view: string;
    top_product_view: any[];
  });
  const [searchInsight, setSearchInsight] = useState({
    total_searches: "",
    top_search_query: [],
  } as {
    total_searches: string;
    top_search_query: any[];
  });
  const [oldProductInsight, setOldProductInsight] = useState({
    total_product_view: "",
    top_product_view: [],
  } as {
    total_product_view: string;
    top_product_view: any[];
  });
  const [oldsSarchInsight, setOldSearchInsight] = useState({
    total_searches: "",
    top_search_query: [],
  } as {
    total_searches: string;
    top_search_query: any[];
  });
  const [topBrand, setTopBrand] = useState({
    brands: [],
    views: [],
  } as {
    brands: string[];
    views: number[];
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (webstore?.domain) {
        const responseWebstoreProductInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-product-insight/${webstore.domain}`,
          3600
        );

        const responseWebstoreSearchInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-search-insight/${webstore.domain}`,
          3600
        );

        const responseBrandInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-brand-insight/${webstore.domain}`,
          3600
        );

        if (
          responseWebstoreProductInsight?.data[0]?.total_searches !==
            undefined ||
          responseWebstoreProductInsight?.data[0]?.total_searches !== null
        ) {
          const { total_searches, top_search_query } =
            responseWebstoreSearchInsight.data[0];

          const { total_product_view, top_product_view } =
            responseWebstoreProductInsight.data[0];

          const responseBrand = responseBrandInsight.data[0].top_brand_view;

          const brands = responseBrand.map((a: any) => a.brandName);
          const views = responseBrand.map((a: any) => a.views);

          setTopBrand({
            brands,
            views,
          });

          setSearchInsight({
            total_searches,
            top_search_query,
          });

          setProductInsight({
            top_product_view,
            total_product_view,
          });
        }

        if (
          responseWebstoreProductInsight?.data[1]?.total_searches !==
            undefined ||
          responseWebstoreProductInsight?.data[1]?.total_searches !== null
        ) {
          const { total_searches, top_search_query } =
            responseWebstoreSearchInsight.data[1];

          const { total_product_view, top_product_view } =
            responseWebstoreProductInsight.data[1];

          setOldSearchInsight({
            total_searches,
            top_search_query,
          });

          setOldProductInsight({
            top_product_view,
            total_product_view,
          });
        }
      }
    };
    fetchData();
  }, [webstore]);

  useEffect(() => {
    const fetchData = async () => {
      const responseBarangPromo = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?terbaru=true&limit=15`,
        3600
      );

      setBarangBaru(responseBarangPromo.data);
    };
    fetchData();
  }, []);

  const calculatePercentage = (current: number, last: number) => {
    const selisihNilai = current - last;
    const persentasePotongan = (selisihNilai / current) * 100;
    return persentasePotongan.toFixed(0);
  };

  if (!profile?.id_membership) {
    return <NotMembership />;
  }

  const endDate = moment(Number(membership?.endDate));
  const isMembershipExpired = endDate.isSameOrBefore(moment(), "day");

  if (isMembershipExpired) {
    return <ExpiredPlan id_membership={profile.id_membership} />;
  }

  if (!transaksi?.verifikasi) {
    return <PaymentChecking />;
  }

  return (
    <div>
      {!profile.kota && (
        <div className="my-3 p-2 flex items-center bg-orange-100 dark:bg-orange-900 border dark:border-none rounded shadow shadow-orange-300 dark:shadow-orange-700">
          <CiWarning className="" />
          <div className="ml-2 flex items-center space-x-1">
            <Typography>Lengkapi profile</Typography>
            <Button
              onClick={() => router.push("/dashboard/account")}
              size="small"
              variant="text"
            >
              Disini
            </Button>
          </div>
        </div>
      )}

      {profile?.id_webstore && (
        <div>
          {productInsight.total_product_view !== undefined && (
            <div>
              <p className="underline font-semibold m-2">
                Wawasan {webstore?.domain} hari kemarin{" "}
              </p>
              <div className="grid grid-cols-2 gap-2 md:gap-6">
                <InsightCard
                  data={productInsight.total_product_view}
                  percentase={
                    Number(
                      calculatePercentage(
                        Number(productInsight.total_product_view),
                        Number(oldProductInsight.total_product_view)
                      )
                    ) || 0
                  }
                  color={"violet"}
                  title={"Dilihat"}
                  icon={<FaEye />}
                />

                <InsightCard
                  data={searchInsight.total_searches}
                  title={"Pencarian"}
                  color={"amber"}
                  percentase={
                    Number(
                      calculatePercentage(
                        Number(searchInsight.total_searches),
                        Number(oldsSarchInsight.total_searches)
                      )
                    ) || 0
                  }
                  icon={<FaSearch />}
                />
              </div>

              <div className="my-3">
                <Typography>Produk Populer</Typography>
                <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-4">
                  <div className="md:w-2/3 w-full">
                    <Table
                      columns={[
                        {
                          label: "Nama Barang",
                          renderCell: async (item: any) => (
                            <p
                              className="underline cursor-pointer text-blue-500 flex items-center"
                              onClick={() =>
                                router.push(
                                  `https://www.tokokeramik.com/dashboard/barang/${item.id}`
                                )
                              }
                            >
                              {item.productName}
                              <PiArrowSquareUpRightLight className="ml-1" />
                            </p>
                          ),
                        },
                        {
                          label: "Brand",
                          renderCell: (item: any) => item.productBrand,
                        },
                        {
                          label: "Jumlah dilihat",
                          renderCell: (item: any) => item.views,
                        },
                      ]}
                      datas={productInsight.top_product_view}
                    />
                  </div>
                  <div className="md:w-1/3 w-full">
                    <PieChart
                      title={"Top Brands"}
                      labels={topBrand.brands}
                      data={topBrand.views}
                    />
                  </div>
                </div>
              </div>

              <div className="my-3">
                <Typography>Pencarian Populer</Typography>
                <Table
                  columns={[
                    {
                      label: "Kata kunci",
                      renderCell: (item: any) => item.query,
                    },
                    {
                      label: "Jumlah dicari",
                      renderCell: (item: any) => item.totalSearch,
                    },
                  ]}
                  datas={searchInsight.top_search_query}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* products terbaru */}
      <div className="my-2">
        <SwiperProduct title="Barang Terbaru" products={barangTerbaru} />
      </div>
    </div>
  );
}

const InsightCard = (props: {
  data: string;
  percentase?: number;
  title: string;
  color: "amber" | "emerald" | "sky" | "violet";
  icon: React.ReactNode;
}) => {
  const colorBg = {
    amber:
      "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-700 dark:to-amber-900",
    emerald:
      "bg-gradient-to-br from-emerald-300 to-emerald-500 dark:from-emerald-700 dark:to-emerald-900",
    sky: "bg-gradient-to-br from-sky-300 to-sky-500 dark:from-sky-700 dark:to-sky-900",
    violet:
      "bg-gradient-to-br from-violet-300 to-violet-500 dark:from-violet-700 dark:to-violet-900",
  };

  return (
    <div className={`p-3 rounded ${colorBg[props.color]}`}>
      <div className="flex justify-between">
        {props.icon}
        <Typography variant="subtitle">{props.data}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography variant="helper">{props.title}</Typography>
        {props.percentase && (
          <div className="flex items-center space-x-1">
            {props.percentase <= 0 ? (
              <FaArrowDown
                className={`text-xs ${
                  props.percentase <= 0 ? "text-red-500" : "text-green-500"
                }`}
              />
            ) : (
              <FaArrowUp
                className={`text-xs ${
                  props.percentase <= 0 ? "text-red-500" : "text-green-500"
                }`}
              />
            )}
            <Typography
              color={props.percentase <= 0 ? "danger" : "success"}
              variant="helper"
            >
              {props.percentase}%
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
