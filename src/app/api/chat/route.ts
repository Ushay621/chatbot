import { GoogleGenerativeAI } from "@google/generative-ai";

// Next.js App Router POST handler
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Init Gemini with API Key from .env.local
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Choose Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Call model with user messages
    const result = await model.generateContent(messages);

    // Send back response
    return new Response(
      JSON.stringify({ output: result.response.text() }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message ?? "unknown" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
