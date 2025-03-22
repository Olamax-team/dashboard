import { useState } from "react";
import { Button } from "@/components/ui/button";
import EscrowTable from "../escrow/escrowTable";
import { HiDownload, HiFilter, HiOutlineSortDescending } from "react-icons/hi";

interface TabSwitcherProps {
  tabs: {
    key: string;
    label: string;
    data: {
      columns: string[];
      rows: (string | number | [string, string])[][];
    };
    notificationCount?: number;
  }[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({});

  const activeData = tabs.find((tab) => tab.key === activeTab)?.data || {
    columns: [],
    rows: [],
  };

  // Initialize visibleColumns state with all columns checked by default
  useState(() => {
    if (Object.keys(visibleColumns).length === 0) {
      const initialVisibility = activeData.columns.reduce((acc, column) => {
        acc[column] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setVisibleColumns(initialVisibility);
    }
  });

  // Sort function (by "Amount")
  const amountIndex = activeData.columns.indexOf("Amount");
  const sortedRows = [...activeData.rows].sort((a, b) => {
    if (amountIndex === -1) return 0;
    const amountA = parseFloat(a[amountIndex] as string);
    const amountB = parseFloat(b[amountIndex] as string);
    return sortOrder === "desc" ? amountB - amountA : amountA - amountB;
  });

  // Filter visible columns
  const filteredColumns = activeData.columns.filter((col) => visibleColumns[col]);
  const filteredRows = sortedRows.map((row) => row.filter((_, i) => visibleColumns[activeData.columns[i]]));

  return (
    <div>
      <div className="flex justify-between">
        {/* Tab Buttons */}
        <div className="flex gap-9 bg-white px-2 py-1 w-fit rounded-sm items-center">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              className={`cursor-pointer px-4 py-2 w-[150px] h-[40px] rounded-sm shadow-none hover:bg-secondary hover:text-white ${
                activeTab === tab.key ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {tab.notificationCount && (
                <span className="absolute top-0 right-0 text-xs bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {tab.notificationCount}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Sort & Filter */}
        <div className="flex justify-center items-center space-x-6 py-1">
          {/* Sort Button */}
          <div
            className="cursor-pointer text-black flex items-center justify-center space-x-2"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            <h1 className="font-normal text-[12px] xl:text-[16px] leading-[150%]">
              Sort in {sortOrder === "desc" ? "descending order" : "ascending order"}
            </h1>
            <HiOutlineSortDescending className="size-5 my-auto" />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <span
              className="cursor-pointer text-black flex items-center justify-center space-x-2"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <button className="text-black">Filter</button>
              <HiFilter className="size-5" />
            </span>

            {/* Filter Dropdown */}
            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2 z-50">
                <p className="text-sm font-semibold mb-2">Filter by:</p>
                {activeData.columns.map((col) => (
                  <label key={col} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns[col] ?? true}
                      onChange={() => setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }))}
                    />
                    <span className="text-sm">{col}</span>
                  </label>
                ))}

                <button
                  className="w-full bg-primary text-white rounded px-4 py-2 mt-2"
                  onClick={() => setShowFilterMenu(false)}
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>

          {/* Export Button */}
          <Button className="cursor-pointer rounded-sm bg-primary hover:bg-secondary text-white w-[96px] h-[40px]">
            Export
            <HiDownload className="size-5 text-[#ffffff]" />
          </Button>
        </div>
      </div>

      {/* Table Display */}
      <div>
        <EscrowTable columns={filteredColumns} rows={filteredRows} />
      </div>
    </div>
  );
};

export default TabSwitcher;
