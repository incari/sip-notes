import TastingsList from "../components/TastingsList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function Tastings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2C1810] dark:text-white">All Tastings</h1>
        <Link href="/add-tasting">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Tasting</span>
          </Button>
        </Link>
      </div>
      <TastingsList />
    </div>
  )
}

