// components/dashboard/RecentPayments.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const payments = [
  {
    id: "B00123",
    patient: "Koffi Amavi",
    service: "Consultation",
    amount: 15000,
    date: "2025-05-23 09:30",
    caissier: "D. Teko",
  },
  {
    id: "B00124",
    patient: "Akouété Mawussi",
    service: "Urgence",
    amount: 50000,
    date: "2025-05-23 10:15",
    caissier: "M. Agbé",
  },
  {
    id: "B00125",
    patient: "N’Dri Kouadio",
    service: "Chirurgie",
    amount: 120000,
    date: "2025-05-23 11:05",
    caissier: "D. Teko",
  },
  {
    id: "B00126",
    patient: "Afi Yao",
    service: "Laboratoire",
    amount: 7500,
    date: "2025-05-23 12:45",
    caissier: "S. Doglo",
  },
]

export function RecentPayments() {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-base text-foreground">Paiements récents</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 pr-4">Bon</th>
              <th className="py-2 pr-4">Patient</th>
              <th className="py-2 pr-4">Service</th>
              <th className="py-2 pr-4">Montant</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2">Caissier</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-muted/40">
                <td className="py-2 pr-4 font-mono">{p.id}</td>
                <td className="py-2 pr-4">{p.patient}</td>
                <td className="py-2 pr-4">{p.service}</td>
                <td className="py-2 pr-4 font-semibold text-green-600 dark:text-green-400">
                  {p.amount.toLocaleString()} FCFA
                </td>
                <td className="py-2 pr-4">{p.date}</td>
                <td className="py-2">{p.caissier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
