"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Lock, Loader2 } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const [phone, setPhone] = useState("12345678")
  const [password, setPassword] = useState("password")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!phone || !password) {
      setError("Veuillez remplir tous les champs.")
      setIsLoading(false)
      return
    }

    // Simulation de login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <Card className="w-full max-w-sm shadow-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-blue-900 dark:text-blue-400">
            Connexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="phone"
                className="text-gray-700 dark:text-gray-300"
              >
                Numéro de téléphone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="pl-10 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 italic">
                Telephone : 12345678
              </p>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-300"
              >
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 italic">
                Mot de passe : password
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-200 text-blue-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
