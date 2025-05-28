// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"
import  AppSidebar  from "@/components/sidebar"
import { Toaster } from "@/components/ui/sonner"
import "../globals.css"

export const metadata = {
  title: "CHR Caisse",
  description: "Gestion de la caisse hospitalière",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex">
              <AppSidebar />
              <main className="flex-1 p-6">
                {children}   
                <Toaster />
              </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
