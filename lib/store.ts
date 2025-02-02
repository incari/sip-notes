import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export interface Coffee {
  id: string
  name: string
  roastery?: string
  country?: string
  region?: string
  farmName?: string
  variety?: string
  processingMethod?: string
  altitude?: string
  harvestYear?: string
  roastLevel?: string
  flavorNotes?: string
  certification?: string
  price?: string
  imageUrl?: string
  image?: File
}

export interface Tasting {
  id: string
  coffeeId: string
  date: string
  brewingMethod?: string
  rating?: number
  flavorNotes?: string
  acidity?: string
  body?: string
  bitterness?: string
  sweetness?: string
  aftertaste?: string
  notes?: string
}

interface CoffeeStore {
  coffees: Coffee[]
  tastings: Tasting[]
  addCoffee: (coffee: Omit<Coffee, "id">) => void
  updateCoffee: (id: string, coffee: Partial<Coffee>) => void
  deleteCoffee: (id: string) => void
  addTasting: (tasting: Omit<Tasting, "id">) => void
  updateTasting: (id: string, tasting: Partial<Tasting>) => void
  deleteTasting: (id: string) => void
}

export const useStore = create<CoffeeStore>((set) => ({
  coffees: [
    {
      id: "1",
      name: "Ethiopian Yirgacheffe",
      roastery: "Awesome Roasters",
      country: "Ethiopia",
      region: "Yirgacheffe",
      processingMethod: "Washed",
      roastLevel: "Light",
      flavorNotes: "Floral, citrus, tea-like",
    },
    {
      id: "2",
      name: "Colombian Supremo",
      roastery: "Cool Beans Co.",
      country: "Colombia",
      region: "Huila",
      processingMethod: "Washed",
      roastLevel: "Medium",
      flavorNotes: "Chocolate, nuts, caramel",
    },
  ],
  tastings: [],
  addCoffee: (coffee) => {
    const id = uuidv4()
    set((state) => ({
      coffees: [...state.coffees, { ...coffee, id }],
    }))
  },
  updateCoffee: (id, updatedCoffee) =>
    set((state) => ({
      coffees: state.coffees.map((coffee) => (coffee.id === id ? { ...coffee, ...updatedCoffee } : coffee)),
    })),
  deleteCoffee: (id) =>
    set((state) => ({
      coffees: state.coffees.filter((coffee) => coffee.id !== id),
    })),
  addTasting: (tasting) =>
    set((state) => ({
      tastings: [...state.tastings, { ...tasting, id: uuidv4() }],
    })),
  updateTasting: (id, updatedTasting) =>
    set((state) => ({
      tastings: state.tastings.map((tasting) => (tasting.id === id ? { ...tasting, ...updatedTasting } : tasting)),
    })),
  deleteTasting: (id) =>
    set((state) => ({
      tastings: state.tastings.filter((tasting) => tasting.id !== id),
    })),
}))

