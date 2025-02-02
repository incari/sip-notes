"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Coffee, PlusCircle } from "lucide-react"

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 md:hidden">
      <div className={`flex flex-col items-end space-y-2 ${isOpen ? "visible" : "invisible"}`}>
        <Link href="/add-coffee">
          <Button size="icon" className="bg-primary text-white rounded-full shadow-lg">
            <Coffee className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/add-tasting">
          <Button size="icon" className="bg-primary text-white rounded-full shadow-lg">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      <Button size="icon" className="bg-primary text-white rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <PlusCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}

