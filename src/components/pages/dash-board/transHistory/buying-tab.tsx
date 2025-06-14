import React, { useState } from "react";
import { HiFilter, HiOutlineSortDescending, HiOutlineSortAscending, HiDownload } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BuyingHistory from "./buyingHistory";
import { useLocation, useNavigate } from "react-router-dom";

const BuyingTab = () => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("descending");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [visibleFilter, setVisibleFilter] = useState({
    user: true,
    coin: true,
    blockchain: true,
    amount: true,
    nairaEquivalent: true,
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
    phone: true,
    transactionStatus: true,
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
    setVisibleFilter((prev) => ({
      ...prev,
      [column as keyof typeof visibleFilter]:
        !prev[column as keyof typeof visibleFilter],
    }));
  };

  // const renderComponent = () => {
  //   switch (activeTab) {
  //     case "buying":
  //       return <BuyingHistory visibleFilter={visibleFilter} />;
  //     case "selling":
  //       return <SellingHistory visibleFilter={visibleFilter} />;
  //     case "top-up":
  //       return <TopUpHistory />;
  //     case "bills":
  //       return <BillHistory />;
  //     default:
  //       return <div>Default Content</div>;
  //   }
  // };


    const { pathname } = useLocation();
    const navigate = useNavigate();
  
    const NavButton = ({path, label}:{path:string, label:string}) => {
  
      return (
        <Button onClick={() => navigate(path)}
            className={cn(
              "relative px-6 py-4 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer", pathname === path
                ? "bg-[#039AE4] text-white"
                : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-100 border"
            )}
          >
            {label}
        </Button>
      )
    };

  return (
    <React.Fragment>
      <div className="flex items-center justify-between h-auto mb-5 w-full flex-wrap">
        <div className="flex items-center lg:gap-5  gap-2 justify-center px-5 py-1 w-fit lg:mt-3  lg:px-0  lg:py-0 ">
          <NavButton path="/dashboard/transaction-history" label="Buying" />
          <NavButton path="/dashboard/transaction-history/selling" label="Selling" />
          <NavButton path="/dashboard/transaction-history/top-up" label="Top Up"/>
          <NavButton path="/dashboard/transaction-history/bills" label="Bills" />
        </div>
        <div className="flex items-center justify-center ml-3 lg:ml-0 mt-5 lg:mt-0 gap-5">
          <div className="text-[#000000] gap-2 flex items-center">
            {sortOrder === "descending" && (
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={toggleSortOrder}
              >
                <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
                  Sort By Descending
                </h2>
                <HiOutlineSortDescending className="size-6" />
              </div>
            )}

            { sortOrder === "ascending" && (
              <div
                className="flex items-center gap-2 justify-center cursor-pointer"
                onClick={toggleSortOrder}
              >
                <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
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
                {Object.keys(visibleFilter).map((column) => (
                  <div key={column} className="flex items-center">
                    <input
                      type="checkbox"
                      id={column}
                      checked={
                        visibleFilter[column as keyof typeof visibleFilter]
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
      <div>
        <BuyingHistory visibleFilter={visibleFilter} />;
      </div>
    </React.Fragment>
  );
};

export default BuyingTab;