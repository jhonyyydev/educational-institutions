"use client"

import { useEffect, useState } from "react"
import { FormField, TextInput, SelectInput } from "../../forms/form-field"
import { WizardNavigation } from "../wizar-navigation"
import type { Region, Commune } from "@/shared/types/location.types"
import type { InstitutionStepData } from "@/core/presentation/hooks/use-institutions-wizar"

interface InstitutionStepProps {
  form: any
  regions: Region[]
  getCommunes: (regionId: number) => Commune[]
  institutionData: InstitutionStepData
  onNext: () => void
  onCancel: () => void
}

export function InstitutionStep({
  form,
  regions,
  getCommunes,
  institutionData,
  onNext,
  onCancel,
}: InstitutionStepProps) {
  const [selectedRegion, setSelectedRegion] = useState<number>(institutionData.region_id || 0)
  const [selectedCommune, setSelectedCommune] = useState<number>(institutionData.commune_id || 0)

  useEffect(() => {
    if (institutionData.region_id) {
      setSelectedRegion(institutionData.region_id)
    }
    if (institutionData.commune_id) {
      setSelectedCommune(institutionData.commune_id)
    }
  }, [institutionData.region_id, institutionData.commune_id])

  const regionOptions = regions.map((region) => ({
    value: region.id.toString(),
    label: region.name,
  }))

  const communeOptions = getCommunes(selectedRegion).map((commune) => ({
    value: commune.id.toString(),
    label: commune.name,
  }))

  return (
    <div className="w-full min-h-screen flex flex-col">
      <form onSubmit={form.handleSubmit(onNext)} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          {/* Primera fila: Nombre y RUT */}
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Nombre" required error={form.formState.errors.name?.message}>
              <TextInput placeholder="Nombre de la institución" register={form.register("name")} />
            </FormField>

            <FormField
              label="RUT"
              required
              error={form.formState.errors.rut?.message}
              helpText="Formato: 12345678-9 (sin puntos)"
            >
              <TextInput placeholder="12345678-9" register={form.register("rut")} />
            </FormField>
          </div>

          {/* Segunda fila: Región, Comuna y Dirección */}
          <div className="grid grid-cols-3 gap-6">
            <FormField label="Región" required error={form.formState.errors.region_id?.message}>
              <SelectInput
                placeholder="Seleccionar región"
                value={selectedRegion > 0 ? selectedRegion.toString() : ""}
                options={regionOptions}
                onValueChange={(value) => {
                  const regionId = Number.parseInt(value)
                  setSelectedRegion(regionId)
                  setSelectedCommune(0) // Reset commune when region changes
                  form.setValue("region_id", regionId)
                  form.setValue("commune_id", 0)
                  form.clearErrors("region_id")
                }}
              />
            </FormField>

            <FormField label="Comuna" required error={form.formState.errors.commune_id?.message}>
              <SelectInput
                placeholder="Seleccionar comuna"
                value={selectedCommune > 0 ? selectedCommune.toString() : ""}
                options={communeOptions}
                disabled={!selectedRegion}
                onValueChange={(value) => {
                  const communeId = Number.parseInt(value)
                  setSelectedCommune(communeId)
                  form.setValue("commune_id", communeId)
                  form.clearErrors("commune_id")
                }}
              />
            </FormField>

            <FormField label="Dirección" required error={form.formState.errors.address?.message}>
              <TextInput placeholder="Dirección completa" register={form.register("address")} />
            </FormField>
          </div>

          {/* Tercera fila: Teléfono y Fecha de inicio (con espacio para 3 items) */}
          <div className="grid grid-cols-3 gap-6">
            <FormField label="Teléfono">
              <TextInput placeholder="+56 9 1234 5678" register={form.register("phone")} />
            </FormField>

            <FormField label="Fecha de inicio" required error={form.formState.errors.start_date?.message}>
              <TextInput type="date" register={form.register("start_date")} />
            </FormField>

            <div></div>
          </div>
        </div>

        {/* Botones en la parte inferior */}
        <div className="mt-auto mb-36 pt-8">
          <WizardNavigation showCancel showNext onCancel={onCancel} onNext={onNext} />
        </div>
      </form>
    </div>
  )
}
