import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ChartContent from "./chartContent";
import MemberGrowthChart from "./memberGrowth";
import FinancialDashboard from "./financialBoard";
import CryptoTransactionTable from "./cryptoTable";

const totalIncome = [
  {
    thisMont: "Total buy this month",
    amount: "NGN 35,210.05",
    lastDay: "NGN 220,234 Last 30 Days",
  },
  {
    thisMont: "Total buy this month",
    amount: "NGN 35,210.05",
    lastDay: "NGN 220,234 Last 30 Days",
  },
  {
    thisMont: "Total buy this month",
    amount: "NGN 35,210.05",
    lastDay: "NGN 220,234 Last 30 Days",
  },
  {
    thisMont: "Total buy this month",
    amount: "NGN 35,210.05",
    lastDay: "NGN 220,234 Last 30 Days",
  },
];

const FiscalYearTrade = () => {
  return (
    <section className="w-full h-auto mt-5">
      <Card className="w-full h-auto bg-white">
        <CardHeader>
          <CardTitle>Fiscal Year Trades</CardTitle>
        </CardHeader>

        <div className="w-full flex flex-col lg:flex-row gap-6 p-4">
          <div className="w-full lg:w-[60%] bg-white">
            <ChartContent />
          </div>

          <div className="w-full lg:w-[40%]">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {totalIncome.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-900"
                >
                  <p className="text-sm text-[#000000] mb-1">{item.thisMont}</p>
                  <p className="text-[20px] text-[#141414] font-bold">{item.amount}</p>
                  <p className="text-xs text-[#000000] mt-5">{item.lastDay}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <MemberGrowthChart />
        </div>
      </Card>
      <div className="mt-5"><FinancialDashboard  />  </div>

      <div className="mt-5"> <CryptoTransactionTable/>  </div>
    </section>
  );
};

export default FiscalYearTrade;
