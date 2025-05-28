"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: any) {
  return (
    <NextThemesProvider
      attribute="class"            // nécessaire pour ajouter "dark" ou "light" à <html>
      defaultTheme="system"        // peut être "light", "dark", ou "system"
      enableSystem={true}          // activer le mode basé sur le système
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
