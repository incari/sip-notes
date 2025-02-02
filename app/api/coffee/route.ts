import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

// Mock database
const coffees: any[] = []

export async function GET() {
  return NextResponse.json(coffees)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const coffee = Object.fromEntries(formData)

  // Handle image upload
  const image = formData.get("image") as File
  if (image) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const imageName = `${Date.now()}-${image.name}`
    const imagePath = path.join(process.cwd(), "public", "uploads", imageName)
    await writeFile(imagePath, buffer)
    coffee.imageUrl = `/uploads/${imageName}`
  }

  coffee.id = Date.now().toString()
  coffees.push(coffee)

  return NextResponse.json(coffee, { status: 201 })
}

