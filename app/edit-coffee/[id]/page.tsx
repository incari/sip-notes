"use client"

import { useParams } from "next/navigation"
import { useStore } from "@/lib/store"
import CoffeeRegistrationForm from "../../components/CoffeeRegistrationForm"

export default function EditCoffee() {
  const params = useParams()
  const coffees = useStore((state) => state.coffees)
  const coffee = coffees.find((c) => c.id === params.id)

  if (!coffee) {
    return <div>Coffee not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Coffee</h1>
      <CoffeeRegistrationForm initialCoffee={coffee} />
    </div>
  )
}

