"use client"

interface WizardTabsProps {
  currentStep: number
  onStepClick: (step: number) => void
}

const STEPS = [
  { id: 1, name: "Configuración cliente" },
  { id: 2, name: "Colegios" },
  { id: 3, name: "Usuarios" },
  { id: 4, name: "Resumen" },
] as const

export function WizardTabs({ currentStep, onStepClick }: WizardTabsProps) {
  return (
    <div className="bg-white">
      <div className="flex">
        {STEPS.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
              currentStep === step.id
                ? "bg-gray-200 border-gray-400 text-gray-800"
                : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-150"
            } ${index === 0 ? "" : "border-l border-gray-300"}`}
            style={{
              backgroundColor: currentStep === step.id ? "#e5e5e5" : "#f0f0f0",
            }}
          >
            {step.name}
          </button>
        ))}
      </div>
    </div>
  )
}
