import PageHeader from "./escrow/pageHeader";
import DashboardLayout from "@/layout/dash-board-layout";
import BuyingTab from "./pending/buying-tab";
import ExchangeTab from "./pending/exchange-tab";

const DashboardHome = () => {

  return (
    <DashboardLayout>
      <div>
        <ExchangeTab/>
        <section className="w-full h-full  font-Inter ">
          <PageHeader title="Pending Deals" />
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
