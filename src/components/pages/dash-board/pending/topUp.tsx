import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HiEllipsisVertical } from "react-icons/hi2";
import React from "react";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { pendingTransactionDataResponse } from "@/lib/types";
import { Loader2 } from "lucide-react";

const TopUp = () => {
  const [completedMenu, setCompletedMenu] = React.useState("save");

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const pendingConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/transactions/pending'
  });

  const fetchPending = () => axios.request(pendingConfig);

  const { data, status } = useQuery({
    queryKey: ['pending-top-up'],
    queryFn: () => apiRequestHandler(fetchPending)
  });

  const fullData = data?.data as pendingTransactionDataResponse;
  console.log(fullData)
  const pendingTopUp = fullData?.data.topUp;

  if (status === 'error') {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        An error occured while loading transactions
      </div>
    )
  };

  if (status === 'success' && pendingTopUp && pendingTopUp.length < 1) {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        There is no pending transaction yet
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    )
  }

  if (status === 'success' && pendingTopUp && pendingTopUp.length > 0) {
    return (
      <React.Fragment>
        <div className="mx-auto px-3 py-2">
          <Table className="border-collapse border-2">
            <TableHeader className="rounded-lg h-[60px] border border-gray-300">
              <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  User
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Type
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Network
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Amount
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Wallet Address
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Account Number
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Exchange Value
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Status
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Timestamp
                </TableHead>
                <TableHead className="text-center font-bold text-[#121826] border-gray-300">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
  
            <TableBody>
              {pendingTopUp && pendingTopUp.length > 0 && pendingTopUp.map((transaction) => (
                <TableRow
                  key={transaction.bills_transaction_id}
                  className="odd:bg-[#f2f2f2] even:bg-[#e0e0e0] hover:bg-[#d1d1d1] border border-gray-300"
                >
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    <div>
                      <div className="font-medium">{transaction.user.first_name} {transaction.user.last_name}</div>
                      <div className="text-xs text-[#121826]">
                        UID {transaction.user.uid}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {transaction.type}
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {transaction.network}
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {transaction.amount_paid}
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {transaction.wallet_address || "-"}
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {transaction.bank || "-"}
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {transaction.exchange_value}
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    <span
                      className={`px-3 py-2 text-xs font-medium ${
                        transaction.status === "Successful"
                          ? "text-green-700"
                          : transaction.status === "Failed"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 text-center text-[#121826] border-r border-gray-300">
                    {formatTimestamp(transaction.created_at)}
                  </TableCell>
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
                        <DropdownMenuRadioGroup
                          value={completedMenu}
                          onValueChange={setCompletedMenu}
                        >
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
  }

};

export default TopUp;
