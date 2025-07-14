import DashboardLayout from "@/layout/dash-board-layout";
import PageHeader from "../escrow/pageHeader";
import SellingTab from "./selling-tab";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ExchangeTab from "./exchange-tab";

type liveRateCoin = {
  coin: string;
  symbol: string;
  price: string;
  icon: string;
  change: string;
  percentageChange: string;
  arrow: string;
  color: string;
}

const DashboardSelling = () => {

  const fetchLiveRates = async () => {
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/price-ticker`,
      headers: {'Content-Type':'application/json'}
    });
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again later');
    }
    const data = response.data as liveRateCoin[];
    return data;
  }

  const { data, status } = useQuery({
    queryKey: ['live-rates'],
    queryFn: fetchLiveRates,
  });

  console.log(data);
  console.log(status)

  return (
    <DashboardLayout>
      <div>
        <ExchangeTab/>
        <section className="w-full h-full  font-Inter ">
          <PageHeader title="News" />
          <div className="w-full px-4 py-2 md:px-10 md:py-4 bg-[#F8F9FA] space-y-16 md:space-y-0">
            <div>
              <SellingTab />
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSelling;