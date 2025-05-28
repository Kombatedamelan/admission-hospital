"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { FaPrint } from "react-icons/fa"
import dayjs from "dayjs"

const fakeData = [
  { name: "Alice K.", date: "2025-05-27", analyses: 3, price: 21000 },
  { name: "Bob T.", date: "2025-05-26", analyses: 2, price: 12000 },
  { name: "Chantal N.", date: "2025-05-20", analyses: 4, price: 24000 },
  { name: "David M.", date: "2025-05-01", analyses: 1, price: 5000 },
  { name: "Elise O.", date: "2025-05-15", analyses: 5, price: 30000 },
  { name: "Fabrice G.", date: "2025-05-25", analyses: 2, price: 14000 },
  { name: "Gisèle B.", date: "2025-05-27", analyses: 1, price: 7000 },
  { name: "Henri Z.", date: "2025-04-28", analyses: 3, price: 21000 },
  { name: "Isaac L.", date: "2025-05-02", analyses: 2, price: 13000 },
]

const filters = ["Aujourd'hui", "Hier", "Cette semaine", "Ce mois", "Tout"]

export default function HistoriqueAnalysesPage() {
  const [search, setSearch] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Tout")
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5
  const router = useRouter()

  const filteredData = useMemo(() => {
    const today = dayjs()
    return fakeData
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) => {
        const date = dayjs(item.date)
        if (selectedFilter === "Aujourd'hui") return date.isSame(today, "day")
        if (selectedFilter === "Hier") return date.isSame(today.subtract(1, "day"), "day")
        if (selectedFilter === "Cette semaine") return date.isSame(today, "week")
        if (selectedFilter === "Ce mois") return date.isSame(today, "month")
        return true
      })
  }, [search, selectedFilter])

  const totalPages = Math.ceil(filteredData.length / perPage)
  const displayedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white shadow sticky top-0 z-50 border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Historique d&apos;analyses</h1>
          <button
            onClick={() => router.push("/analyse")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Nouvelle analyse
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Rechercher par nom..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full md:w-1/2 border border-gray-300 rounded-md p-2"
          />

          <select
            value={selectedFilter}
            onChange={(e) => {
              setSelectedFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full md:w-1/3 border border-gray-300 rounded-md p-2"
          >
            {filters.map((filter) => (
              <option key={filter}>{filter}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom du patient</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Nombre d&apos;analyses</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Prix total</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedData.length > 0 ? (
                displayedData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{dayjs(item.date).format("DD/MM/YYYY")}</td>
                    <td className="px-4 py-3">{item.analyses}</td>
                    <td className="px-4 py-3">{item.price.toLocaleString()} F CFA</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800" title="Imprimer">
                        <FaPrint />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Aucun résultat
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Précédent
            </button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
