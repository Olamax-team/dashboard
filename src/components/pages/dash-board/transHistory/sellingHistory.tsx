import { apiRequestHandler } from "@/api/api-request-handler";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AllTransactionsData } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { extractFirstName } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";

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
    queryFn: () => apiRequestHandler(sellTransaction)
  });

    const allTransaction = data?.data.data as AllTransactionsData;
    const transaction = allTransaction?.sell_transactions;

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
                  {visibleFilter.coinPriceUsd && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Naira Equivalent (NGN)
                    </TableHead>
                  )}
                  {visibleFilter.dollarRate && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Dollar Rate
                    </TableHead>
                  )}
                  {visibleFilter.networkFees && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Coin Price ($)
                    </TableHead>
                  )}
                  {visibleFilter.nairaAmount && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Bonus
                    </TableHead>
                  )}
                  {visibleFilter.networkFeesRepeat && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Payment Method
                    </TableHead>
                  )}
                  {visibleFilter.walletAddress && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Payment Details
                    </TableHead>
                  )}
                  {visibleFilter.steem && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Payment Status
                    </TableHead>
                  )}
                  {visibleFilter.method && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Transaction Status
                    </TableHead>
                  )}
                  {visibleFilter.paymentStatus && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Amount Sent(COIN)
                    </TableHead>
                  )}
                  {visibleFilter.referrer && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Naira Equivalent (NGN)
                    </TableHead>
                  )}
                  {visibleFilter.Timestamp && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Referrer
                    </TableHead>
                  )}
                  {visibleFilter.finish && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Check Balance
                    </TableHead>
                  )}
                  {visibleFilter.finish && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Phone No
                    </TableHead>
                  )}
                  {visibleFilter.Timestamp && (
                    <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                      Time Stamp
                    </TableHead>
                  )}
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
                    {visibleFilter.coinPriceUsd && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.dollarRate && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.networkFees && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.nairaAmount && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.networkFeesRepeat && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.selling.currency}
                      </TableCell>
                    )}
                    {visibleFilter.walletAddress && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.sell_details.account_name}
                      </TableCell>
                    )}
                    {visibleFilter.steem && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        <span
                          className={`px-2 py-1 rounded-sm text-xs font-medium ${
                            transaction.status === "pending"
                              ? " text-red-700"
                              : transaction.status === "Successful"
                              ? " text-green-700"
                              : " text-yellow-700"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    )}
                    {visibleFilter.method && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.status}
                      </TableCell>
                    )}
                    {visibleFilter.paymentStatus && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.amount_sent}
                      </TableCell>
                    )}
                    {visibleFilter.referrer && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.naira_value}
                      </TableCell>
                    )}
                    {visibleFilter.referrer && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.referer}
                      </TableCell>
                    )}
                    {visibleFilter.finish && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.sell_details.account_name}
                      </TableCell>
                    )}
                    {visibleFilter.finish && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {transaction.user.phone}
                      </TableCell>
                    )}
                    {visibleFilter.Timestamp && (
                      <TableCell className="py-2 text-center border-r border-gray-300">
                        {formatTimestamp(transaction.created_at)}
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

export default SellingHistory;
