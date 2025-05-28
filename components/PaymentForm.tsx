"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"

const SERVICES = [
  { id: "consultation", label: "Consultation", amount: 5000 },
  { id: "analyse", label: "Analyse", amount: 8000 },
  { id: "acte", label: "Acte médical", amount: 7000 },
  { id: "imagerie", label: "Imagerie", amount: 10000 },
]

export function PaymentForm() {
  const [service, setService] = useState<string>("consultation")
  const [amount, setAmount] = useState<number>(5000)
  const [received, setReceived] = useState<number>(0)

  const handleServiceChange = (value: string) => {
    const selected = SERVICES.find((s) => s.id === value)
    if (selected) {
      setService(value)
      setAmount(selected.amount)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      type: service,
      total: amount,
      received,
      change: received - amount,
    }
    console.log("Paiement enregistré :", data)
    // ⚠️ Appelle ici une mutation ou une API POST pour enregistrer le paiement
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold">Paiement caisse principale</h2>

      <div>
        <Label>Type de service</Label>
        <Select defaultValue={service} onValueChange={handleServiceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Montant à payer</Label>
        <Input type="number" value={amount} disabled className="bg-gray-100" />
      </div>

      <div>
        <Label>Montant reçu</Label>
        <Input
          type="number"
          value={received}
          onChange={(e) => setReceived(Number(e.target.value))}
        />
      </div>

      <div>
        <Label>Rendu</Label>
        <Input
          type="number"
          value={received > amount ? received - amount : 0}
          disabled
          className="bg-gray-100"
        />
      </div>

      <Button type="submit">Enregistrer et imprimer</Button>
    </form>
  )
}
