import React from "react"
import { Tooltip, TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

// ✅ ChartConfig type - reusable for any BarChart with multiple keys
export type ChartConfig = Record<
  string,
  {
    label: string
    color: string
  }
>

// ✅ Container with chart config
export const ChartContainer = ({
  children,
}: {
  children: React.ReactNode
  config: ChartConfig
}) => {
  return (
    <div className="w-full h-full">
      {/* You can use config here if needed for legends or dynamic styles */}
      {children}
    </div>
  )
}

// ✅ Custom tooltip content
export const ChartTooltipContent = ({
  payload,
  label,
  formatter,
  className,
  indicator = "solid",
}: TooltipProps<any, any> & {
  formatter?: (value: number) => string
  className?: string
  indicator?: "solid" | "dashed"
}) => {
  if (!payload || payload.length === 0) return null

  return (
    <div
      className={cn(
        "rounded-md border bg-white p-3 shadow-md space-y-2 min-w-[160px]",
        className
      )}
    >
      {/* Hovered Month */}
      <div className="text-sm font-semibold text-gray-900">{label}</div>

      {/* Data rows */}
      {payload.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between text-sm text-gray-700"
        >
          <div className="flex items-center gap-2">
            <span
              className={cn("h-2 w-2 rounded-full", {
                "border border-muted-foreground": indicator === "dashed",
              })}
              style={{
                backgroundColor: entry.color || entry.payload?.color || "#000",
              }}
            />
            <span>{entry.name}</span>
          </div>
          <span className="font-medium">
            {formatter
              ? formatter(entry.value)
              : `₦${Math.abs(entry.value).toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  )
}


// ✅ Tooltip wrapper using ChartTooltipContent
export const ChartTooltip = ({
  content = <ChartTooltipContent />,
  ...props
}: Omit<React.ComponentProps<typeof Tooltip>, "content"> & {
  content?: React.ReactElement
}) => {
  return <Tooltip {...props} content={content} />
}
