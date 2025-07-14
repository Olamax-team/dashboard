import { apiRequestHandler } from "@/api/api-request-handler";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pendingTransactionDataResponse } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { cn } from "@/lib/utils";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { toast } from "sonner";

const Selling = ({visibleColumns}: {visibleColumns: Record<string, boolean>}) => {

  const { token } = useAdminDetails();

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
    queryKey: ['pending-selling'],
    queryFn: () => apiRequestHandler(fetchPending)
  });

  const fullData = data?.data as pendingTransactionDataResponse
  const pendingSelling = fullData?.data.sell_transactions;
  const pendingPagination = fullData?.pagination.sell_transactions

  console.log(pendingPagination);

  const revalidateTransaction = async (transactionId:number) => {

    const formdata = {
      transaction_id: transactionId
    };

    const finishConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/revalidate-transaction`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: formdata,
    };

    const finish = () => axios.request(finishConfig);
    const completeTransaction = await apiRequestHandler(finish)

    if (completeTransaction && completeTransaction.status === 200) {
      if (completeTransaction.data.status === 'pending') {
        toast.info(completeTransaction.data.message)
      } else if (completeTransaction.data.status === 'success') {
        toast.success(completeTransaction.data.message)
      } else {
        toast.warning(completeTransaction.data.message)
      }
    } else {
      console.log(completeTransaction);
      toast.error('Something went wrong try again later')
    }
  };

  if (status === 'error') {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        An error occured while loading transactions
      </div>
    )
  };

  if (status === 'success' && pendingSelling && pendingSelling.length < 1) {
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

  if (status === 'success' && pendingSelling && pendingSelling.length > 0) {
    return (
      <React.Fragment>
        <div className=" mx-auto px-3 py-2">
          <Table className="border-collapse  border-2">
            <TableHeader className="rounded-lg h-[60px] border border-gray-300">
              <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
                {visibleColumns.user && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    User
                  </TableHead>
                )}
                {visibleColumns.coin && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Coin
                  </TableHead>
                )}
                {visibleColumns.amount && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Amount Sent
                  </TableHead>
                )}
                {visibleColumns.coinPriceUsd && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Naira Equivalent(NGN)
                  </TableHead>
                )}
                {visibleColumns.dollarRate && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Amount Entered
                  </TableHead>
                )}
                {visibleColumns.networkFees && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Naira Amount
                  </TableHead>
                )}
                {visibleColumns.nairaAmount && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Paying In
                  </TableHead>
                )}
                {visibleColumns.networkFeesRepeat && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Details
                  </TableHead>
                )}
                {visibleColumns.walletAddress && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Dollar Rate
                  </TableHead>
                )}
                {/* {visibleColumns.steem && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Coin Price($)
                  </TableHead>
                )} */}
                {/* {visibleColumns.method && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Referred By
                  </TableHead>
                )}
                {visibleColumns.paymentStatus && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Bonus
                  </TableHead>
                )} */}
                {visibleColumns.referrer && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Status
                  </TableHead>
                )}
                {visibleColumns.Timestamp && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Time Stamp
                  </TableHead>
                )}
                {/* {visibleColumns.referrer && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Check Balance
                  </TableHead>
                )}
                {visibleColumns.referrer && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Confirmed
                  </TableHead>
                )}
                {visibleColumns.referrer && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Send Data/Card
                  </TableHead>
                )}
                {visibleColumns.referrer && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Send Bill Payment
                  </TableHead>
                )} */}
                {visibleColumns.finish && (
                  <TableHead className="text-center font-bold text-[#121826] border-gray-300">
                    Action
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
  
            <TableBody>
              { pendingSelling && pendingSelling.length > 0 && pendingSelling.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="odd:bg-[#f3f3f3] even:bg-[#e0e0e0] hover:bg-[#d1d1d1] border border-gray-300">
                  {visibleColumns.user && (
                    <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                      <div className="capitalize text-sm">{transaction.user.first_name} {transaction.user.last_name}</div>
                      <div className="text-xs text-[#121826] ">
                        UID {transaction.user.uid}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.coin && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      <div className="capitalize">{transaction.coin}</div>
                      <div className="text-xs text-[#121826] capitalize">
                        {transaction.coin}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.amount && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.amount_sent}
                    </TableCell>
                  )}
                  {visibleColumns.coinPriceUsd && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.naira_value}
                    </TableCell>
                  )}
                  {visibleColumns.dollarRate && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.amount_sent}
                    </TableCell>
                  )}
                  {visibleColumns.networkFees && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.naira_value}
                    </TableCell>
                  )}
                  {visibleColumns.nairaAmount && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.naira_value}
                    </TableCell>
                  )}
                  {visibleColumns.networkFeesRepeat && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.naira_value}
                    </TableCell>
                  )}
                  {visibleColumns.walletAddress && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.naira_value}
                    </TableCell>
                  )}
                  {visibleColumns.referrer && (
                    <TableCell className="py-2 text-center border-r border-gray-300 text-sm">
                      <span className={cn("capitalize", transaction.status === 'pending' ? 'text-orange-400' : transaction.status === 'success' ? 'text-green-600': 'text-gray-600')}>{transaction.status}</span>
                    </TableCell>
                  )}
                  {visibleColumns.Timestamp && (
                    <TableCell className="py-2 text-center border-gray-300 text-sm">
                      {formatTimestamp(transaction.created_at)}
                    </TableCell>
                  )}
                  {visibleColumns.finish && (
                    <TableCell className="text-center text-sm border-l border-gray-300 cursor-pointer text-blue-600">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="outline-none">
                        <button
                          type="button"
                          className="flex items-center justify-center h-full w-full p-2 hover:bg-gray-300 rounded-md transition-all duration-200"
                        >
                          <HiMiniEllipsisVertical className="text-[#121826] size-7" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="cursor-pointer rounded-xl bg-white shadow-lg p-2 w-[180px] ring-1 ring-gray-200 transition-all duration-200 transform scale-95 hover:scale-100">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => revalidateTransaction(transaction.sell_transaction_id)}
                            className="rounded-lg py-2 px-1 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                          >
                            <span className="text-sm">Revalidate</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
  }

};

export default Selling;
