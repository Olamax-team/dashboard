import React, { useState } from "react";
import { HiFilter, HiOutlineSortDescending, HiOutlineSortAscending, HiDownload } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EdithAnnouncement from "./edithAnnouncement";
import { Plus } from "lucide-react";
import CreateAnnouncement from "./createAnnouncement";

const TabAnnouncement = () => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("descending");

  const [showCreateAnnouncement, setShowCreateAnnouncement] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("published");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  return (
    <React.Fragment>
      <div className="flex items-center justify-between h-auto mb-5 w-full flex-wrap">
        <div className="flex items-center justify-center xl:mt-0 gap-5">
          <h1
            className={cn(
              "relative px-4 py-2 rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer",
              " text-[#121826]"
            )}
          >
            Upload & Edit Announcement        
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
            <h2 className="font-normal text-xs xl:text-base">
              Filter
            </h2>
            <HiFilter className="size-6" />
          </div>

          <Button className="bg-[#039AE4] text-[#ffffff] w-[96px] leading-[150%] gap-1 text-[12px] lg:text-[16px] h-[40px] rounded-[5px] px-4 py-2 items-center cursor-pointer flex">
            Export <HiDownload className="size-6 text-[#ffffff]" />
          </Button>
        </div>
        <div className="w-full h-8 lg:h-10 rounded mt-4 flex items-center lg:gap-12 gap-5">
          <button type="button" className=" text-sm cursor-pointer w-fit pl-3 px-4 lg:px-6 flex items-center gap-2 border-primary h-full rounded-md bg-primary text-white" onClick={()  => setShowCreateAnnouncement(true)}>
            <Plus className="size-5"/>
            <span className="hidden md:block text-sm">Create Announcement</span>
            <span className="md:hidden text-sm">Create</span>
          </button>
          <div className="flex items-center lg:gap-4 h-full gap-2">
            <button type="button" className={cn("text-sm cursor-pointer h-full px-4 lg:px-6 border rounded-md", {"bg-primary text-white": activeTab === 'published'})} onClick={() =>setActiveTab('published')}>
              Published
            </button>
            <button type="button" className={cn("text-sm cursor-pointer h-full px-4 lg:px-6 border rounded-md", {"bg-primary text-white": activeTab === 'draft'})} onClick={() =>setActiveTab('draft')}>
              Draft
            </button>
            <button type="button" className={cn("text-sm cursor-pointer h-full px-4 lg:px-6 border rounded-md", {"bg-primary text-white": activeTab === 'trash'})} onClick={() =>setActiveTab('trash')}>
              Trash
            </button>
          </div>
        </div>
      </div>
      {showCreateAnnouncement && <CreateAnnouncement setShowCreateAnouncement={setShowCreateAnnouncement} setActiveTab={setActiveTab}/>}
      <div>
        <EdithAnnouncement activeTab={activeTab} setActiveTab={setActiveTab}  />
      </div>
    </React.Fragment>
  );
};

export default TabAnnouncement;
