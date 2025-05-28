// components/dashboard/AlertsPanel.tsx
"use client"

import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const alerts = [
  {
    id: 1,
    type: "error",
    icon: <AlertTriangle className="text-red-600" />,
    message: "3 paiements en attente de validation",
  },
  {
    id: 2,
    type: "warning",
    icon: <Info className="text-yellow-600" />,
    message: "2 caissiers non connectés depuis plus de 1h",
  },
  {
    id: 3,
    type: "success",
    icon: <CheckCircle className="text-green-600" />,
    message: "Rapprochement comptable effectué avec succès",
  },
]

export function AlertsPanel() {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-base text-foreground">Alertes caisse</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map(({ id, icon, message, type }) => (
          <div
            key={id}
            className={`flex items-center gap-3 rounded-md p-3 ${
              type === "error"
                ? "bg-red-100 dark:bg-red-900 text-red-700"
                : type === "warning"
                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700"
                : "bg-green-100 dark:bg-green-900 text-green-700"
            }`}
          >
            <div className="w-6 h-6">{icon}</div>
            <p className="text-sm">{message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
