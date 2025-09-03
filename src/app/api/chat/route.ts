// ./src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Request type
interface ChatRequest {
  messages: string[];
}

// Response type
interface ChatResponse {
  reply: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body with proper type
    const data: ChatRequest = await req.json();

    // Generate response
    const response: ChatResponse = {
      reply: `You sent ${data.messages.length} message(s)`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ reply: "Something went wrong!" }, { status: 500 });
  }
}
