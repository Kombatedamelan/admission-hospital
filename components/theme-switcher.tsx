"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [themeColor, setThemeColor] = useState("gray") // Par défaut : gris anthracite

  // Éviter les problèmes d'hydratation
  useEffect(() => {
    setMounted(true)
    // Déterminer la couleur du thème à partir du thème actuel
    if (theme?.startsWith("gray")) setThemeColor("gray")
    else if (theme?.startsWith("cyan")) setThemeColor("cyan")
  }, [theme])

  if (!mounted) return null

  const isDark = resolvedTheme?.includes("dark")

  const toggleLightDark = () => {
    if (themeColor === "gray") {
      setTheme(isDark ? "gray-light" : "gray-dark")
    } else {
      setTheme(isDark ? "cyan-light" : "cyan-dark")
    }
  }

  const handleThemeColorChange = (value: string) => {
    setThemeColor(value)
    setTheme(value === "gray" ? "gray-light" : "cyan-light")
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={themeColor} onValueChange={handleThemeColorChange}>
        <SelectTrigger className="w-[120px] border-primary bg-background text-foreground">
          <SelectValue placeholder="Thème" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gray">Gris</SelectItem>
          <SelectItem value="cyan">Cyan</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleLightDark}
        className="border-primary bg-background text-foreground hover:bg-secondary"
      >
        {isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}