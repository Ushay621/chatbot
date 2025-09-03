// ./src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define the expected request structure
interface ChatRequest {
  messages: string[];
}

// Define the response structure
interface ChatResponse {
  reply: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const data: ChatRequest = await req.json();

    // Example: Generate a simple reply
    const replyMessage = `You sent ${data.messages.length} message(s)`;

    const response: ChatResponse = { reply: replyMessage };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { reply: "Something went wrong!" },
      { status: 500 }
    );
  }
}
