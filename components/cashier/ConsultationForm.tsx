'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

export default function ConsultationForm() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [insurance, setInsurance] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [rate, setRate] = useState('')

  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-emerald-200 p-8">
        <form className="grid md:grid-cols-2 gap-6">
          {/* Colonne gauche */}
          <div className="space-y-4">
            <div>
              <Label className="text-emerald-700">Nom du patient</Label>
              <Input placeholder="Entrez le nom du patient" className="bg-white border-emerald-300" />
            </div>

            <div>
              <Label className="text-emerald-700">Type de consultation</Label>
              <Input placeholder="Médecine générale, hépato-gastro, etc." className="bg-white border-emerald-300" />
            </div>

            <div>
              <Label className="text-emerald-700">Prix (FCFA)</Label>
              <Input type="number" placeholder="Montant" className="bg-white border-emerald-300" />
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4">
            <div>
              <Label className="text-emerald-700">Mode de paiement</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white border-emerald-300">
                  <SelectValue placeholder="Choisissez un mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Espèce</SelectItem>
                  <SelectItem value="insurance">Assurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'insurance' && (
              <>
                <div>
                  <Label className="text-emerald-700">Assurance</Label>
                  <Input
                    placeholder="Nom de l'assurance"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="bg-white border-emerald-300"
                  />
                </div>

                <div>
                  <Label className="text-emerald-700">Type de service</Label>
                  <Input
                    placeholder="Consultation, Examen, etc."
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="bg-white border-emerald-300"
                  />
                </div>

                <div>
                  <Label className="text-emerald-700">Taux (%)</Label>
                  <Input
                    type="number"
                    placeholder="Taux de couverture"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="bg-white border-emerald-300"
                  />
                </div>
              </>
            )}
          </div>

          {/* Bouton d'enregistrement */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-md font-medium"
            >
              Enregistrer la consultation
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
