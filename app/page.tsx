"use client";

import React from "react";
import { useChat } from "ai/react";

export default function page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-4 py-2 mt-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
        >
          Send
        </button>
      </form>
    </div>
  );
}
