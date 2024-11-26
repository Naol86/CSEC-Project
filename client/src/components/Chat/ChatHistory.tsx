"use client";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";

export default function ChatHistory({ id }: { id: number }) {
  const [hoveredChat, setHoveredChat] = useState<number | null>(null);

  return (
    <div
      className="chat-item group flex items-center justify-between p-3 rounded-xl border-b border-b-white/10 hover:bg-white/10 cursor-pointer relative"
      onMouseEnter={() => setHoveredChat(id)}
      onMouseLeave={() => setHoveredChat(null)}
    >
      {/* Chat Title */}
      <p className="truncate text-sm grow">
        something I want to talk with you now and now{" "}
      </p>

      {/* Hover Content */}
      {hoveredChat === id && (
        <div
          className="absolute -top-1.5 h-[110%] flex items-center right-0 mt-1 px-2 py-1 text-white text-xs rounded-md shadow-md"
          style={{
            background:
              "linear-gradient(to left, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.8))",
          }}
        >
          <p className="text-semibold">
            <Ellipsis size={24} onClick={() => alert(id)} />
          </p>
        </div>
      )}
    </div>
  );
}
