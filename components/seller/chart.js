"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"

// Chart container component
const ChartContainer = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-full", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

// Chart component
const Chart = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-full", className)}
    {...props}
  >
    <ResponsiveContainer width="100%" height="100%">
      {props.children}
    </ResponsiveContainer>
  </div>
))
Chart.displayName = "Chart"

// Chart area component
const ChartArea = React.forwardRef(({ className, ...props }, ref) => (
  <AreaChart
    width={500}
    height={300}
    margin={{
      top: 20,
      right: 20,
      left: 0,
      bottom: 0,
    }}
    {...props}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
    <XAxis 
      dataKey="month" 
      axisLine={false}
      tickLine={false}
      tick={{ fill: '#767B7F', fontSize: 12 }}
    />
    <YAxis 
      axisLine={false}
      tickLine={false}
      tick={{ fill: '#767B7F', fontSize: 12 }}
    />
    {props.children}
  </AreaChart>
))
ChartArea.displayName = "ChartArea"

// Chart line component
/**
 * @param {Object} props
 * @param {Array} [props.data]
 * @param {string} props.dataKey
 * @param {string} [props.stroke]
 * @param {number} [props.strokeWidth]
 * @param {string} [props.fill]
 * @param {*} [props.dot]
 * @param {*} [props.activeDot]
 */
const ChartLine = ({
  data,
  dataKey,
  stroke = "#018CFF",
  strokeWidth = 2,
  fill = "url(#colorGradient)",
  dot,
  activeDot,
  ...props
}) => {
  return (
    <Area
      type="monotone"
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      dot={dot}
      activeDot={activeDot}
      {...props}
    />
  )
}

// Chart tooltip component
/**
 * @param {Object} props
 * @param {Function} [props.content]
 * @param {boolean|object} [props.cursor]
 */
const ChartTooltip = ({ content, cursor = { stroke: "#f5f5f5" }, ...props }) => {
  return <Tooltip content={content} cursor={cursor} {...props} />
}

// Chart tooltip content component
const ChartTooltipContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg shadow-md", className)}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  ChartContainer,
  Chart,
  ChartArea,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
}
