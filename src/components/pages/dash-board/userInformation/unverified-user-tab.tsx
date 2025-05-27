import React, { useState } from "react";
import { HiFilter, HiOutlineSortDescending, HiOutlineSortAscending, HiDownload } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Unverified from "./unverified-users";
import { useLocation, useNavigate } from "react-router-dom";


const UnVerifiedUserTab = () => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("descending");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [visibleFilter, setVisibleFilter] = useState({
    user: true,
    email: true,
    phoneNumber: true,
    referralCode: true,
    verificationmethod: true,
    Status: true,
    referrerBonus: true,
    action: true,
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

  return (
    <React.Fragment>
      <div className="flex items-center justify-between  h-auto  mb-5 w-full flex-wrap">
        <div className="flex items-center justify-center xl:mt-0 gap-1">
          <Button
            onClick={() => navigate("/dashboard/user-information")}
            className={cn(
              "relative px-4 py-2 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
              pathname === "/dashboard/user-information"
                ? "bg-[#039AE4] text-white"
                : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-200"
            )}
          >
            Verified
          </Button>
          <Button
            onClick={() => navigate("/dashboard/user-information/unverified")}
            className={cn(
              "relative px-4 py-2 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
              pathname === "/dashboard/user-information/unverified"
                ? "bg-[#039AE4] text-white"
                : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-200"
            )}
          >
            Unverified
          </Button>
          <Button
            onClick={() => navigate("/dashboard/user-information/pending")}
            className={cn(
              "relative px-4 py-2 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
              pathname === "/dashboard/user-information/pending"
                ? "bg-[#039AE4] text-white"
                : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-200"
            )}
          >
            Pending
          </Button>
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

            {sortOrder === "ascending" && (
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
        <Unverified visibleFilter={visibleFilter} />
    </React.Fragment>
  );
};

export default UnVerifiedUserTab;