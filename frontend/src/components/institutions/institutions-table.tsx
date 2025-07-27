"use client"

import { useState } from "react"
import type { Institution } from "@/shared/types/institution.types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { Checkbox } from "@/components/ui/checkbox"

interface InstitutionsTableProps {
  data: Institution[]
  meta?: {
    total: number
    per_page: number
    current_page: number
    last_page: number
  }
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  isLoading?: boolean
}

export function InstitutionsTable({ data, meta, onPageChange, onPerPageChange, isLoading }: InstitutionsTableProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(data.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    }
  }

  // Simular estados para las instituciones (ya que la API no los proporciona)
  const getRandomStatus = (id: number) => {
    const statuses = ["Aceptado", "En proceso", "Rechazado"]
    return statuses[id % 3]
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tabla */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-200">
              <TableHead className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedItems.length === data.length && data.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-medium text-gray-700">ID</TableHead>
              <TableHead className="px-4 py-3 text-left font-medium text-gray-700">Cliente</TableHead>
              <TableHead className="px-4 py-3 text-left font-medium text-gray-700">Estado</TableHead>
              <TableHead className="px-4 py-3 text-left font-medium text-gray-700">Responsable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((institution, index) => (
              <TableRow key={institution.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <TableCell className="px-4 py-4">
                  <Checkbox
                    checked={selectedItems.includes(institution.id)}
                    onCheckedChange={(checked) => handleSelectItem(institution.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="px-4 py-4 text-gray-900 font-medium">{institution.id}</TableCell>
                <TableCell className="px-4 py-4 text-gray-900">{institution.name}</TableCell>
                <TableCell className="px-4 py-4">
                  <StatusBadge status={getRandomStatus(institution.id)} />
                </TableCell>
                <TableCell className="px-4 py-4 text-gray-600">{institution.responsible.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer con paginación */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedItems.length} de {data.length} elemento(s) seleccionadas
          </div>

          {meta && (
            <CustomPagination
              currentPage={meta.current_page}
              totalPages={meta.last_page}
              perPage={meta.per_page}
              total={meta.total}
              onPageChange={onPageChange}
              onPerPageChange={onPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
