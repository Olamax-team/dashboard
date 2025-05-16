import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartContent = () => {
  const chartData = [
    { month: "January", buy: 320000, sell: -280000 },
    { month: "February", buy: 400000, sell: -420000 },
    { month: "March", buy: 250000, sell: -260000 },
    { month: "April", buy: 210000, sell: -220000 },
    { month: "May", buy: 260000, sell: -180000 },
    { month: "June", buy: 200000, sell: -320000 },
    { month: "July", buy: 300000, sell: -220000 },
    { month: "August", buy: 160000, sell: -280000 },
    { month: "September", buy: 210000, sell: -220000 },
    { month: "October", buy: 250000, sell: -240000 },
    { month: "November", buy: 410000, sell: -400000 },
    { month: "December", buy: 240000, sell: -340000 },
  ];

  const totalBuy = chartData.reduce((sum, item) => sum + item.buy, 0);
  const totalSell = chartData.reduce(
    (sum, item) => sum + Math.abs(item.sell),
    0
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartConfig = {
    buy: {
      label: "Buy",
      color: "#039AE4",
    },
    sell: {
      label: "Sell",
      color: "#0073AD",
    },
  };

  return (
    <Card>
      <CardContent className="">
        <div className="flex items-center justify-between ">
          {/* Chart area - takes most of the space */}
          <div className="flex-grow h-[400px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    domain={[-400000, 400000]}
                    ticks={[-400000, -200000, 0, 200000, 400000]}
                    tick={({ x, y, payload }) => (
                      <text
                        x={x}
                        y={y}
                        dy={4}
                        textAnchor="end"
                        fill="#121826"
                        className="text-[10px] lg:text-[15px]  text-[#121826] "
                      >
                        {payload.value === 0
                          ? "0"
                          : `${Math.abs(payload.value / 1000)}k`}
                      </text>
                    )}
                  />

                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dashed"
                        formatter={(value) =>
                          formatCurrency(Math.abs(Number(value)))
                        }
                      />
                    }
                  />
                  <Bar dataKey="buy" fill={chartConfig.buy.color} radius={4} />
                  <Bar
                    dataKey="sell"
                    fill={chartConfig.sell.color}
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Fiscal year information - on the right side */}
          <div className="mb-10 flex flex-col justify-center space-y-10 ">
            <div>
              <div className="text-[#121826]  font-normal  text-[10px] lg:text-[15px] mb-1">
                Fiscal Year Buy
              </div>
              <p className="lg:text-[20px] text-[15px] font-medium text-[#121826]">
                {formatCurrency(totalBuy)}
              </p>
            </div>
            <div>
              <div className="text-[#121826] text-[10px] lg:text-[16px] mb-1">
                Fiscal Year Sell
              </div>
              <p className="lg:text-[20px] text-[15px] font-medium text-[#121826]">
                {formatCurrency(totalSell)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartContent;
