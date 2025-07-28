"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface WizardNavigationProps {
  onPrev?: () => void
  onNext?: () => void
  onCancel?: () => void
  onSubmit?: () => void
  showPrev?: boolean
  showNext?: boolean
  showCancel?: boolean
  showSubmit?: boolean
  isLoading?: boolean
  nextLabel?: string
  submitLabel?: string
}

export function WizardNavigation({
  onPrev,
  onNext,
  onCancel,
  onSubmit,
  showPrev = false,
  showNext = false,
  showCancel = false,
  showSubmit = false,
  isLoading = false,
  nextLabel = "Siguiente",
  submitLabel = "Guardar",
}: WizardNavigationProps) {
  return (
    <div className="flex gap-3 pt-8">
      {showCancel && (
        <Button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300"
        >
          Cancelar
        </Button>
      )}

      {showPrev && (
        <Button
          type="button"
          onClick={onPrev}
          className="px-6 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300"
        >
          Volver
        </Button>
      )}

      {showNext && (
        <Button
          type="button"
          onClick={onNext}
          className="px-6 py-2 text-white rounded hover:opacity-90"
          style={{ backgroundColor: "#12172f" }}
        >
          {nextLabel}
        </Button>
      )}

      {showSubmit && (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="px-6 py-2 text-white rounded hover:opacity-90"
          style={{ backgroundColor: "#12172f" }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      )}
    </div>
  )
}
