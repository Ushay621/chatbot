"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // 👇 yahan aapka fetch wala code use hoga
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Call API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: input }), // 👈 yahan "messages" bhej rahe hain
    });

    const data = await res.json();
    console.log(data.output); // 👈 Gemini ka reply console me dikhayega

    // Add bot reply
    const botMsg = { role: "bot", text: data.output };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💬 Gemini Chatbot</h1>

      {/* Chat window */}
      <div className="border rounded p-3 h-96 overflow-y-auto mb-3 bg-white">
        {messages.map((m, i) => (
          <p key={i} className={m.role === "user" ? "text-blue-600" : "text-green-600"}>
            <b>{m.role}:</b> {m.text}
          </p>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 rounded">Send</button>
      </form>
    </main>
  );
}
