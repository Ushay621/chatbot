import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Example: message extract karna
    const message: string = body?.messages || "No input provided";

    // Yahan tum apna Gemini ya chatbot logic likh sakte ho
    const reply = `You said: ${message}`;

    return NextResponse.json({ output: reply });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
