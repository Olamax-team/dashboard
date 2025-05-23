import React, { useState } from "react";
import {
  HiFilter,
  HiOutlineSortDescending,
  HiOutlineSortAscending,
  HiDownload,
} from "react-icons/hi";
import Buying from "./buying";
import Selling from "./selling";
import TopUp from "./topUp";
import Bills from "./bills";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PendingButton = () => {
  const [activeTab, setActiveTab] = useState("buying");
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

  const tabs = [
    { id: "buying", label: "Buying", count: 0 },
    { id: "selling", label: "Selling", count: 4 },
    { id: "top-up", label: "Top-Up", count: 2 },
    { id: "bills", label: "Bills", count: 2 },
  ];

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

  const renderComponent = () => {
    switch (activeTab) {
      case "buying":
        return <Buying visibleColumns={visibleColumns} />;
      case "selling":
        return <Selling visibleColumns={visibleColumns} />;
      case "top-up":
        return <TopUp />;
      case "bills":
        return <Bills />;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-between font-Inter flex-wrap space-y-4   bg-white">
        <div className="flex items-center lg:gap-5  gap-2 justify-center bg-white px-5 py-1 w-fit lg:mt-3  lg:px-0  lg:py-0 ">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-6 py-4 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
                activeTab === tab.id
                  ? "bg-[#039AE4] text-white"
                  : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-100"
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#039AE4] rounded-full">
                  {tab.count}
                </span>
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center lg:px-0  lg:py-0 px-5 py-1 w-fit bg-white  ">
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
      <div>{renderComponent()}</div>
    </React.Fragment>
  );
};

export default PendingButton;
