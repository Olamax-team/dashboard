import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { coinProps } from "@/lib/types";
import MOQTransactions from "./MOQTransactions";
import DashboardLayout from "@/layout/dash-board-layout";
import PageHeader from "../escrow/pageHeader";
import Tab from "./Tab";
import OrderQuantity from "./orderQuantity";

const MOQTransactionsContainer = () => {
  const allCoinConfig = useApiConfigWithToken({
    method: "get",
    url: "all-coins/buy",
  });

  const fetchAllCoins = () => axios.request(allCoinConfig);

  // React Query to fetch coin data
  const { data, status } = useQuery({
    queryKey: ["all-coins"],
    queryFn: () => apiRequestHandler(fetchAllCoins),
    refetchInterval: 1000
  });

  const allCoin = data?.data.coin as coinProps[];

  return (
        <DashboardLayout>
            <section className="w-full h-full mx-auto font-Inter text-[#121826] overflow-hidden">
                <PageHeader title="Transaction Settings" />
                <div className="flex items-center lg:gap-5 gap-2 justify-center px-4 py-2 md:px-10 md:py-4 w-fit lg:mt-3">
                    <Tab label={"Rates"} to={"/dashboard/transaction-settings/rate"} isActive={location.pathname === "/dashboard/transaction-settings/rate"}/>
                    <Tab label={"Available Coins"} to={"/dashboard/transaction-settings/available-coins"} isActive={location.pathname === "/dashboard/transaction-settings/available-coins"}/>
                    <Tab label={"Minimum Order Quantity"} to={"/dashboard/transaction-settings/moq"} isActive={location.pathname === "/dashboard/transaction-settings/moq"}/>
                    <Tab label={"Bonuses & Referral"} to={"/dashboard/transaction-settings/referral"} isActive={location.pathname === "/dashboard/transaction-settings/referral"}/>
                    <Tab label={"Charges"} to={"/dashboard/transaction-settings/charges"} isActive={location.pathname === "/dashboard/transaction-settings/charges"}/>
                </div>
            <OrderQuantity status={status as "pending" | "error" | "success"} allCoin={allCoin} />;
            <MOQTransactions status={status as "pending" | "error" | "success"} allCoin={allCoin} />;
            </section>
        </DashboardLayout>
  ) 
};

export default MOQTransactionsContainer;