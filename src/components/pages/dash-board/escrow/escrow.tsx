import DashboardLayout from "@/layout/dash-board-layout";
import PageHeader from "@/components/pages/dash-board/escrow/pageHeader";
import TabSwitcher from "./tabs";
type DealsRows = {
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
type WithdrawRows = {
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
const Columns = [
  "User (Seller)",
  "Coin",
  "Blockchain",
  "Amount",
  "Coin Price (USD)",
  "Dollar Rate",
  "Netw Fees ($)",
  "Naira Amount + N/Fees",
  "Netw Fees ($)",
  "Wallet Address",
  "Steem Username",
  "Method",
  "Payment Status",
  "Referrer",
  "Time Stamp",
  "Finish",
];
const dealsRows: DealsRows[] = [
  {
    user: "Mason Mount",
    uid: "22110976",
    coin: "BITCOIN",
    coinShort: "BTC",
    blockchain: "TRON(TRC 20)",
    amount: 20000.00,
    coinPriceUsd: 20000.00,
    dollarRate: 19800.00,
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
const withdrawRows: WithdrawRows[] = [
  {
    user: "Mason Mount",
    uid: "22110976",
    coin: "BITCOIN",
    coinShort: "BTC",
    blockchain: "TRON(TRC 20)",
    amount: 20000.00,
    coinPriceUsd: 20000.00,
    dollarRate: 19800.00,
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
  {
    user: "Mason Mounta",
    uid: "22110976",
    coin: "BITCOIN",
    coinShort: "BTC",
    blockchain: "TRON(TRC 20)",
    amount: 21000.00,
    coinPriceUsd: 20000.00,
    dollarRate: 19800.00,
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

const Escrow = () => {
  const tabs = [
  {
    key: "deals",
    label: "Deals",
    data: {
      columns: Columns,
      rows: dealsRows.map((deal) => [
        [deal.user, deal.uid] as [string, string],
        [deal.coin, deal.coinShort] as [string, string],
        deal.blockchain,
        deal.amount,
        deal.coinPriceUsd,
        deal.dollarRate,
        deal.networkFees,
        deal.nairaAmount,
        deal.networkFeesRepeat,
        deal.walletAddress,
        deal.steem,
        deal.method,
        deal.paymentStatus,
        deal.referrer,
        deal.Timestamp,
        deal.finish,
      ]),
    },
  },
  {
    key: "withdraw",
    label: "Withdraw Request",
    data: {
      columns: Columns,
      rows: withdrawRows.map((withdraw) => [
        [withdraw.user, withdraw.uid] as [string, string],
        [withdraw.coin, withdraw.coinShort] as [string, string],
        withdraw.blockchain,
        withdraw.amount,
        withdraw.coinPriceUsd,
        withdraw.dollarRate,
        withdraw.networkFees,
        withdraw.nairaAmount,
        withdraw.networkFeesRepeat,
        withdraw.walletAddress,
        withdraw.steem,
        withdraw.method,
        withdraw.paymentStatus,
        withdraw.referrer,
        withdraw.Timestamp,
        withdraw.finish,
      ]),
    },
    notificationCount: 1,
  },
];

  return (
    <DashboardLayout>
      <section className="w-full h-full mx-auto">
        <PageHeader title="Escrow Deals" />
        <div className="w-full h-full px-4 py-2 md:px-10 md:py-4 bg-[#F8F9FA] space-y-16 md:space-y-0">
          {/* Tabs */}
          <TabSwitcher tabs={tabs} />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Escrow;
