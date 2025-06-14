import { apiRequestHandler } from "@/api/api-request-handler";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pendingTransactionDataResponse } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { extractFirstName } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Buying = ({ visibleColumns }: { visibleColumns: Record<string, boolean>}) => {

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
    queryKey: ['pending-buying'],
    queryFn: () => apiRequestHandler(fetchPending)
  });

  const fullData = data?.data as pendingTransactionDataResponse
  const pendingBuying = fullData?.data.buyings;

  if (status === 'error') {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        An error occured while loading transactions
      </div>
    )
  };

  if (status === 'success' && pendingBuying && pendingBuying.length < 1) {
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

  if (status === 'success' && pendingBuying && pendingBuying.length > 0) {
    return (
      <div className=" mx-auto px-3 py-2">
        <Table className="border-collapse   border-2 ">
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
              {visibleColumns.blockchain && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Blockchain
                </TableHead>
              )}
              {visibleColumns.amount && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Amount
                </TableHead>
              )}
              {visibleColumns.coinPriceUsd && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Coin Price (USD)
                </TableHead>
              )}
              {visibleColumns.dollarRate && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Dollar Rate
                </TableHead>
              )}
              {visibleColumns.networkFees && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Network Fees ($)
                </TableHead>
              )}
              {visibleColumns.nairaAmount && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Naira Amount + N/Fees
                </TableHead>
              )}
              {visibleColumns.networkFeesRepeat && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Network Fees ($)
                </TableHead>
              )}
              {visibleColumns.walletAddress && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Wallet Address
                </TableHead>
              )}
              {visibleColumns.method && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Method
                </TableHead>
              )}
              {visibleColumns.paymentStatus && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Payment Status
                </TableHead>
              )}
              {visibleColumns.referrer && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Referrer
                </TableHead>
              )}
              {visibleColumns.Timestamp && (
                <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                  Time Stamp
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {pendingBuying && pendingBuying.length > 0 && pendingBuying.map((transaction, index) => (
              <TableRow
                key={index}
                className="odd:bg-[#f3f3f3] even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] border border-gray-300"
              >
                {visibleColumns.user && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <div>{extractFirstName(transaction.user.first_name)} {extractFirstName(transaction.user.last_name)}</div>
                    <div className="text-xs text-[#121826]">
                      UID {transaction.user.uid}
                    </div>
                  </TableCell>
                )}
                {visibleColumns.coin && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <div>{transaction.coin.coin}</div>
                    <div className="text-xs text-[#121826]">
                      {transaction.coin.coin_name}
                    </div>
                  </TableCell>
                )}
                {visibleColumns.blockchain && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.blockchain.blockchain_name}
                  </TableCell>
                )}
                {visibleColumns.amount && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.amount}
                  </TableCell>
                )}
                {visibleColumns.coinPriceUsd && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.coin_price}
                  </TableCell>
                )}
                {visibleColumns.dollarRate && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.dollar_rate}
                  </TableCell>
                )}
                {visibleColumns.networkFees && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.network_fees_dollar}
                  </TableCell>
                )}
                {visibleColumns.nairaAmount && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.total_naira_plus_fees}
                  </TableCell>
                )}
                {visibleColumns.networkFeesRepeat && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.network_fees_dollar}
                  </TableCell>
                )}
                { visibleColumns.walletAddress && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.wallet_address}
                  </TableCell>
                )}
                { visibleColumns.method && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.method}
                  </TableCell>
                )}
                { visibleColumns.paymentStatus && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <span
                      className={`px-2 py-1 rounded-sm text-xs font-medium ${
                        transaction.payment_status === "pending"
                          ? "text-red-700"
                          : transaction.payment_status === "Successful"
                          ? "text-green-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {transaction.payment_status}
                    </span>
                  </TableCell>
                )}
                {visibleColumns.referrer && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.referer}
                  </TableCell>
                )}
                {visibleColumns.Timestamp && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {formatTimestamp(transaction.created_at)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

};

export default Buying;
