// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"
import AppSidebar from "@/components/sidebar"
import "../globals.css"

export const metadata = {
  title: "CHR Caisse",
  description: "Gestion de la caisse hospitalière",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          value={[
            "gray-light",
            "gray-dark",
            "cyan-light",
            "cyan-dark",
            "pastel-warm-light",
            "pastel-warm-dark",
            "lavender-blue-light",
            "lavender-blue-dark",
          ]}
        >
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
