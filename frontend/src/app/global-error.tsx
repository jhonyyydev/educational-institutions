"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home } from "lucide-react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.error("Global error:", error)
  }, [error])

  if (!mounted) {
    return (
      <html>
        <body>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center max-w-md px-8">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Error crítico</h1>
            <p className="text-gray-600 text-base mb-8">
              Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
            </p>

            <div className="space-y-4">
              <Button
                onClick={reset}
                className="w-full h-12 text-white font-bold text-base flex items-center justify-center gap-3"
                style={{ backgroundColor: "#12172f" }}
              >
                <RefreshCw className="w-5 h-5" />
                Recargar aplicación
              </Button>

              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="w-full h-12 text-gray-700 font-medium text-base border-2 border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center gap-3"
              >
                <Home className="w-5 h-5" />
                Ir al inicio
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
