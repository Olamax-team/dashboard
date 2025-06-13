import PageHeader from "./escrow/pageHeader";
import DashboardLayout from "@/layout/dash-board-layout";
import BuyingTab from "./pending/buying-tab";

const DashboardHome = () => {
  
  const exchangeType = [
    { label: "BTC", amount: "$87375" },
    { label: "ETH", amount: "$3155.2" },
    { label: "LTC", amount: "$77.2" },
    { label: "STEEM", amount: "$0.2135" },
    { label: "SDB", amount: "$3155.2" },
    { label: "DOGE", amount: "$0.3746" },
    { label: "HIVE", amount: "$0.2786" },
    { label: "HBD", amount: "$3155.2" },
    { label: "BNB", amount: "$3155.2" },
  ];

  return (
    <DashboardLayout>
      <div>
        <div className="bg-[#039AE4] lg:flex items-center justify-center hidden w-full h-[50px] flex-wrap">
          {exchangeType.map((exchange, index) => (
            <div key={index} className="flex items-center space-x-2">
              <p className="flex items-center justify-between gap-1 w-full">
                <span className="font-medium font-inter text-[13px] lg:text-[16px] leading-[150%] text-[#121826]">
                  {exchange.label}
                </span>
                <span className="text-[#ffffff] font-medium font-inter text-[13px] lg:text-[16px] leading-[150%]">
                  {exchange.amount}
                </span>
                {index !== exchangeType.length - 1 && (
                  <span className="border-l-2 border-[#ffffff] h-6 mx-2"></span>
                )}
              </p>
            </div>
          ))}
        </div>
        <section className="w-full h-full  font-Inter ">
          <PageHeader title="News" />
          <div className="w-full px-4 py-2 md:px-10 md:py-4 space-y-16 md:space-y-0">
            <div>
              <BuyingTab />
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
