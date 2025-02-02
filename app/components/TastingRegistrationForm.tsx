"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore, type Tasting, type Coffee } from "@/lib/store"
import { Star, Plus, Minus } from "lucide-react"

export default function TastingRegistrationForm() {
  const { toast } = useToast()
  const router = useRouter()
  const addTasting = useStore((state) => state.addTasting)
  const coffees = useStore((state) => state.coffees)

  const [tasting, setTasting] = useState<Partial<Tasting>>({
    date: new Date().toISOString().split("T")[0],
    brewingMethod: "",
    rating: 0,
    flavorNotes: "",
    acidity: "",
    body: "",
    bitterness: "",
    sweetness: "",
    aftertaste: "",
    notes: "",
  })

  const [image, setImage] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTasting({ ...tasting, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setTasting({ ...tasting, [name]: value })
  }

  const handleRatingChange = (newRating: number) => {
    setTasting({ ...tasting, rating: newRating })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tasting.coffeeId) {
      toast({
        title: "Error",
        description: "Please select a coffee",
        variant: "destructive",
      })
      return
    }

    const tastingData = { ...tasting }
    if (image) {
      tastingData.image = image
    }

    addTasting(tastingData as Tasting)
    toast({
      title: "Success",
      description: "Tasting added successfully",
    })
    router.push("/")
  }

  const brewingMethods = ["V60", "Chemex", "French Press", "AeroPress", "Espresso", "Moka Pot"]

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Add New Tasting</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="coffeeId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Coffee
              </Label>
              <Select name="coffeeId" onValueChange={(value) => handleSelectChange("coffeeId", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select coffee" />
                </SelectTrigger>
                <SelectContent>
                  {coffees.map((coffee: Coffee) => (
                    <SelectItem key={coffee.id} value={coffee.id}>
                      {coffee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </Label>
              <Input id="date" name="date" type="date" value={tasting.date} onChange={handleChange} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="brewingMethod" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Brewing Method
              </Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {brewingMethods.map((method) => (
                  <Button
                    key={method}
                    type="button"
                    variant={tasting.brewingMethod === method ? "default" : "outline"}
                    onClick={() => handleSelectChange("brewingMethod", method)}
                    className="text-sm"
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="rating" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rating
              </Label>
              <div className="mt-1 flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer ${
                      star <= (tasting.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRatingChange(Math.max((tasting.rating || 0) - 0.5, 0))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRatingChange(Math.min((tasting.rating || 0) + 0.5, 5))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-2">{tasting.rating?.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <Label htmlFor="acidity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Acidity
              </Label>
              <Select name="acidity" onValueChange={(value) => handleSelectChange("acidity", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select acidity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="body" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Body
              </Label>
              <Select name="body" onValueChange={(value) => handleSelectChange("body", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select body" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="full">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bitterness" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bitterness
              </Label>
              <Select name="bitterness" onValueChange={(value) => handleSelectChange("bitterness", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select bitterness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sweetness" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sweetness
              </Label>
              <Select name="sweetness" onValueChange={(value) => handleSelectChange("sweetness", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select sweetness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="flavorNotes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Flavor Notes
            </Label>
            <Textarea
              id="flavorNotes"
              name="flavorNotes"
              value={tasting.flavorNotes}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="aftertaste" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Aftertaste
            </Label>
            <Textarea
              id="aftertaste"
              name="aftertaste"
              value={tasting.aftertaste}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Notes
            </Label>
            <Textarea id="notes" name="notes" value={tasting.notes} onChange={handleChange} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Image
            </Label>
            <Input id="image" name="image" type="file" onChange={handleImageUpload} className="mt-1" accept="image/*" />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
          >
            Add Tasting
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

