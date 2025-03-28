import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

type SellingItem = {
  user: string;
  uid: string;
  coin: string;
  coinShort: string;
  AmountSent: string;
  AmountSents: string;
  nairaAmount: string;
  paymentMethod: string;
  checkBalance: string;
  nairaEquivalent: number;
  Details: string;
  dollarRate: string;
  coinPrice: string;
  Bonus: number;
  paymentStatus: string;
  TransactionStatus: string;
  phone: string;
  referredBy: string;
  Timestamp: string;
};

const SellingHistory = ({ visibleFilter }: { visibleFilter: Record<string, boolean> }) => {
  const transaction: SellingItem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      coin: "BITCOIN",
      coinShort: "BTC",
      AmountSent: "-",
      AmountSents: "Olu Williams",
      phone: "-",
      nairaAmount: "-",
      paymentMethod: "-",
      Details: "-",
      nairaEquivalent: 20000,
      dollarRate: "-",
      coinPrice: "-",
      Bonus: 1000,
      TransactionStatus: "-",
      paymentStatus: "-",
      referredBy: "Marcus Ademola",
      Timestamp: "2025-03-12T10:09:00Z",
      checkBalance: "-",
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
              {visibleFilter.user && <TableHead className="text-center font-bold text-[#121826]">User</TableHead>}
              {visibleFilter.coin && <TableHead className="text-center font-bold text-[#121826]">Coin</TableHead>}
              {visibleFilter.amount && <TableHead className="text-center font-bold text-[#121826]">Amount Sent(COIN)</TableHead>}
              {visibleFilter.coinPriceUsd && <TableHead className="text-center font-bold text-[#121826]">Naira Equivalent (NGN)</TableHead>}
              {visibleFilter.dollarRate && <TableHead className="text-center font-bold text-[#121826]">Dollar Rate</TableHead>}
              {visibleFilter.networkFees && <TableHead className="text-center font-bold text-[#121826]">Coin Price ($)</TableHead>}
              {visibleFilter.nairaAmount && <TableHead className="text-center font-bold text-[#121826]">Bonus</TableHead>}
              {visibleFilter.networkFeesRepeat && <TableHead className="text-center font-bold text-[#121826]">Payment Method</TableHead>}
              {visibleFilter.walletAddress && <TableHead className="text-center font-bold text-[#121826]">Payment Details</TableHead>}
              {visibleFilter.steem && <TableHead className="text-center font-bold text-[#121826]">Payment Status</TableHead>}
              {visibleFilter.method && <TableHead className="text-center font-bold text-[#121826]">Transaction Status</TableHead>}
              {visibleFilter.paymentStatus && <TableHead className="text-center font-bold text-[#121826]">Amount Sent(COIN)</TableHead>}
              {visibleFilter.referrer && <TableHead className="text-center font-bold text-[#121826]">Naira Equivalent (NGN)</TableHead>}
              {visibleFilter.Timestamp && <TableHead className="text-center font-bold text-[#121826]">Referrer</TableHead>}
              {visibleFilter.finish && <TableHead className="text-center font-bold text-[#121826]">Check Balance</TableHead>}
              {visibleFilter.finish && <TableHead className="text-center font-bold text-[#121826]">Phone No</TableHead>}
              {visibleFilter.Timestamp && <TableHead className="text-center font-bold text-[#121826]">Time Stamp</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {transaction.map((transaction, index) => (
              <TableRow
                key={index}
                className={`odd:bg-[#f3f3f3] even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
              >
                {visibleFilter.user && (
                  <TableCell className="py-2 text-center">
                    <div>{transaction.user}</div>
                    <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                  </TableCell>
                )}
                {visibleFilter.coin && (
                  <TableCell className="py-2 text-center">
                    <div>{transaction.coin}</div>
                    <div className="text-xs text-[#121826]">{transaction.coinShort}</div>
                  </TableCell>
                )}
                {visibleFilter.blockchain && <TableCell className="py-2 text-center">{transaction.AmountSent}</TableCell>}
                {visibleFilter.amount && <TableCell className="py-2 text-center">{transaction.nairaEquivalent}</TableCell>}
                {visibleFilter.coinPriceUsd && <TableCell className="py-2 text-center">{transaction.dollarRate}</TableCell>}
                {visibleFilter.dollarRate && <TableCell className="py-2 text-center">{transaction.coinPrice}</TableCell>}
                {visibleFilter.networkFees && <TableCell className="py-2 text-center">{transaction.Bonus}</TableCell>}
                {visibleFilter.nairaAmount && <TableCell className="py-2 text-center">{transaction.paymentMethod}</TableCell>}
                {visibleFilter.networkFeesRepeat && <TableCell className="py-2 text-center">{transaction.Details}</TableCell>}
                {visibleFilter.paymentStatus && (
                  <TableCell className="py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-sm text-xs font-medium ${
                        transaction.paymentStatus === "pending"
                          ? " text-red-700"
                          : transaction.paymentStatus === "Successful"
                          ? " text-green-700"
                          : " text-yellow-700"
                      }`}
                    >
                      {transaction.paymentStatus}
                    </span>
                  </TableCell>
                )}
                {visibleFilter.steem && <TableCell className="py-2 text-center">{transaction.TransactionStatus}</TableCell>}
                {visibleFilter.referrer && <TableCell className="py-2 text-center">{transaction.AmountSents}</TableCell>}
                {visibleFilter.method && <TableCell className="py-2 text-center">{transaction.nairaEquivalent}</TableCell>}
                {visibleFilter.method && <TableCell className="py-2 text-center">{transaction.referredBy}</TableCell>}
                {visibleFilter.method && <TableCell className="py-2 text-center">{transaction.checkBalance}</TableCell>}
                {visibleFilter.method && <TableCell className="py-2 text-center">{transaction.phone}</TableCell>}
                {visibleFilter.Timestamp && <TableCell className="py-2 text-center">{formatTimestamp(transaction.Timestamp)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default SellingHistory;
