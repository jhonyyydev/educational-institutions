"use client"

import { useAuth } from "@/core/presentation/contexts/auth-context"
import { useInstitutions, useInstitutionFilters } from "@/core/presentation/hooks/use-institutions"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { InstitutionsTable } from "@/components/institutions/institutions-table"
import { SearchBar } from "@/components/ui/search-bar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { filters, updateFilters } = useInstitutionFilters()
  const { data: institutionsData, isLoading, error } = useInstitutions(filters)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  const handleSearch = (searchTerm: string) => {
    updateFilters({ search: searchTerm, page: 1 })
  }

  const handlePageChange = (page: number) => {
    updateFilters({ page })
  }

  const handlePerPageChange = (perPage: number) => {
    updateFilters({ per_page: perPage, page: 1 })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header con búsqueda y botón nuevo */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar placeholder="Buscar" onSearch={handleSearch} className="w-full" />
            </div>
            <Button
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-2 rounded-lg"
              onClick={() => router.push("/dashboard/institutions/new")}
            >
              <Plus className="w-4 h-4 mr-2" />+ Nuevo
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">Error al cargar las instituciones: {error.message}</p>
            </div>
          ) : (
            <InstitutionsTable
              data={institutionsData?.data || []}
              meta={institutionsData?.meta}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
