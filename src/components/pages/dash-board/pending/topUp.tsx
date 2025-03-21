import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HiEllipsisVertical } from "react-icons/hi2";
import React from "react";

interface SellingItem {
  id: number;
  user: {
    name: string;
    uid: string;
  };
  type: "Airtime" | "Data";
  network: string;
  amount: string;
  walletAddress: string | null;
  accountNumber: string | null;
  exchangeValue: number;
  status: "Successful" | "Failed" | "Pending";
  timestamp: string;
}

const TopUp = () => {
  const [completedMenu, setCompletedMenu] = React.useState('save');

  const transaction: SellingItem[] = [
    {
      id: 1,
      user: {
        name: "Mason Mount",
        uid: "22110976",
      },
      type: "Data",
      network: "MTN",
      amount: "0.0005 USDT",
      walletAddress: "33ggytreyyYYt6",
      accountNumber: "0022338833",
      exchangeValue: 1500,
      status: "Successful",
      timestamp: "2025-03-12T10:09:00Z",
    },
    {
      id: 2,
      user: {
        name: "Mason Mount",
        uid: "22110976",
      },
      type: "Data",
      network: "MTN",
      amount: "0.0005 USDT",
      walletAddress: "33ggytreyyYYt6",
      accountNumber: "0022338833",
      exchangeValue: 1500,
      status: "Successful",
      timestamp: "2025-03-12T10:09:00Z",
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };

  return (
    <React.Fragment>
      <div className="border-2 border-gray-300 m-5 p-5">
        <Table className="border-collapse">
          <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
            <TableRow className="bg-[#ffffff] hover:bg-white border-b-0 font-bold leading-[150%] text-[14px] text-[#121826]">
              <TableHead className="text-center font-bold text-[#121826]">User</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Type</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Network</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Amount</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Wallet Address</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Account Number</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Exchange Value</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Status</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Timestamp</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transaction.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="odd:bg-[#f2f2f2] even:bg-[#e0e0e0] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5"
              >
                <TableCell className="py-2 text-center text-[#121826]">
                  <div>
                    <div className="font-medium">{transaction.user.name}</div>
                    <div className="text-xs  text-[#121826]">UID {transaction.user.uid}</div>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{transaction.type}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{transaction.network}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{transaction.amount}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{transaction.walletAddress || "-"}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{transaction.accountNumber || "-"}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{transaction.exchangeValue.toLocaleString()}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">
                  <span
                    className={`px-3 py-2  text-xs font-medium ${
                      transaction.status === "Successful"
                        ? " text-green-700"
                        : transaction.status === "Failed"
                        ? " text-red-700"
                        : " text-yellow-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="py-2 text-center text-[#121826]">{formatTimestamp(transaction.timestamp)}</TableCell>
                <TableCell className="py-2 text-center text-[#121826]">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="outline-none">
                      <button
                        type="button"
                        className="flex items-center justify-center h-full w-full p-2 bg-transparent hover:bg-gray-100 rounded-md transition-all duration-200"
                      >
                        <HiEllipsisVertical className="text-[#121826] size-7" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="rounded-xl bg-white shadow-lg p-4 w-30 ring-1 ring-gray-200 transition-all duration-200 transform scale-95 hover:scale-100">
                      <DropdownMenuRadioGroup value={completedMenu} onValueChange={setCompletedMenu}>
                        <DropdownMenuRadioItem
                          value="save"
                          className="rounded-lg py-2 px-4 text-sm text-gray-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 transition-all duration-150"
                        >
                          Save
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="report"
                          className="rounded-lg py-2 px-4 text-sm text-gray-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 transition-all duration-150"
                        >
                          Report
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default TopUp;
