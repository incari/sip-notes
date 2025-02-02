import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { Coffee } from "@/lib/store";

// Mock database
const coffees: Coffee[] = [];

export async function GET() {
  return NextResponse.json(coffees);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const coffee = Object.fromEntries(formData) as Partial<Coffee>;

  // Handle image upload
  const image = formData.get("image") as File;
  if (image) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = `${Date.now()}-${image.name}`;
    const imagePath = path.join(process.cwd(), "public", "uploads", imageName);
    await writeFile(imagePath, buffer);
    coffee.imageUrl = `/uploads/${imageName}`;
  }

  coffee.id = Date.now().toString();
  coffees.push(coffee as Coffee);

  return NextResponse.json(coffee, { status: 201 });
}
