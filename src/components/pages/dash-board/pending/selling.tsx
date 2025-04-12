import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

type SellingItem = {
  user: string;
  uid: string;
  coin: string;
  coinShort: string;
  AmountSent: string | null;
  amountEntered: number;
  nairaAmount: string;
  payingIn: string;
  checkBalance: string;
  nairaEquivalent: number;
  Details: string;
  dollarRate: string;
  coinPrice: string;
  Bonus: number;
  Status: string;
  referredBy: string;
  Timestamp: string;
  confirmed: string;
  sentDataCard: string;
  sendBillPayment: string;
  finish: string;
};

const Selling = ({ visibleColumns }: { visibleColumns: Record<string, boolean> }) => {
  const transaction: SellingItem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      coin: "BITCOIN",
      coinShort: "BTC",
      AmountSent: "-",
      amountEntered: 19800.0,
      nairaAmount: "-",
      payingIn: "-",
      Details: "-",
      nairaEquivalent: 20000,
      dollarRate: "-",
      coinPrice: "-",
      Bonus: 1000,
      Status: "-",
      referredBy: "Marcus Ademola",
      Timestamp: "2025-03-12T10:09:00Z",
      checkBalance: "-",
      confirmed: "-",
      sentDataCard: "-",
      sendBillPayment: "-",
      finish: "",
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <React.Fragment>
    <div className="lg:p-10 mx-auto px-3 py-2">
       <Table className="border-collapse  border-2">
          <TableHeader className="rounded-lg h-[60px] border border-gray-300">
            <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
              {visibleColumns.user && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">User</TableHead>}
              {visibleColumns.coin && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Coin</TableHead>}
              {visibleColumns.amount && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Amount Sent</TableHead>}
              {visibleColumns.coinPriceUsd && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Naira Equivalent(NGN)</TableHead>}
              {visibleColumns.dollarRate && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Amount Entered</TableHead>}
              {visibleColumns.networkFees && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Naira Amount</TableHead>}
              {visibleColumns.nairaAmount && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Paying In</TableHead>}
              {visibleColumns.networkFeesRepeat && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Details</TableHead>}
              {visibleColumns.walletAddress && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Dollar Rate</TableHead>}
              {visibleColumns.steem && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Coin Price($)</TableHead>}
              {visibleColumns.method && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Referred By</TableHead>}
              {visibleColumns.paymentStatus && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Bonus</TableHead>}
              {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Status</TableHead>}
              {visibleColumns.Timestamp && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Time Stamp</TableHead>}
              {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Check Balance</TableHead>}
              {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Confirmed</TableHead>}
              {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Send Data/Card</TableHead>}
              {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Send Bill Payment</TableHead>}
              {visibleColumns.finish && <TableHead className="text-center font-bold text-[#121826] border-gray-300">Finish</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {transaction.map((transaction, index) => (
              <TableRow key={index} className="odd:bg-[#f3f3f3] even:bg-[#e0e0e0] hover:bg-[#d1d1d1] border border-gray-300">
                {visibleColumns.user && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <div>{transaction.user}</div>
                    <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                  </TableCell>
                )}
                {visibleColumns.coin && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <div>{transaction.coin}</div>
                    <div className="text-xs text-[#121826]">{transaction.coinShort}</div>
                  </TableCell>
                )}
                {visibleColumns.amount && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.AmountSent}</TableCell>}
                {visibleColumns.coinPriceUsd && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.nairaEquivalent}</TableCell>}
                {visibleColumns.dollarRate && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.amountEntered}</TableCell>}
                {visibleColumns.networkFees && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.nairaAmount}</TableCell>}
                {visibleColumns.nairaAmount && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.payingIn}</TableCell>}
                {visibleColumns.networkFeesRepeat && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.Details}</TableCell>}
                {visibleColumns.walletAddress && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.dollarRate}</TableCell>}
                {visibleColumns.referrer && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.referredBy}</TableCell>}
                {visibleColumns.steem && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.Bonus}</TableCell>}
                {visibleColumns.Timestamp && <TableCell className="py-2 text-center border-gray-300">{formatTimestamp(transaction.Timestamp)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Selling;
