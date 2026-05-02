import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    let filtered = [...books];

    if (search) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== "All") {
      filtered = filtered.filter((book) => book.category === category);
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
