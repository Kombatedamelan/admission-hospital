"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { FaTrash } from "react-icons/fa" // ✅ Ajout de l'icône

const medicalActs = [
  { label: "Injection", price: 5000 },
  { label: "Suture", price: 10000 },
  { label: "Pansement", price: 3000 },
  { label: "Accouchement", price: 25000 },
]

type CartItem = {
  label: string
  price: number
  quantity: number
}

export default function MedicalActsPage() {
  const [patientName, setPatientName] = useState("")
  const [selectedAct, setSelectedAct] = useState(medicalActs[0].label)
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  function handleAddToCart() {
    const act = medicalActs.find(a => a.label === selectedAct)
    if (!act) return

    setCart(prev => {
      const exists = prev.find(item => item.label === act.label)
      if (exists) {
        return prev.map(item =>
          item.label === act.label
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...act, quantity: 1 }]
      }
    })
  }

  function handleRemoveFromCart(label: string) {
    setCart(prev =>
      prev
        .map(item =>
          item.label === label
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  function handleProceedToPayment() {
    if (!patientName || cart.length === 0) {
      alert("Veuillez entrer un nom de patient et ajouter au moins un acte.")
      return
    }

    localStorage.setItem("acte-patient", JSON.stringify({ patientName, cart }))
    router.push("/paiement")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-blue-200 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-700">🩺 Actes Médicaux</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6 max-w-2xl mx-auto space-y-4">
        <div>
            <label
            htmlFor="patientName"
            className="block mb-1 font-semibold text-gray-700 dark:text-gray-300"
            >
            Nom du patient
            </label>
            <input
            id="patientName"
            type="text"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            placeholder="Entrez le nom complet du patient"
            className="w-full border border-gray-300 dark:border-zinc-700 rounded-md p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
            />
        </div>

        <div className="flex gap-3 items-center max-w-2xl">
            <select
            value={selectedAct}
            onChange={e => setSelectedAct(e.target.value)}
            className="flex-grow border border-gray-300 dark:border-zinc-700 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
            >
            {medicalActs.map(act => (
                <option key={act.label} value={act.label}>
                {act.label} – {act.price.toLocaleString()} F CFA
                </option>
            ))}
            </select>

            <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md text-lg transition-colors flex-shrink-0"
            aria-label="Ajouter l’acte médical sélectionné"
            >
            Ajouter
            </button>
        </div>
        </div>


        {cart.length > 0 && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="font-semibold text-gray-700 mb-4">🧾 Panier d’actes médicaux</h2>
            <ul className="space-y-2 mb-4">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center pb-2 text-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    {item.quantity > 1 && (
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      {(item.price * item.quantity).toLocaleString()} F CFA
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(item.label)}
                      className="text-red-500 hover:text-red-700"
                      title="Retirer un"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-lg font-bold text-right mb-4 text-blue-800">
              Total : {total.toLocaleString()} F CFA
            </div>

            <button
              onClick={handleProceedToPayment}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full text-lg"
            >
               Procéder au paiement
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
