
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"

const data = [
  { value: 40 },
  { value: 20 },
  { value: 60 },
  { value: 35 },
  { value: 70 },
  { value: 45 },
  { value: 30 },
  { value: 65 },
  { value: 40 },
  { value: 55 },
]

interface MetricCardProps {
  title: string
  value: string
  change: string
  comparison: string
  data: Array<{ value: number }>
}

function MetricCard({ title, value, change, comparison, data }: MetricCardProps) {
  const isNegative = change.startsWith("-")

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[20px] font-bold">{value}</div>
            <div className={`text-xs ${isNegative ? "text-[#E41D03]" : "text-green-500"}`}>{change}</div>
            <div className="text-[14px] text-[#000000] mt-1">Compared to {comparison} Last Month</div>
          </div>
          <div className="h-16 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FinancialDashboard() {
  return (
    <div className="w-full ">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Monthly Profit"
          value="NGN 35,210.05"
          change="-0.25%"
          comparison="NGN 450,000.06"
          data={data}
        />
        <MetricCard
          title="Monthly Escrow Purchase"
          value="NGN 35,210.05"
          change="-0.25%"
          comparison="NGN 450,000.06"
          data={data}
        />
        <MetricCard
          title="Monthly Escrow Sale"
          value="NGN 35,210.05"
          change="-0.25%"
          comparison="NGN 450,000.06"
          data={data}
        />
      </div>
    </div>
  )
}
