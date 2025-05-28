// components/dashboard/StatCard.tsx
"use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { cn } from "@/lib/utils"
// import { ReactNode } from "react"

// type StatCardProps = {
//   title: string
//   value: string | number
//   icon?: ReactNode
//   className?: string
// }
export function StatCard({ title, value, icon, color = "bg-blue-100" }: {
  title: string,
  value: string | number,
  icon: React.ReactNode,
  color?: string
}) {
  return (
    <div className={`flex items-center p-4 rounded-lg shadow-sm ${color} border border-blue-200`}>
      <div className="mr-4 p-2 rounded-full bg-white shadow">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-xl font-semibold text-blue-800">{value}</div>
      </div>
    </div>
  )
}
