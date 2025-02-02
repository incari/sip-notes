import CoffeeList from "../components/CoffeeList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MyCoffees() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Coffees</h1>
        <Link href="/add-coffee">
          <Button>➕ Add New Coffee</Button>
        </Link>
      </div>
      <CoffeeList />
    </div>
  )
}

