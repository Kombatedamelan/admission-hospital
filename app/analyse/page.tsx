"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { FaFlask, FaTrash } from "react-icons/fa"
import { MdNavigateNext } from "react-icons/md"

const analyses = [
  { label: "Hémogramme", price: 7000 },
  { label: "Glycémie", price: 5000 },
  { label: "Test VIH", price: 6000 },
  { label: "Radiographie", price: 12000 },
  { label: "IRM", price: 45000 },
]

type CartItem = {
  label: string
  price: number
  quantity: number
}

export default function AnalysesPage() {
  const [patientName, setPatientName] = useState("")
  const [selectedAnalysis, setSelectedAnalysis] = useState(analyses[0].label)
  const [cart, setCart] = useState<CartItem[]>([])

  const router = useRouter()

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  function handleAddToCart() {
    const analysis = analyses.find(a => a.label === selectedAnalysis)
    if (!analysis) return

    setCart(prev => {
      const exists = prev.find(item => item.label === analysis.label)
      if (exists) {
        return prev.map(item =>
          item.label === analysis.label
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...analysis, quantity: 1 }]
      }
    })
  }

  function handleProceedToPayment() {
    if (!patientName || cart.length === 0) {
      alert("Veuillez entrer un nom de patient et ajouter au moins une analyse.")
      return
    }

    localStorage.setItem("analyse-patient", JSON.stringify({ patientName, cart }))
    router.push("/payment")
  }

  function handleRemoveItem(label: string) {
    setCart(prev => prev.filter(item => item.label !== label))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50">
      {/* Top-bar */}
      <div className="bg-white shadow sticky top-0 z-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2 text-blue-700">
          <FaFlask className="text-xl" />
          <h1 className="text-2xl font-bold">Analyses Médicales</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          {/* Patient Name */}
          <input
            type="text"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            placeholder="Nom complet du patient"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Sélection & bouton */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <select
              value={selectedAnalysis}
              onChange={e => setSelectedAnalysis(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md p-3"
            >
              {analyses.map(analysis => (
                <option key={analysis.label} value={analysis.label}>
                  {analysis.label} – {analysis.price.toLocaleString()} F CFA
                </option>
              ))}
            </select>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Panier */}
        {cart.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-blue-100 transition">
            <h2 className="font-semibold text-gray-700 text-lg mb-4">🧾 Détails du panier</h2>
            <ul className="divide-y divide-gray-200 mb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-medium">{item.label}</span>
                    {item.quantity > 1 && (
                      <span className="ml-2 text-sm text-gray-500">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{(item.price * item.quantity).toLocaleString()} F CFA</span>
                    <button
                      onClick={() => handleRemoveItem(item.label)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-lg font-bold text-right mb-4">
              Total : {total.toLocaleString()} F CFA
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <span>Payer maintenant</span> <MdNavigateNext size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
