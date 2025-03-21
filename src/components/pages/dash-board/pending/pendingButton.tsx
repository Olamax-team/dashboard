import React, { useState } from "react";
import { HiFilter,  HiOutlineSortDescending, HiOutlineSortAscending, HiDownload } from "react-icons/hi";
import Buying from "./buying";
import Selling from "./selling";
import TopUp from "./topUp";
import Bills from "./bills";
import { cn } from "@/lib/utils";

const PendingButton = () => {
  const [activeTab, setActiveTab] = useState("buying");
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("descending");

  const tabs = [
    { id: "buying", label: "Buying", count: 0 },
    { id: "selling", label: "Selling", count: 4 },
    { id: "top-up", label: "Top-Up", count: 2 },
    { id: "bills", label: "Bills", count: 2 },
  ];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "buying":
        return <Buying />;
      case "selling":
        return <Selling />;
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
      <div className="flex items-center justify-between mt-10 h-auto p-5  w-full flex-wrap ">

      <div className="flex items-center justify-center xl:mt-0  gap-5 lg:gap-0 ">
       
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                " relative px-4 py-2 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer ",
                activeTab === tab.id ? "bg-[#039AE4] text-white" : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-100"
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#039AE4] rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
      </div>

      <div className="flex items-center  justify-between ml-3 lg:ml-0 mt-5 lg:mt-0  gap-5">
        <div className="text-[#000000] gap-2 flex items-center">
          {sortOrder === "descending" && (
            <div
              className="flex  items-center  justify-center cursor-pointer"
              onClick={toggleSortOrder}
            >
              <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">Sort By Descending</h2>
              <HiOutlineSortDescending className="size-6" />
            </div>
          )}

          {sortOrder === "ascending" && (
            <div
              className="flex  items-center gap-2 justify-center cursor-pointer"
              onClick={toggleSortOrder}
            >
              <h2 className="font-normal text-[12px] xl:text-[16px]  leading-[150%]">Sort By Ascending</h2>
              <HiOutlineSortAscending className="size-6" />
            </div>
          )}
        </div>

        <div className="flex items-center  gap-1">
          <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">Filter</h2>
          <HiFilter className="size-6" />
        </div>

        <button className="bg-[#039AE4] gap-2 text-[#ffffff] w-[96px]   leading-[150%] text-[14px] xl:text-[16px] h-[40px] rounded-[5px] px-4 py-2 items-center cursor-pointer flex">
          Export <HiDownload className="size-6 text-[#ffffff]" />
        </button>
        </div>
      </div> 

      <div>{renderComponent()}</div>
    </React.Fragment>
  );
};

export default PendingButton;
