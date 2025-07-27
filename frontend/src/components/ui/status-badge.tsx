import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "aceptado":
        return "default" 
      case "en proceso":
        return "secondary"
      case "rechazado":
        return "destructive" 
      default:
        return "outline"
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "aceptado":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "en proceso":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "rechazado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  return (
    <Badge variant={getStatusVariant(status)} className={cn(getStatusStyles(status), className)}>
      {status}
    </Badge>
  )
}
