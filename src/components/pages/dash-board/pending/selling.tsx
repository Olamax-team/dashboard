import { apiRequestHandler } from "@/api/api-request-handler";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pendingTransactionDataResponse } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";

const Selling = ({visibleColumns}: {visibleColumns: Record<string, boolean>}) => {

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
                {visibleColumns.steem && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Coin Price($)
                  </TableHead>
                )}
                {visibleColumns.method && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Referred By
                  </TableHead>
                )}
                {visibleColumns.paymentStatus && (
                  <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                    Bonus
                  </TableHead>
                )}
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
                {visibleColumns.referrer && (
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
                )}
                {visibleColumns.finish && (
                  <TableHead className="text-center font-bold text-[#121826] border-gray-300">
                    Finish
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
  
            <TableBody>
              {pendingSelling && pendingSelling.length > 0 && pendingSelling.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="odd:bg-[#f3f3f3] even:bg-[#e0e0e0] hover:bg-[#d1d1d1] border border-gray-300"
                >
                  {visibleColumns.user && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      <div>{transaction.user.first_name} {transaction.user.last_name}</div>
                      <div className="text-xs text-[#121826]">
                        UID {transaction.user.uid}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.coin && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      <div>{transaction.coin}</div>
                      <div className="text-xs text-[#121826]">
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
                      {transaction.naira_value}
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
                      {transaction.selling.currency}
                    </TableCell>
                  )}
                  {visibleColumns.referrer && (
                    <TableCell className="py-2 text-center border-r border-gray-300">
                      {transaction.referer}
                    </TableCell>
                  )}
                  {visibleColumns.Timestamp && (
                    <TableCell className="py-2 text-center border-gray-300">
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

export default Selling;
