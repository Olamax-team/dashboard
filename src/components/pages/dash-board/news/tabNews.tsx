import React, { useState } from "react";
import {
  HiFilter,
  HiOutlineSortDescending,
  HiOutlineSortAscending,
  HiDownload,
} from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ManageNews from "./manageNews";
import { Plus } from "lucide-react";
import CreateNews from "./createNews";

const TabNews = () => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "descending"
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const [showCreateNewNews, setShowCreateNews] = React.useState(false)

  return (
    <React.Fragment>
      <div className="flex items-center justify-between h-auto w-full flex-wrap">
        <div className="flex items-center justify-center xl:mt-0 gap-5">
          <h1
            className={cn(
              "relative px-4 py-2 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
              " text-[#121826]"
            )}
          >
            Manage News Media Content
          </h1>
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

          {/* Filter Icon and Label only */}
          <div className="flex items-center p-3 gap-1">
            <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
              Filter
            </h2>
            <HiFilter className="size-6" />
          </div>

          <Button className="bg-[#039AE4] text-[#ffffff] w-[96px] leading-[150%] gap-1 text-[12px] lg:text-[16px] h-[40px] rounded-[5px] px-4 py-2 items-center cursor-pointer flex">
            Export <HiDownload className="size-6 text-[#ffffff]" />
          </Button>
        </div>
        <div className="w-full h-10 rounded mt-4">
          <button type="button" className="cursor-pointer w-fit pl-3 px-6 flex items-center gap-2 border-primary h-full rounded bg-primary text-white" onClick={()  => setShowCreateNews(true)}>
            <Plus/>
            <span>Create New Post</span>
          </button>
        </div>
      </div>
      {showCreateNewNews && <CreateNews setShowCreateNews={setShowCreateNews}/>}
      <div className="w-full">
        <ManageNews />
      </div>
    </React.Fragment>
  );
};

export default TabNews;
