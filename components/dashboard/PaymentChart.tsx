// components/dashboard/PaymentChart.tsx
"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { date: "Lun", total: 180000 },
  { date: "Mar", total: 220000 },
  { date: "Mer", total: 195000 },
  { date: "Jeu", total: 250000 },
  { date: "Ven", total: 210000 },
  { date: "Sam", total: 270000 },
  { date: "Dim", total: 150000 },
]

export function PaymentChart() {
  return (
    <div className="w-full h-[300px] bg-card rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Évolution des paiements (7 jours)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
            labelStyle={{ color: "#8884d8" }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
