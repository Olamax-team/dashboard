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
  transactionStatus: string | null;
  referrer: string;
  phone: string;
  Timestamp: string;
  finish: string;
};

const BuyingHistory = ({ visibleFilter }: { visibleFilter: Record<string, boolean> }) => {
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
      transactionStatus: "-",
      referrer: "Marcus Ademola",
      phone: "-",
      Timestamp: "2025-03-12T10:09:00Z",
      finish: "",
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="border-2 border-gray-300">
      <Table className="border-collapse">
        <TableHeader className="rounded-lg h-[60px] [&_tr]:border-b">
          <TableRow className="bg-[#ffffff] hover:bg-white border-b font-bold leading-[150%] text-[14px] text-[#121826]">
            {visibleFilter.user && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">User</TableHead>}
            {visibleFilter.coin && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Coin</TableHead>}
            {visibleFilter.blockchain && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Blockchain</TableHead>}
            {visibleFilter.amount && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Amount</TableHead>}
            {visibleFilter.coinPriceUsd && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Coin Price (USD)</TableHead>}
            {visibleFilter.dollarRate && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Dollar Rate</TableHead>}
            {visibleFilter.networkFees && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Network Fees ($)</TableHead>}
            {visibleFilter.nairaAmount && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Naira Amount + N/Fees</TableHead>}
            {visibleFilter.networkFeesRepeat && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Network Fees ($)</TableHead>}
            {visibleFilter.walletAddress && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Wallet Address</TableHead>}
            {visibleFilter.steem && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Steem Username</TableHead>}
            {visibleFilter.method && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Method</TableHead>}
            {visibleFilter.paymentStatus && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Payment Status</TableHead>}
            {visibleFilter.paymentStatus && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Transaction Status</TableHead>}
            {visibleFilter.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Referrer</TableHead>}
            {visibleFilter.referrer && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Phone</TableHead>}
            {visibleFilter.Timestamp && <TableHead className="text-center font-bold text-[#121826] border-r border-gray-300">Time Stamp</TableHead>}
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
                  <div className="text-xs text-[#121826]">UID {transaction.uid}</div>
                </TableCell>
              )}
              {visibleFilter.coin && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <div>{transaction.coin}</div>
                  <div className="text-xs text-[#121826]">{transaction.coinShort}</div>
                </TableCell>
              )}
              {visibleFilter.blockchain && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.blockchain}</TableCell>}
              {visibleFilter.amount && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.amount}</TableCell>}
              {visibleFilter.coinPriceUsd && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.coinPriceUsd}</TableCell>}
              {visibleFilter.dollarRate && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.dollarRate}</TableCell>}
              {visibleFilter.networkFees && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.networkFees}</TableCell>}
              {visibleFilter.nairaAmount && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.nairaAmount}</TableCell>}
              {visibleFilter.networkFeesRepeat && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.networkFeesRepeat}</TableCell>}
              {visibleFilter.walletAddress && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.walletAddress}</TableCell>}
              {visibleFilter.steem && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.steem}</TableCell>}
              {visibleFilter.method && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.method}</TableCell>}
              {visibleFilter.paymentStatus && (
                <TableCell className="py-2 text-center border-r border-gray-300">
                  <span
                    className={`px-2 py-1 rounded-sm text-xs font-medium ${
                      transaction.paymentStatus === "pending"
                        ? "text-red-700"
                        : transaction.paymentStatus === "Successful"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {transaction.paymentStatus}
                  </span>
                </TableCell>
              )}
              {visibleFilter.referrer && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.transactionStatus}</TableCell>}
              {visibleFilter.referrer && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.referrer}</TableCell>}
              {visibleFilter.referrer && <TableCell className="py-2 text-center border-r border-gray-300">{transaction.phone}</TableCell>}
              {visibleFilter.Timestamp && <TableCell className="py-2 text-center border-r border-gray-300">{formatTimestamp(transaction.Timestamp)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyingHistory;
