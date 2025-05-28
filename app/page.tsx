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
      router.push("/dashboard") // Redirection vers la gestion de caisse
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm shadow-md border border-gray-300 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-primary">Connexion </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="pl-10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
