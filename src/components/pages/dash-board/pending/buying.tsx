import { apiRequestHandler } from "@/api/api-request-handler";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pendingTransactionDataResponse } from "@/lib/types";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { extractFirstName } from "@/lib/utils";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

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
  const pendingPagination = fullData?.pagination.buyings

  console.log(pendingPagination);

  const { token } = useAdminDetails();

  const completeTransaction = async (refNumber:string) => {

    const formdata = {
      ref_number: refNumber
    };

    const validateConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/send-buy-transaction`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: formdata,
    };

    const validate = () => axios.request(validateConfig);
    const completeTransaction = await apiRequestHandler(validate)

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
              <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">
                Action
              </TableHead>
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
                        onClick={() => completeTransaction(transaction.ref_no)}
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
    );
  }

};

export default Buying;
