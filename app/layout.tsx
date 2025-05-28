import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeSwitcher } from "@/components/theme-switcher";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CHR Pharmacie",
  description: "Application de gestion de caisse et pharmacie",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={poppins.variable}
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="gray-light"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              {/* <h1 className="text-xl font-semibold">CHR Pharmacie</h1> */}
              {/* <ThemeSwitcher /> */}
            </div>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}