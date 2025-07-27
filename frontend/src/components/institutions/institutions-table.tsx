"use client"
import type { Institution } from "@/shared/types/institution.types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Checkbox } from "@/components/ui/checkbox"

interface InstitutionsTableProps {
  data: Institution[]
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  selectedItems: number[]
  onSelectionChange: (selectedItems: number[]) => void
}

export function InstitutionsTable({ data, selectedItems, onSelectionChange }: InstitutionsTableProps) {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(data.map((item) => item.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, id])
    } else {
      onSelectionChange(selectedItems.filter((item) => item !== id))
    }
  }

  // Simular estados para las instituciones (ya que la API no los proporciona)
  const getRandomStatus = (id: number) => {
    const statuses = ["Aceptado", "En proceso", "Rechazado"]
    return statuses[id % 3]
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
            {data.map((institution) => (
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
    </div>
  )
}