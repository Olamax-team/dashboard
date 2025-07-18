import { apiRequestHandler } from "@/api/api-request-handler";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AllTransactionsData } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { cn, extractFirstName } from "@/lib/utils";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

const SellingHistory = ({visibleFilter}: {visibleFilter: Record<string, boolean>}) => {

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const sellTransactionConfig = useApiConfigWithToken({
    method: 'get',
    url: 'admin/all-transactions'
  });

  const sellTransaction = () => axios.request(sellTransactionConfig);

  const {data, status } = useQuery({
    queryKey: ['sell-transactions'],
    queryFn: () => apiRequestHandler(sellTransaction),
    refetchInterval: 5000,
  });

    const allTransaction = data?.data.data as AllTransactionsData;
    const transaction = allTransaction?.sell_transactions;

    const { token } = useAdminDetails();

    const finishTransaction = async (transactionId:number) => {
  
      const formdata = {
        transaction_id: transactionId
      };
  
      const finishConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.olamax.io/api/admin/complete-selling-transaction`,
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: formdata,
      };
  
      const finish = () => axios.request(finishConfig);
      const completeTransaction = await apiRequestHandler(finish)
  
      console.log(completeTransaction)
  
      // if (completeTransaction && completeTransaction.status === 200) {
      //   if (completeTransaction.data.status === 'pending') {
      //     toast.info(completeTransaction.data.message)
      //   } else if (completeTransaction.data.status === 'success') {
      //     toast.success(completeTransaction.data.message)
      //   } else {
      //     toast.warning(completeTransaction.data.message)
      //   }
      // } else {
      //   console.log(completeTransaction);
      //   toast.error('Something went wrong try again later')
      // }
    };

    if (status === 'error') {
      return (
        <div className="w-full h-[40vh] flex justify-center py-20">
          An error occured while loading transactions history
        </div>
      )
    };
  
    if (status === 'success' && transaction && transaction.length < 1) {
      return (
        <div className="w-full h-[40vh] flex justify-center py-20">
          There is no transaction history yet
        </div>
      )
    };
  
    if (status === 'pending') {
      return (
        <div className="w-full h-[40vh] flex items-center justify-center">
          <Loader2 className="animate-spin"/>
        </div>
      )
    };

    if (status === 'success' && transaction && transaction.length > 0) {
      return (
        <React.Fragment>
          <div className="border-2 border-gray-300 ">
            <Table className="border-collapse">
              <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b">
                <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
                  {visibleFilter.user && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      User
                    </TableHead>
                  )}
                  {visibleFilter.coin && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Coin
                    </TableHead>
                  )}
                  {visibleFilter.amount && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Amount Sent(COIN)
                    </TableHead>
                  )}
                  {visibleFilter.nairaAmount && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Naira Equivalent (NGN)
                    </TableHead>
                  )}
                  {visibleFilter.dollarRate && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Dollar Rate
                    </TableHead>
                  )}
                  {visibleFilter.coinPrice && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Coin Price ($)
                    </TableHead>
                  )}
                  {visibleFilter.bonus && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Bonus
                    </TableHead>
                  )}
                  {visibleFilter.walletAddress && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Wallet Address
                    </TableHead>
                  )}
                  {visibleFilter.transactionStatus && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Status
                    </TableHead>
                  )}
                  {visibleFilter.referrer && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Referrer
                    </TableHead>
                  )}
                  {visibleFilter.checkBalance && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Check Balance
                    </TableHead>
                  )}
                  {visibleFilter.phone && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Phone No
                    </TableHead>
                  )}
                  {visibleFilter.timeStamp && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Time Stamp
                    </TableHead>
                  )}
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Action
                    </TableHead>
                </TableRow>
              </TableHeader>
    
              <TableBody>
                {transaction.map((transaction, index) => (
                  <TableRow
                    key={index}
                    className={`odd:bg-[#f3f3f3] even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
                  >
                    {visibleFilter.user && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        <div className="capitalize">{extractFirstName(transaction.user.first_name)} {extractFirstName(transaction.user.last_name)}</div>
                        <div className="text-xs text-[#121826]">
                          UID {transaction.user.uid}
                        </div>
                      </TableCell>
                    )}
                    {visibleFilter.coin && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        <div>{transaction.coin}</div>
                        <div className="text-xs text-[#121826]">
                          {transaction.coin}
                        </div>
                      </TableCell>
                    )}
                    {visibleFilter.amount && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.amount_sent}
                      </TableCell>
                    )}
                    {visibleFilter.nairaAmount && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.dollarRate && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.coinPrice && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.bonus && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.walletAddress && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.sell_details.account_name}
                      </TableCell>
                    )}
                    {visibleFilter.transactionStatus && (
                      <TableHead className={cn("text-center font-bold text-[#121826] border-r border-gray-300", transaction.status === 'pending' ? 'text-yellow-500' : transaction.status === 'completed' ? 'text-green-500' : 'text-red-500')}>
                        {transaction.status}
                      </TableHead>
                    )}
                    {visibleFilter.referrer && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.checkBalance && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.amount_sent}
                      </TableCell>
                    )}
                    {visibleFilter.phone && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.amount_sent}
                      </TableCell>
                    )}
                    {visibleFilter.timeStamp && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {formatTimestamp(transaction.created_at)}
                      </TableCell>
                    )}
                    <TableCell>
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
                            onClick={() => finishTransaction(transaction.sell_transaction_id)}
                              className="rounded-lg py-2 px-1 text-sm pl-3 text-[#000000] hover:bg-blue-50 focus:ring-2 focus:ring-black transition-all duration-150"
                            >
                              <span className="text-sm">Complete transaction</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
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

export default SellingHistory;
