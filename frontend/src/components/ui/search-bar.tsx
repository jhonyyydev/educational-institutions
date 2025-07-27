"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  onSearch: (value: string) => void
  className?: string
}

export function SearchBar({ placeholder = "Buscar...", onSearch, className }: SearchBarProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    const timeoutId = setTimeout(() => onSearch(newValue), 300)
    return () => clearTimeout(timeoutId)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input type="text" placeholder={placeholder} value={value} onChange={handleChange} className="pl-10" />
    </form>
  )
}
