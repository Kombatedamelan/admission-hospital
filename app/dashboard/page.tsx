"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { StatCard } from "@/components/dashboard/StatCard"
import { DollarSign, Users, FileText, Activity } from "lucide-react"
import { useState, useMemo } from "react"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { Button } from "@/components/ui/button"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekOfYear)

const fakePayments = [
  { id: 1, name: "Alice K.", date: "2025-05-27", amount: 15000 },
  { id: 2, name: "Bob T.", date: "2025-05-26", amount: 8000 },
  { id: 3, name: "Chantal N.", date: "2025-05-20", amount: 24000 },
  { id: 4, name: "David M.", date: "2025-05-01", amount: 5000 },
  { id: 5, name: "Elise O.", date: "2025-05-15", amount: 28000 },
  { id: 6, name: "Fabrice G.", date: "2025-05-25", amount: 18000 },
  { id: 7, name: "Gisèle B.", date: "2025-05-27", amount: 7000 },
  { id: 8, name: "Henri Z.", date: "2025-04-28", amount: 21000 },
  { id: 9, name: "Isaac L.", date: "2025-05-02", amount: 13000 },
]

const dateFilters = ["Aujourd'hui", "Hier", "Cette semaine", "Ce mois", "Tout"]

export default function DashboardLayout() {
  const [search, setSearch] = useState("")
  const [selectedDateFilter, setSelectedDateFilter] = useState("Tout")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalEncaisse = fakePayments.reduce((acc, p) => acc + p.amount, 0)
  const patientsCount = new Set(fakePayments.map((p) => p.name)).size
  const bonsEmis = 42
  const moyenneParPatient = Math.round(totalEncaisse / patientsCount)

  const filteredPayments = useMemo(() => {
    const today = dayjs()

    return fakePayments.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(search.toLowerCase())
      const date = dayjs(p.date)

      let dateMatch = true
      if (selectedDateFilter === "Aujourd'hui") {
        dateMatch = date.isSame(today, "day")
      } else if (selectedDateFilter === "Hier") {
        dateMatch = date.isSame(today.subtract(1, "day"), "day")
      } else if (selectedDateFilter === "Cette semaine") {
        dateMatch = date.week() === today.week() && date.year() === today.year()
      } else if (selectedDateFilter === "Ce mois") {
        dateMatch = date.isSame(today, "month")
      }

      return nameMatch && dateMatch
    })
  }, [search, selectedDateFilter])

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const currentData = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  return (
    <SidebarProvider>
      <main className="pt-10 max-w-6xl mx-auto px-6 space-y-10">

        {/* Top bar sticky */}
        <div className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-blue-200 px-6 py-4 w-full">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Tableau de bord</h1>
          </div>
        </div>


        {/* Statistiques */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            title="Total encaissé"
            value={`${totalEncaisse.toLocaleString()} FCFA`}
            icon={<DollarSign className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Patients encaissés"
            value={patientsCount}
            icon={<Users className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Bons émis"
            value={bonsEmis}
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Moyenne / patient"
            value={`${moyenneParPatient.toLocaleString()} FCFA`}
            icon={<Activity className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
        </section>

        {/* Paiements récents */}
        <section className="bg-white rounded-md shadow-md border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">Paiements récents</h2>

          {/* Filtres */}
          {/* Filtres améliorés */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Rechercher par nom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {dateFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>


          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom du patient</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.length > 0 ? (
                  currentData.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{p.name}</td>
                      <td className="px-4 py-3">{dayjs(p.date).format("DD/MM/YYYY")}</td>
                      <td className="px-4 py-3">{p.amount.toLocaleString()} FCFA</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">
                      Aucun paiement trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages}
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SidebarProvider>
  )
}
