import { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/dash-board-layout";
import PageHeader from "@/components/pages/dash-board/escrow/pageHeader";
import EscrowTable from "../escrow/escrowTable";

const dealsColumns = [
  "User (Seller)",
  "Coin",
  "Blockchain",
  "Amount",
  "Coin Price (USD)",
  "Dollar Rate",
  "Netw Fees ($)",
  "Naira Amount + N/Fees",
  "Netw Fees ($)",
];

const dealsRows: (string | number | [string, string])[][] = [
  [["Mason Mount", "UID 22110976"], ["BITCOIN", "BTC"], "TRON(TRC 20)", "-", "20,000.00", "19,800.00", "0.5", "-", "0.5"],
  [["John Doe", "UID 22110976"], ["BITCOIN", "BTC"], "TRON(TRC 20)", "-", "2,500.00", "2,400.00", "0.3", "-", "0.5"],
];

const withdrawColumns = [
  "User (Seller)",
  "Coin",
  "Blockchain",
  "Amount",
  "Coin Price (USD)",
  "Dollar Rate",
  "Netw Fees ($)",
  "Naira Amount + N/Fees",
  "Netw Fees ($)",
];

const withdrawRows: (string | number | [string, string])[][] = [
  [["Mason Mount", "UID 22110978"], ["BITCOIN", "BTC"], "TRON(TRC 20)", "-", "20,000.00", "19,800.00", "0.5", "-", "0.5"],
];

const Escrow = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "withdraw">("deals");

  const columns = activeTab === "deals" ? dealsColumns : withdrawColumns;
  const rows = activeTab === "deals" ? dealsRows : withdrawRows;

  return (
    <DashboardLayout>
      <section className="w-full h-full mx-auto">
        <PageHeader title="Escrow Deals" />
        <div className="w-full h-full px-4 py-2 md:px-10 md:py-4 bg-[#F8F9FA] space-y-16 md:space-y-0">
          {/* Tabs */}
          <div className="flex flex-row flex-wrap justify-between items-center w-full h-[48px] space-y-2 md:space-y-0">
            <div className="flex gap-9 bg-white px-2 py-1 w-fit rounded-sm items-center">
              <Button
                className={`px-4 py-2 w-[96px] h-[40px] rounded-sm shadow-none hover:bg-secondary ${
                  activeTab === "deals" ? "bg-primary text-white" : "bg-white text-black"
                }`}
                onClick={() => setActiveTab("deals")}
              >
                Deals
              </Button>
              <Button
                className={`py-2 w-[150px] h-[40px] rounded-sm relative shadow-none hover:bg-secondary ${
                  activeTab === "withdraw" ? "bg-primary text-white" : "bg-white text-black"
                }`}
                onClick={() => setActiveTab("withdraw")}
              >
                Withdraw Request
                <span className="absolute top-0 right-0 text-xs bg-primary text-white w-4 h-4 flex items-center justify-center rounded-full">
                  1
                </span>
              </Button>
            </div>
            <div className="flex justify-center items-center space-x-6 py-1">
              <span className="text-black">Sort by descending</span>
              <div className="flex items-center justify-center space-x-6">
                <button className="cursor-pointer text-black">Filter</button>
                <Button className="cursor-pointer rounded-sm bg-primary hover:bg-secondary text-white w-[96px] h-[40px]">
                  Export
                </Button>
              </div>
            </div>
          </div>
          {/* Table */}
          <div>
            <EscrowTable columns={columns} rows={rows} />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Escrow;
