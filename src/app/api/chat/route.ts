// ./src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// Define the request structure
interface ChatRequest {
  messages: string[];
}

// Define the response structure
interface ChatResponse {
  reply: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body with correct type
    const data: ChatRequest = await req.json();

    // Example: Generate a reply based on input messages
    const replyMessage = `You sent ${data.messages.length} message(s).`;

    // Prepare response
    const response: ChatResponse = { reply: replyMessage };

    // Return response as JSON
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);

    // Return error response
    return NextResponse.json(
      { reply: "Something went wrong!" },
      { status: 500 }
    );
  }
}
