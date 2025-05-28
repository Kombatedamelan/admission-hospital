"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

const consultationTypes = [
  { label: "Consultation générale", price: 10000 },
  { label: "Consultation spécialisée", price: 20000 },
  { label: "Consultation urgente", price: 30000 },
]

const paymentModes = ["Espèces", "Carte bancaire", "Assurance"]

const assurances = [
  {
    label: "Assurance A", services: [
      { label: "Service 1", taux: 0.8 },
      { label: "Service 2", taux: 0.7 },
    ]
  },
  {
    label: "Assurance B", services: [
      { label: "Service X", taux: 0.85 },
      { label: "Service Y", taux: 0.75 },
    ]
  },
]

const currencies = ["F CFA", "EUR", "USD"]

export default function ConsultationPage() {
  const [patientName, setPatientName] = useState("")
  const [consultType, setConsultType] = useState(consultationTypes[0].label)
  const [price, setPrice] = useState(consultationTypes[0].price)
  const [referenceNumber, setReferenceNumber] = useState("")

  const [paymentMode, setPaymentMode] = useState(paymentModes[0])
  const [selectedAssurance, setSelectedAssurance] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [rate, setRate] = useState<number | null>(null)

  const [currency, setCurrency] = useState(currencies[0])
  const [amountToPay, setAmountToPay] = useState(price)

  useEffect(() => {
    const found = consultationTypes.find(c => c.label === consultType)
    if (found) setPrice(found.price)
  }, [consultType])

  useEffect(() => {
    if (paymentMode === "Assurance" && selectedAssurance && selectedService) {
      const ass = assurances.find(a => a.label === selectedAssurance)
      const service = ass?.services.find(s => s.label === selectedService)
      setRate(service?.taux ?? null)
    } else {
      setRate(null)
    }
  }, [paymentMode, selectedAssurance, selectedService])

  useEffect(() => {
    if (paymentMode === "Assurance" && rate !== null) {
      setAmountToPay(Math.round(price * rate))
    } else {
      setAmountToPay(price)
    }
  }, [price, paymentMode, rate])

  function handleSave() {
    toast.success("Consultation enregistrée avec succès !")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-blue-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-700">Consultation médicale</h1>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg border border-blue-200 p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informations patient */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-blue-700">Informations patient</h2>

              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Nom du patient</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  placeholder="Nom complet"
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Type de consultation</label>
                <select
                  value={consultType}
                  onChange={e => setConsultType(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {consultationTypes.map(c => (
                    <option key={c.label} value={c.label}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Prix (F CFA)</label>
                <input
                  type="number"
                  value={price}
                  readOnly
                  className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 text-gray-600"
                />
              </div>
            </div>

            {/* Paiement */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-blue-700">Mode de règlement</h2>

              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1">Mode de paiement</label>
                <select
                  value={paymentMode}
                  onChange={e => {
                    setPaymentMode(e.target.value)
                    setSelectedAssurance(null)
                    setSelectedService(null)
                    setRate(null)
                  }}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {paymentModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              {paymentMode === "Assurance" && (
                <>
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mb-1">Assurance</label>
                    <select
                      value={selectedAssurance ?? ""}
                      onChange={e => {
                        setSelectedAssurance(e.target.value || null)
                        setSelectedService(null)
                        setRate(null)
                      }}
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Sélectionner --</option>
                      {assurances.map(a => (
                        <option key={a.label} value={a.label}>{a.label}</option>
                      ))}
                    </select>
                  </div>

                  {selectedAssurance && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-700 font-medium mb-1">Service</label>
                        <select
                          value={selectedService ?? ""}
                          onChange={e => setSelectedService(e.target.value || null)}
                          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">-- Choisir un service --</option>
                          {assurances.find(a => a.label === selectedAssurance)?.services.map(s => (
                            <option key={s.label} value={s.label}>{s.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 font-medium mb-1">Taux appliqué</label>
                        <input
                          type="text"
                          readOnly
                          value={rate !== null ? `${(rate * 100).toFixed(0)}%` : ""}
                          className="w-full rounded-md bg-gray-100 border border-gray-300 p-2 text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 font-medium mb-1">N° de prise en charge</label>
                        <input
                          type="text"
                          value={referenceNumber}
                          onChange={e => setReferenceNumber(e.target.value)}
                          placeholder="Ex: REF-2025-001"
                          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-lg font-semibold text-blue-800">
              Montant à payer : {amountToPay.toLocaleString()} {currency}
            </div>

            <div className="flex gap-3 items-center">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:outline-none"
              >
                {currencies.map(c => <option key={c}>{c}</option>)}
              </select>

              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
