"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

export default function TastingsList() {
  const tastings = useStore((state) => state.tastings)
  const coffees = useStore((state) => state.coffees)

  const getCoffeeName = (coffeeId: string) => {
    const coffee = coffees.find((c) => c.id === coffeeId)
    return coffee?.name || "Unknown Coffee"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tastings.map((tasting) => (
        <Link key={tasting.id} href={`/tastings/${tasting.id}`}>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="bg-[#2C1810] text-white p-4 rounded-t-lg">
              <CardTitle className="text-lg">{getCoffeeName(tasting.coffeeId)}</CardTitle>
              <p className="text-sm opacity-80">{new Date(tasting.date).toLocaleDateString()}</p>
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
        </Link>
      ))}
    </div>
  )
}

