import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "./providers"

// Configurar Red Hat Display
const redHatDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/RedHatDisplay-VariableFont_wght.ttf",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/RedHatDisplay-Italic-VariableFont_wght.ttf",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-red-hat-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sistema de Gestión de Instituciones Educativas",
  description: "Plataforma para la gestión de instituciones educativas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={redHatDisplay.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
