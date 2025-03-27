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
      <div className="border-2 border-gray-300 m-5 p-5">
      <Table className="border-collapse">
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
          <TableRow className="bg-[#ffffff] hover:bg-white border-b-0 font-bold leading-[150%] text-[14px] text-[#121826]">
            {visibleColumns.user && <TableHead className="text-center font-bold text-[#121826]">User</TableHead>}
            {visibleColumns.coin && <TableHead className="text-center font-bold text-[#121826]">Coin</TableHead>}
            {visibleColumns.amount && <TableHead className="text-center font-bold text-[#121826]">Amount Sent</TableHead>}
            {visibleColumns.coinPriceUsd && <TableHead className="text-center font-bold text-[#121826]">Naira Equivalent(NGN)</TableHead>}
            {visibleColumns.dollarRate && <TableHead className="text-center font-bold text-[#121826]">Amount Entered</TableHead>}
            {visibleColumns.networkFees && <TableHead className="text-center font-bold text-[#121826]">Naira Amount</TableHead>}
            {visibleColumns.nairaAmount && <TableHead className="text-center font-bold text-[#121826]">Paying In</TableHead>}
            {visibleColumns.networkFeesRepeat && <TableHead className="text-center font-bold text-[#121826]">Details</TableHead>}
            {visibleColumns.walletAddress && <TableHead className="text-center font-bold text-[#121826]">Dollar Rate</TableHead>}
            {visibleColumns.steem && <TableHead className="text-center font-bold text-[#121826]">Coin Price($)</TableHead>}
            {visibleColumns.method && <TableHead className="text-center font-bold text-[#121826]">Referred By</TableHead>}
            {visibleColumns.paymentStatus && <TableHead className="text-center font-bold text-[#121826]">Bonus</TableHead>}
            {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826]">Status</TableHead>}
            {visibleColumns.Timestamp && <TableHead className="text-center font-bold text-[#121826]">Time Stamp</TableHead>}
            {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826]">Check Balance</TableHead>}
            {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826]">Confirmed</TableHead>}
            {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826]">Send Data/Card</TableHead>}
            {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826]">Send Bill Payment</TableHead>}




            {visibleColumns.finish && <TableHead className="text-center font-bold text-[#121826]">Finish</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {transaction.map((transaction, index) => (
            <TableRow
              key={index}
              className={`odd:bg-[#f3f3f3] even:bg-[#e0e0e0] h-[50px] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
            >
              {visibleColumns.user && (
                <TableCell className="py-2 text-center">
                  <div>{transaction.user}</div>
                  <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                </TableCell>
              )}
              {visibleColumns.coin && (
                <TableCell className="py-2 text-center">
                  <div>{transaction.coin}</div>
                  <div className="text-xs text-[#121826]">{transaction.coinShort}</div>
                </TableCell>
              )}
              {visibleColumns.blockchain && <TableCell className="py-2 text-center">{transaction.AmountSent}</TableCell>}
              {visibleColumns.nairaAmount && <TableCell className="py-2 text-center">{transaction.nairaEquivalent}</TableCell>}

              {visibleColumns.amount && <TableCell className="py-2 text-center">{transaction.amountEntered}</TableCell>}
              {visibleColumns.coinPriceUsd && <TableCell className="py-2 text-center">{transaction.nairaAmount}</TableCell>}
              {visibleColumns.dollarRate && <TableCell className="py-2 text-center">{transaction.payingIn}</TableCell>}
              {visibleColumns.networkFees && <TableCell className="py-2 text-center">{transaction.Details}</TableCell>}
              {visibleColumns.networkFeesRepeat && <TableCell className="py-2 text-center">{transaction.dollarRate}</TableCell>}
              {visibleColumns.walletAddress && <TableCell className="py-2 text-center">{transaction.coinPrice}</TableCell>}
              {visibleColumns.referrer && <TableCell className="py-2 text-center">{transaction.referredBy}</TableCell>}

              {visibleColumns.steem && <TableCell className="py-2 text-center">{transaction.Bonus}</TableCell>}
              {visibleColumns.paymentStatus && (
                <TableCell className="py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-sm text-xs font-medium ${
                      transaction.Status === "pending"
                        ? " text-red-700"
                        : transaction.Status === "Successful"
                        ? " text-green-700"
                        : " text-yellow-700"
                    }`}
                  >
                    {transaction.Status}
                  </span>
                </TableCell>
              )}
              {visibleColumns.Timestamp && <TableCell className="py-2 text-center">{formatTimestamp(transaction.Timestamp)}</TableCell>}
              {visibleColumns.method && <TableCell className="py-2 text-center">{transaction.checkBalance}</TableCell>}
              {visibleColumns.method && <TableCell className="py-2 text-center">{transaction.confirmed}</TableCell>}
              {visibleColumns.method && <TableCell className="py-2 text-center">{transaction.sentDataCard}</TableCell>}
              {visibleColumns.method && <TableCell className="py-2 text-center">{transaction.sendBillPayment}</TableCell>}
              {visibleColumns.finish && <TableCell className="py-2 text-center">{transaction.finish}</TableCell>}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </React.Fragment>
  );
};

export default Selling;
