import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ChartOptions,
} from "chart.js";
import { useCallback, useState } from "react";
import { RefreshCw } from "lucide-react";
import BTC from "../../../../assets/BTC.svg";
import USTD from "../../../../assets/USTD.svg";
import ENTHERUM from "../../../../assets/ENTHERUM.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MemberGrowthChart = () => {
  const memberData = [
    240000, 140000, 330000, 140000, 220000, 460000, 160000, 480000, 280000,
    420000,
  ];
  const months = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ];

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Member Growth",
        align: "start",
        font: {
          size: 20,
          weight: "bold",
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#121826",
        bodyColor: "#121826",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()} members`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 15,
          },
        },
      },
      y: {
        min: 100000,
        max: 500000,
        ticks: {
          stepSize: 100000,
          callback: (value: string | number) =>
            typeof value === "number"
              ? value === 0
                ? "0"
                : `${value / 1000}k`
              : value,
          font: {
            size: 15,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: "rgb(53, 162, 235)",
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6,
        backgroundColor: "rgb(53, 162, 235)",
        borderColor: "white",
        borderWidth: 2,
      },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        data: memberData,
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderColor: "rgb(53, 162, 235)",
      },
    ],
  };

  interface CryptoData {
    symbol: string;
    name: string;
    price: string;
    change: number;
    icon: string;
  }
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      symbol: "USDT/NGN",
      name: "Tether",
      price: "NGN1,730",
      change: 0.08,
      icon: "tether",
    },
    {
      symbol: "BTC/NGN",
      name: "BITCOIN",
      price: "NGN30,000,000",
      change: -0.25,
      icon: "bitcoin",
    },
    {
      symbol: "ETH/NGN",
      name: "Ethereum",
      price: "NGN3,400,000",
      change: -0.04,
      icon: "ethereum",
    },
    {
      symbol: "ETH/NGN",
      name: "Ethereum",
      price: "NGN3,400,000",
      change: -0.04,
      icon: "ethereum",
    },
  ]);

  const refreshPrices = useCallback(() => {
    setCryptoData((prevData) =>
      prevData.map((crypto) => {
        const priceChange = (Math.random() * 2 - 1) / 100;

        const newChange = Number((crypto.change + priceChange).toFixed(2));

        const currentPrice = Number(crypto.price.replace(/[^0-9]/g, ""));

        const newPrice = Math.round(currentPrice * (1 + priceChange));

        const formattedPrice = `NGN${newPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

        return {
          ...crypto,
          price: formattedPrice,
          change: newChange,
        };
      })
    );
  }, []);

  return (
    <div className="lg:flex  justify-between    ">
      <div className=" lg:w-[60%] w-full h-auto rounded-lg  bg-white  ">
        <Line options={options} data={data} />
      </div>

      <div className="lg:w-[40%]  w-full h-auto p-5 bg-white rounded-lg ">
        <div className="pb-3 flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold">Popular Crypto</h2>
          <button
            onClick={refreshPrices}
            className="p-1 rounded-full hover:bg-slate-100"
            aria-label="Refresh prices"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="pt-3">
          <div className="space-y-3">
            {cryptoData.map((crypto, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {crypto.icon === "tether" && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        <img src={USTD} className="size-6 " />
                      </div>
                    )}
                    {crypto.icon === "bitcoin" && (
                      <div className="w-8 h-8  rounded-full flex items-center justify-center  font-bold">
                        <img src={BTC} className="size-6 " />
                      </div>
                    )}
                    {crypto.icon === "ethereum" && (
                      <div className="w-8 h-8   rounded-full flex items-center justify-center">
                        <img src={ENTHERUM} className="size-6 " />
                      </div>
                    )}
                  </div>
                  <div className="   pt-2">
                    <div className="font-medium text-[14px] text-[#121826]">
                      {crypto.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {crypto.name}
                    </div>
                  </div>
                </div>
                <div className="text-right  pt-2">
                  <div className="font-medium text-[14px]  text-[#121826]">
                    {crypto.price}
                  </div>
                  <div
                    className={`text-xs flex items-center justify-end ${
                      crypto.change >= 0 ? "text-[#1FAF38]" : "text-[#E41D03]"
                    }`}
                  >
                    {crypto.change >= 0 ? (
                      <>+{crypto.change.toFixed(2)}%</>
                    ) : (
                      <>{crypto.change.toFixed(2)}%</>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberGrowthChart;
