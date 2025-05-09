import React, { useState } from "react";
import {
  HiFilter,
  HiOutlineSortDescending,
  HiOutlineSortAscending,
} from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AddAdvert from "./addAdvert";
import EditAdvert from "./editAdvert";

type BlogPost = {
    id: number;
    title: string;
    date: string;
    author: string;
    thumbnail: string;
    link?: string;
  }
  

const TabAdvert = () => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "descending"
  );
  const [showAddAdvert, setShowAddAdvert] = useState(false);
  const [post, setPost] = useState<BlogPost>({
    id: Date.now(),
    title: '',
    thumbnail: '',
    author: '',
    date:'',
    link: '',
  });
  
  const handleAddNewClick = () => {
    setShowAddAdvert(true);
  };

  const handleSave = () => {
    console.log("Saving post...", post);
    // Add actual save logic here
    setShowAddAdvert(false); // hide the AddAdvert component after saving
  };

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

          {/* Filter */}
          <div className="flex items-center p-3 gap-1">
            <h2 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
              Filter
            </h2>
            <HiFilter className="size-6" />
          </div>

          {/* Add New Button */}
          <Button
            onClick={handleAddNewClick}
            className="bg-[#039AE4] text-[#ffffff] w-[96px] leading-[150%] gap-1 text-[12px] lg:text-[16px] h-[40px] rounded-[5px] px-4 py-2 items-center cursor-pointer flex"
          >
            AddNew
          </Button>
        </div>
      </div>

      {/* Conditional AddAdvert Component */}
      {showAddAdvert && (
        <AddAdvert
          setShowAddNews={setShowAddAdvert}
          post={post}
          handleSave={handleSave}
          setPost={setPost}
        />
      )}

      <div>
        <EditAdvert />
      </div>
    </React.Fragment>
  );
};

export default TabAdvert;
