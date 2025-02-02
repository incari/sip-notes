import CoffeeList from "./components/CoffeeList"
import RecentTastings from "./components/RecentTastings"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Coffee, PlusCircle } from "lucide-react"
import FloatingActionButton from "./components/FloatingActionButton"

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2C1810] dark:text-white">My Coffees</h1>
          <Link href="/add-coffee">
            <Button className="flex items-center space-x-2">
              <Coffee className="h-4 w-4" />
              <span>Add Coffee</span>
            </Button>
          </Link>
        </div>
        <CoffeeList />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2C1810] dark:text-white">Recent Tastings</h2>
          <Link href="/add-tasting">
            <Button className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Tasting</span>
            </Button>
          </Link>
        </div>
        <RecentTastings />
      </section>

      <FloatingActionButton />
    </div>
  )
}

