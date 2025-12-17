import { NextResponse } from "next/server";
import products from "@/src/data/products.json";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = products.find(
    (p: any) => String(p.id) === id
  );

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
