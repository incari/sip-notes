"use client"

import { useStore, type Coffee } from "@/lib/store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CoffeeIcon, Edit, Trash2 } from "lucide-react"

export default function CoffeeList() {
  const coffees = useStore((state) => state.coffees)
  const deleteCoffee = useStore((state) => state.deleteCoffee)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coffees.map((coffee: Coffee) => (
        <Card
          key={coffee.id}
          className="bg-white dark:bg-[#1F1007] shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Link href={`/coffee/${coffee.id}`}>
            <CardHeader className="bg-[#2C1810] text-white p-4 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <CoffeeIcon className="h-6 w-6" />
                <span>{coffee.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Roastery:</strong> {coffee.roastery}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Origin:</strong> {coffee.country}, {coffee.region}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Process:</strong> {coffee.processingMethod}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Roast Level:</strong> {coffee.roastLevel}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Flavor Notes:</strong> {coffee.flavorNotes}
              </p>
              {coffee.image && (
                <img
                  src={URL.createObjectURL(coffee.image) || "/placeholder.svg"}
                  alt={coffee.name}
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
              )}
            </CardContent>
          </Link>
          <CardFooter className="flex justify-between p-4 bg-gray-50 dark:bg-[#2C1810]/20 rounded-b-lg">
            <Link href={`/edit-coffee/${coffee.id}`}>
              <Button variant="outline" className="flex items-center space-x-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={() => deleteCoffee(coffee.id)}
              className="flex items-center space-x-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

