import { NextResponse } from "next/server";
import products from "@/src/data/products.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  return NextResponse.json(filtered);
}
