import { Coffee } from "@/lib/store";
import { NextResponse } from "next/server";

// Mock database
const coffees: Coffee[] = [];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const coffee = coffees.find((c) => c.id === params.id);
  if (!coffee) {
    return NextResponse.json({ error: "Coffee not found" }, { status: 404 });
  }
  return NextResponse.json(coffee);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedCoffee = await request.json();
  const index = coffees.findIndex((c) => c.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Coffee not found" }, { status: 404 });
  }
  coffees[index] = { ...coffees[index], ...updatedCoffee };
  return NextResponse.json(coffees[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = coffees.findIndex((c) => c.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Coffee not found" }, { status: 404 });
  }
  coffees.splice(index, 1);
  return NextResponse.json({ message: "Coffee deleted successfully" });
}
