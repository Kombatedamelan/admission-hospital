"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const paymentModes = ["Espèces", "Carte bancaire", "Assurance"]

const assurances = [
  {
    label: "Assurance A",
    services: [
      { label: "Acte léger", taux: 0.8 },
      { label: "Acte lourd", taux: 0.6 },
    ],
  },
  {
    label: "Assurance B",
    services: [
      { label: "Urgence", taux: 0.75 },
      { label: "Routine", taux: 0.9 },
    ],
  },
]

const currencies = ["F CFA", "EUR", "USD"]

export default function PaymentPage() {
  const router = useRouter()

  // --- États pour les données patient + panier ---
  const [patientName, setPatientName] = useState("")
  const [cart, setCart] = useState<{ label: string; price: number; quantity: number }[]>([])

  // --- États pour le paiement ---
  const [paymentMode, setPaymentMode] = useState(paymentModes[0])
  const [selectedAssurance, setSelectedAssurance] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [rate, setRate] = useState<number | null>(null)
  const [referenceNumber, setReferenceNumber] = useState("")
  // const [currency, setCurrency] = useState(currencies[0])

  // --- Calcul du total brut ---
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // --- Calcul du montant à payer (application du taux assurance si applicable) ---
  const amountToPay =
    paymentMode === "Assurance" && rate !== null ? Math.round(total * rate) : total

  // --- Chargement des données patient + panier depuis localStorage au montage ---
  useEffect(() => {
    const data = localStorage.getItem("acte-patient")
    if (data) {
      const parsed = JSON.parse(data)
      setPatientName(parsed.patientName || "")
      setCart(parsed.cart || [])
    }
  }, [])

  // --- Mise à jour du taux quand assurance ou service changent ---
  useEffect(() => {
    if (paymentMode === "Assurance" && selectedAssurance && selectedService) {
      const ass = assurances.find(a => a.label === selectedAssurance)
      const serv = ass?.services.find(s => s.label === selectedService)
      setRate(serv?.taux ?? null)
    } else {
      setRate(null)
    }
  }, [paymentMode, selectedAssurance, selectedService])

  // --- Gestion du clic sur "Payer maintenant" ---
  function handlePayNow() {
    if (!patientName) {
      toast.error("Le nom du patient est obligatoire.")
      return
    }
    if (cart.length === 0) {
      toast.error("Le panier est vide.")
      return
    }
    if (paymentMode === "Assurance") {
      if (!selectedAssurance || !selectedService || !referenceNumber) {
        toast.error("Veuillez compléter les informations d'assurance.")
        return
      }
    }

    // Ici tu peux ajouter l'appel à ton backend pour enregistrer le paiement
    toast.success("Paiement effectué avec succès !")
    localStorage.removeItem("acte-patient")
    router.push("/") // redirige vers l'accueil ou une autre page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de titre fixe */}
      <div className="bg-white shadow-md sticky top-0 z-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-700">Paiement</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Partie gauche : infos patient + panier */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Informations du patient</h2>
          <input
            type="text"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            placeholder="Nom complet"
            className="w-full border border-gray-300 rounded-md p-2 mb-6"
          />

          <h2 className="text-xl font-semibold mb-4">Panier d&apos;actes</h2>
          <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b pb-1">
                <span>
                  {item.label}{" "}
                  {item.quantity > 1 && (
                    <span className="text-sm text-gray-500">x{item.quantity}</span>
                  )}
                </span>
                <span>{(item.price * item.quantity).toLocaleString()} F CFA</span>
              </li>
            ))}
          </ul>

          <div className="text-lg font-bold text-right">Total : {total.toLocaleString()} F CFA</div>
        </div>

        {/* Partie droite : paiement */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Mode de paiement</h2>

          <select
            value={paymentMode}
            onChange={e => {
              setPaymentMode(e.target.value)
              setSelectedAssurance(null)
              setSelectedService(null)
              setRate(null)
              setReferenceNumber("")
            }}
            className="w-full border border-gray-300 rounded-md p-2 mb-6"
          >
            {paymentModes.map(mode => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          {paymentMode === "Assurance" && (
            <>
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">Assurance</label>
                <select
                  value={selectedAssurance ?? ""}
                  onChange={e => {
                    setSelectedAssurance(e.target.value || null)
                    setSelectedService(null)
                    setRate(null)
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">-- Choisir une assurance --</option>
                  {assurances.map(a => (
                    <option key={a.label} value={a.label}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedAssurance && (
                <div className="mb-4">
                  <label className="block font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={selectedService ?? ""}
                    onChange={e => setSelectedService(e.target.value || null)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">-- Choisir un service --</option>
                    {assurances
                      .find(a => a.label === selectedAssurance)
                      ?.services.map(s => (
                        <option key={s.label} value={s.label}>
                          {s.label}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {rate !== null && (
                <div className="mb-4">
                  <label className="block font-medium text-gray-700 mb-1">Taux de prise en charge</label>
                  <input
                    type="text"
                    value={`${(rate * 100).toFixed(0)} %`}
                    disabled
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">N° de prise en charge</label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={e => setReferenceNumber(e.target.value)}
                  placeholder="Ex: REF-2025-XYZ"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </>
          )}

          <div className="mb-6 text-lg font-bold">
            Montant à payer : {amountToPay.toLocaleString()} F CFA
          </div>

          <button
            onClick={handlePayNow}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 w-full"
          >
            Payer maintenant
          </button>
        </div>
      </div>
    </div>
  )
}
