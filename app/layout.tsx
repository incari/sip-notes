import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Footer } from "./components/Footer"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SipNotes - Coffee Tasting Journal",
  description: "Track your coffee journey with SipNotes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAF7F5] dark:bg-[#2C1810]`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white dark:bg-[#1F1007] shadow-md">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rb_7108-CgaBRpkpuYbsbhrj4GuZGr2CzoZEJb.png"
                    alt="SipNotes Logo"
                    className="h-8 w-auto"
                  />
                  <span className="font-bold text-xl text-[#2C1810] dark:text-white">SipNotes</span>
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

