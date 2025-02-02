"use client"

import { useParams } from "next/navigation"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Star } from "lucide-react"

export default function CoffeeDetail() {
  const params = useParams()
  const coffees = useStore((state) => state.coffees)
  const tastings = useStore((state) => state.tastings)

  const coffee = coffees.find((c) => c.id === params.id)
  const coffeeTastings = tastings.filter((t) => t.coffeeId === params.id)

  if (!coffee) {
    return <div>Coffee not found</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810] dark:text-white mb-2">{coffee.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">by {coffee.roastery}</p>
        </div>
        <Link href={`/add-tasting?coffeeId=${coffee.id}`}>
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Tasting</span>
          </Button>
        </Link>
      </div>

      <Card className="bg-white dark:bg-[#1F1007]">
        <CardHeader>
          <CardTitle>Coffee Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Origin:</strong> {coffee.country}, {coffee.region}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Farm:</strong> {coffee.farmName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Variety:</strong> {coffee.variety}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Process:</strong> {coffee.processingMethod}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Altitude:</strong> {coffee.altitude} MASL
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Harvest Year:</strong> {coffee.harvestYear}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Roast Level:</strong> {coffee.roastLevel}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Price:</strong> {coffee.price} {coffee.currency}/{coffee.weight}g
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Flavor Notes:</strong> {coffee.flavorNotes}
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-[#2C1810] dark:text-white mb-4">Tastings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffeeTastings.map((tasting) => (
            <Card key={tasting.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="bg-[#2C1810] text-white p-4 rounded-t-lg">
                <CardTitle className="text-lg">{new Date(tasting.date).toLocaleDateString()}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (tasting.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Method:</strong> {tasting.brewingMethod}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Acidity:</strong> {tasting.acidity}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Body:</strong> {tasting.body}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Notes:</strong> {tasting.notes}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

