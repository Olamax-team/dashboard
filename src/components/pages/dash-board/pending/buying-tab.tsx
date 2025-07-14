import React, { useState } from "react";
import { HiFilter, HiOutlineSortDescending, HiOutlineSortAscending, HiDownload } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import Buying from "./buying";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { pendingTransactionDataResponse } from "@/lib/types";

const BuyingTab = () => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "descending"
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    user: true,
    coin: true,
    blockchain: true,
    amount: true,
    coinPriceUsd: true,
    dollarRate: true,
    networkFees: true,
    nairaAmount: true,
    networkFeesRepeat: true,
    walletAddress: true,
    steem: true,
    method: true,
    paymentStatus: true,
    referrer: true,
    Timestamp: true,
    finish: true,
  });

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column as keyof typeof visibleColumns]:
        !prev[column as keyof typeof visibleColumns],
    }));
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pendingConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/transactions/pending'
  });

  const fetchPending = () => axios.request(pendingConfig);

  const { data, status } = useQuery({
    queryKey: ['pending-selling'],
    queryFn: () => apiRequestHandler(fetchPending)
  });

  const fullData = data?.data as pendingTransactionDataResponse
  const counts = fullData?.counts

  const NavButton = ({path, label, count}:{path:string, label:string, count:number}) => {

    return (
      <Button onClick={() => navigate(path)}
          className={cn(
            "relative px-6 py-4 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
            pathname === path
              ? "bg-[#039AE4] text-white"
              : "bg-white text-[#121826] cursor-pointer hover:bg-gray-100 border "
          )}
        >
          {label}
          { status === 'success' && count > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#039AE4] rounded-full">
              {count}
            </span>
          )}
      </Button>
    )
  }

  return (
    <React.Fragment>
      <div className="flex justify-between font-Inter flex-wrap space-y-4">
        <div className="flex items-center lg:gap-5 gap-2 justify-center px-5 py-1 w-fit lg:mt-3  lg:px-0  lg:py-0 ">
          <NavButton path="/dashboard" label="Buying" count={counts?.buyings}/>
          <NavButton path="/dashboard/selling" label="Selling" count={counts?.sell_transactions}/>
          <NavButton path="/dashboard/top-up" label="Top Up" count={counts?.topUp}/>
          <NavButton path="/dashboard/bills" label="Bills" count={counts?.bills}/>
        </div>
        <div className="flex items-center justify-center lg:px-0  lg:py-0 px-5 py-1 w-fit ">
          <div className="text-[#000000] flex items-center ">
            {sortOrder === "descending" && (
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={toggleSortOrder}
              >
                <h2 className="font-normal text-[13px] xl:text-[16px] leading-[150%]">
                  Sort By Descending
                </h2>
                <HiOutlineSortDescending className="size-6" />
              </div>
            )}

            {sortOrder === "ascending" && (
              <div
                className="flex items-center gap-2 justify-center cursor-pointer"
                onClick={toggleSortOrder}
              >
                <h2 className="font-normal text-[13px] xl:text-[16px] leading-[150%]">
                  Sort By Ascending
                </h2>
                <HiOutlineSortAscending className="size-6" />
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className="flex items-center p-3 gap-1 cursor-pointer"
              onClick={toggleDropdown}
            >
              <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
                Filter
              </h2>
              <HiFilter className="size-6" />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2 z-50">
                <p className="text-sm font-semibold mb-2">Filter by:</p>
                {Object.keys(visibleColumns).map((column) => (
                  <div key={column} className="flex items-center">
                    <input
                      type="checkbox"
                      id={column}
                      checked={
                        visibleColumns[column as keyof typeof visibleColumns]
                      }
                      onChange={() => toggleColumnVisibility(column)}
                    />
                    <label htmlFor={column} className="ml-2">
                      {column}
                    </label>
                  </div>
                ))}
                <Button
                  className="w-full bg-primary text-white rounded px-4 py-2 mt-2"
                  onClick={() => setDropdownOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
          <Button className="bg-[#039AE4]  text-[#ffffff] w-[96px] leading-[150%]  gap-1 text-[12px] lg:text-[16px] h-[40px] rounded-[5px] px-4 py-2 items-center cursor-pointer flex">
            Export <HiDownload className="size-6 text-[#ffffff]" />
          </Button>
        </div>
      </div>
      <Buying visibleColumns={visibleColumns} />
    </React.Fragment>
  );
};

export default BuyingTab;


// import React from 'react'

// const BuyingTab = () => {
//   return (
//     <div>
//       {pathname === '/dashboard' && <Buying visibleColumns={visibleColumns} />}
//       {pathname === '/dashboard/selling' && <Selling visibleColumns={visibleColumns} />}
//       {pathname === '/dashboard/top-up' && <TopUp />}
//       {pathname === '/dashboard/bills' && <Bills/>}
//     </div>
//   )
// }

// export default BuyingTab