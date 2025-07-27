"use client"

import { useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      console.error(`Error reading localStorage key "${key}"`)
      return initialValue
    }
  })

  // Función para actualizar el estado y localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch {
      console.error(`Error setting localStorage key "${key}"`)
    }
  }

  // Función para remover el item
  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
      }
    } catch {
      console.error(`Error removing localStorage key "${key}"`)
    }
  }

  return [storedValue, setValue, removeValue] as const
}
