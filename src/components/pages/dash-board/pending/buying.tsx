import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BuyingItem = {
  user: string;
  uid: string;
  coin: string;
  coinShort: string;
  blockchain: string;
  amount: number;
  coinPriceUsd: number;
  dollarRate: number;
  networkFees: string;
  nairaAmount: string;
  networkFeesRepeat: string;
  walletAddress: string;
  steem: string;
  method: string;
  paymentStatus: "pending" | "Successful";
  referrer: string;
  Timestamp: string;
  finish: string;
};

const Buying = ({ visibleColumns }: { visibleColumns: Record<string, boolean> }) => {
  const transaction: BuyingItem[] = [
    {
      user: "Mason Mount",
      uid: "22110976",
      coin: "BITCOIN",
      coinShort: "BTC",
      blockchain: "TRON(TRC 20)",
      amount: 20000.0,
      coinPriceUsd: 20000.0,
      dollarRate: 19800.0,
      networkFees: "0.5",
      nairaAmount: "-",
      networkFeesRepeat: "0.5",
      walletAddress: "1a1zple23eydhg467cb39d8f8f7DivfNa",
      steem: "Mikey0071",
      method: "",
      paymentStatus: "pending",
      referrer: "Marcus Ademola",
      Timestamp: "2025-03-12T10:09:00Z",
      finish: "",
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (

    <div className="border-2 border-gray-300 m-5 p-5">
      <Table className="border-collapse">
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b-0">
          <TableRow className="bg-[#ffffff] hover:bg-white border-b-0 font-bold leading-[150%] text-[14px] text-[#121826]">
            {visibleColumns.user && <TableHead className="text-center font-bold text-[#121826]">User</TableHead>}
            {visibleColumns.coin && <TableHead className="text-center font-bold text-[#121826]">Coin</TableHead>}
            {visibleColumns.blockchain && <TableHead className="text-center font-bold text-[#121826]">Blockchain</TableHead>}
            {visibleColumns.amount && <TableHead className="text-center font-bold text-[#121826]">Amount</TableHead>}
            {visibleColumns.coinPriceUsd && <TableHead className="text-center font-bold text-[#121826]">Coin Price (USD)</TableHead>}
            {visibleColumns.dollarRate && <TableHead className="text-center font-bold text-[#121826]">Dollar Rate</TableHead>}
            {visibleColumns.networkFees && <TableHead className="text-center font-bold text-[#121826]">Network Fees ($)</TableHead>}
            {visibleColumns.nairaAmount && <TableHead className="text-center font-bold text-[#121826]">Naira Amount + N/Fees</TableHead>}
            {visibleColumns.networkFeesRepeat && <TableHead className="text-center font-bold text-[#121826]">Network Fees ($)</TableHead>}
            {visibleColumns.walletAddress && <TableHead className="text-center font-bold text-[#121826]">Wallet Address</TableHead>}
            {visibleColumns.steem && <TableHead className="text-center font-bold text-[#121826]">Steem Username</TableHead>}
            {visibleColumns.method && <TableHead className="text-center font-bold text-[#121826]">Method</TableHead>}
            {visibleColumns.paymentStatus && <TableHead className="text-center font-bold text-[#121826]">Payment Status</TableHead>}
            {visibleColumns.referrer && <TableHead className="text-center font-bold text-[#121826]">Referrer</TableHead>}
            {visibleColumns.Timestamp && <TableHead className="text-center font-bold text-[#121826]">Time Stamp</TableHead>}
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
              {visibleColumns.blockchain && <TableCell className="py-2 text-center">{transaction.blockchain}</TableCell>}
              {visibleColumns.amount && <TableCell className="py-2 text-center">{transaction.amount}</TableCell>}
              {visibleColumns.coinPriceUsd && <TableCell className="py-2 text-center">{transaction.coinPriceUsd}</TableCell>}
              {visibleColumns.dollarRate && <TableCell className="py-2 text-center">{transaction.dollarRate}</TableCell>}
              {visibleColumns.networkFees && <TableCell className="py-2 text-center">{transaction.networkFees}</TableCell>}
              {visibleColumns.nairaAmount && <TableCell className="py-2 text-center">{transaction.nairaAmount}</TableCell>}
              {visibleColumns.networkFeesRepeat && <TableCell className="py-2 text-center">{transaction.networkFeesRepeat}</TableCell>}
              {visibleColumns.walletAddress && <TableCell className="py-2 text-center">{transaction.walletAddress}</TableCell>}
              {visibleColumns.steem && <TableCell className="py-2 text-center">{transaction.steem}</TableCell>}
              {visibleColumns.method && <TableCell className="py-2 text-center">{transaction.method}</TableCell>}
              {visibleColumns.paymentStatus && (
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
              {visibleColumns.referrer && <TableCell className="py-2 text-center">{transaction.referrer}</TableCell>}
              {visibleColumns.Timestamp && <TableCell className="py-2 text-center">{formatTimestamp(transaction.Timestamp)}</TableCell>}
              {visibleColumns.finish && <TableCell className="py-2 text-center">{transaction.finish}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Buying;
