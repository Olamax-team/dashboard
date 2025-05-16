import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const SellingHistory = ({
  visibleFilter,
}: {
  visibleFilter: Record<string, boolean>;
}) => {
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
                    <div>{transaction.user}</div>
                    <div className="text-xs text-[#121826]">
                      UID {transaction.uid}
                    </div>
                  </TableCell>
                )}
                {visibleFilter.coin && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    <div>{transaction.coin}</div>
                    <div className="text-xs text-[#121826]">
                      {transaction.coinShort}
                    </div>
                  </TableCell>
                )}
                {visibleFilter.amount && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.AmountSent}
                  </TableCell>
                )}
                {visibleFilter.coinPriceUsd && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.nairaEquivalent}
                  </TableCell>
                )}
                {visibleFilter.dollarRate && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.dollarRate}
                  </TableCell>
                )}
                {visibleFilter.networkFees && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.coinPrice}
                  </TableCell>
                )}
                {visibleFilter.nairaAmount && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.Bonus}
                  </TableCell>
                )}
                {visibleFilter.networkFeesRepeat && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.paymentMethod}
                  </TableCell>
                )}
                {visibleFilter.walletAddress && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.Details}
                  </TableCell>
                )}
                {visibleFilter.steem && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
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
                {visibleFilter.method && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.TransactionStatus}
                  </TableCell>
                )}
                {visibleFilter.paymentStatus && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.AmountSents}
                  </TableCell>
                )}
                {visibleFilter.referrer && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.nairaEquivalent}
                  </TableCell>
                )}
                {visibleFilter.referrer && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.referredBy}
                  </TableCell>
                )}
                {visibleFilter.finish && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.checkBalance}
                  </TableCell>
                )}
                {visibleFilter.finish && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {transaction.phone}
                  </TableCell>
                )}
                {visibleFilter.Timestamp && (
                  <TableCell className="py-2 text-center border-r border-gray-300">
                    {formatTimestamp(transaction.Timestamp)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default SellingHistory;
