"use client"

import {
  Home,
  FolderPlus,
  FileHeart,
  FlaskConical,
  History,
  Search,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const items = [
  { title: "Tableau de bord", url: "/dashboard", icon: Home },
  { title: "Nouvelle consultation", url: "/consultation", icon: FolderPlus },
  { title: "Consultations", url: "/history/consultation", icon: History },
  { title: "Nouveaux soins", url: "/acte", icon: FileHeart },
  { title: "Soins", url: "/history/acte", icon: History },
  { title: "Nouvelle analyse", url: "/analyse", icon: FlaskConical },
  { title: "Analyses", url: "/history/analyse", icon: History },
  { title: "Rechercher", url: "/dashboard/search", icon: Search },
  { title: "Paramètres", url: "/dashboard/settings", icon: Settings },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-800">
        <div className="text-lg font-bold text-blue-700 dark:text-blue-400">CHR Caisse</div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar container */}
      <aside
        className={cn(
          "z-50 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 shadow-lg transition-transform duration-300 ease-in-out",
          "w-64 h-screen fixed md:sticky top-0 left-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Desktop logo */}
        <div className="p-6 text-xl font-bold text-gray-900 dark:text-white hidden md:block">
          CHR <span className="text-blue-600 dark:text-blue-400">Caisse</span>
        </div>

        {/* Sidebar items */}
        <nav className="flex-1 px-3 space-y-1 pt-4 md:pt-0 overflow-y-auto h-[calc(100vh-160px)]">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                )}
                onClick={() => setIsOpen(false)} // mobile close
              >
                <item.icon size={18} />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Actions (theme + logout) */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-700 space-y-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 justify-start text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-zinc-800"
            >
              <LogOut size={18} />
              Déconnexion
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full flex items-center gap-2 justify-start hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            {theme === "dark" ? (
              <>
                <Sun size={18} className="text-yellow-400" />
                <span>Mode clair</span>
              </>
            ) : (
              <>
                <Moon size={18} className="text-blue-500" />
                <span>Mode sombre</span>
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}
