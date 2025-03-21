import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

type SellingItem = {
  user: string;
  uid: string;
  coin: string;
  coinShort: string;
  AmountSent: string;
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

const Selling = () => {
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
              <TableHead className="text-center font-bold text-[#121826]">User</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Coin</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Amount Sent(COIN)</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Naira Equivalent(NGN)</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Amount Entered</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Naira Amount</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Paying In</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Details</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Dollar Rate</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Coin Price ($)</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Referred By</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Bonus</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Status</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Timestamp</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Check Balance</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Confirmed</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Send Data/Card</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Send Bill Payment</TableHead>
              <TableHead className="text-center font-bold text-[#121826]">Finish</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transaction.map((transaction, index) => (
              <TableRow
                key={index}
                className={`odd:bg-[#f3f3f3] even:bg-[#e0e0e0] hover:bg-[#d1d1d1] text-[#121826] font-semibold text-[12px] leading-[150%] ml-5`}
              >
                <TableCell className="py-2 text-center">
                  <div>{transaction.user}</div>
                  <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                </TableCell>
                <TableCell className="py-2 text-center">
                  <div>{transaction.coin}</div>
                  <div className="text-xs text-[#121826]">{transaction.coinShort}</div>
                </TableCell>
                <TableCell className="py-2 text-center">{transaction.AmountSent}</TableCell>
                <TableCell className="py-2 text-center">{transaction.nairaEquivalent}</TableCell>
                <TableCell className="py-2 text-center">{transaction.amountEntered}</TableCell>
                <TableCell className="py-2 text-center">{transaction.nairaAmount}</TableCell>
                <TableCell className="py-2 text-center">{transaction.payingIn}</TableCell>
                <TableCell className="py-2 text-center">{transaction.Details}</TableCell>
                <TableCell className="py-2 text-center">{transaction.dollarRate}</TableCell>
                <TableCell className="py-2 text-center">{transaction.coinPrice}</TableCell>
                <TableCell className="py-2 text-center">{transaction.referredBy}</TableCell>
                <TableCell className="py-2 text-center">{transaction.Bonus}</TableCell>
                <TableCell className="py-2 text-center">{transaction.Status}</TableCell>
                <TableCell className="py-2 text-center">{formatTimestamp(transaction.Timestamp)}</TableCell>
                <TableCell className="py-2 text-center">{transaction.checkBalance}</TableCell>
                <TableCell className="py-2 text-center">{transaction.confirmed}</TableCell>
                <TableCell className="py-2 text-center">{transaction.sentDataCard}</TableCell>
                <TableCell className="py-2 text-center">{transaction.sendBillPayment}</TableCell>
                <TableCell className="py-2 text-center">{transaction.finish}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Selling;
