"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "@/shared/types/auth.types"
import { AuthUseCases } from "@/core/domain/use-cases/auth-use-cases"
import { AuthRepositoryImpl } from "@/core/infrastructure/repositories/auth-repository-impl"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Factory function para crear instancias
function createAuthUseCases() {
  return new AuthUseCases(new AuthRepositoryImpl())
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario autenticado al cargar la aplicación
    const initializeAuth = () => {
      try {
        const authUseCases = createAuthUseCases()
        const currentUser = authUseCases.getCurrentUser()
        const token = authUseCases.getToken()

        if (currentUser && token) {
          setUser(currentUser)
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
        // Limpiar datos corruptos
        const authUseCases = createAuthUseCases()
        authUseCases.logout()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true)
      const authUseCases = createAuthUseCases()
      const response = await authUseCases.login({ email, password })
      setUser(response.user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const authUseCases = createAuthUseCases()
      await authUseCases.logout()
      setUser(null)
    } catch (error) {
      console.error("Error during logout:", error)
      // Continuar con logout local
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const hasPermission = (permission: string): boolean => {
    const authUseCases = createAuthUseCases()
    return authUseCases.hasPermission(permission)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
