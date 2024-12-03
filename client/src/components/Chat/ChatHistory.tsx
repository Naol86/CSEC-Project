"use client";
import { useMainStore } from "@/lib/store/mainStore";
import { Chat } from "@/types/chat.type";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";

export default function ChatHistory({ chat }: { chat: Chat }) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const { setCurrentChat, currentChatId } = useMainStore();

  const handleClick = () => {
    setCurrentChat(chat.id);
  };

  return (
    <div
      className={`${
        currentChatId === chat.id ? "bg-white/10" : ""
      } chat-item group flex items-center justify-between px-3 py-2 rounded-xl border-b border-b-white/10 hover:bg-white/10 cursor-pointer relative`}
      onMouseEnter={() => setHoveredChat(chat.id)}
      onMouseLeave={() => setHoveredChat(null)}
      onClick={handleClick}
    >
      {/* Chat Title */}
      <p className="truncate text-[12px] grow">{chat.title}</p>

      {/* Hover Content */}
      {(hoveredChat === chat.id || currentChatId === chat.id) && (
        <div
          className="absolute -top-1.5 h-[110%] flex items-center right-0 mt-1 px-2 py-1 text-white text-xs rounded-md shadow-md"
          style={{
            background:
              "linear-gradient(to left, rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.8))",
          }}
        >
          <p className="text-semibold">
            <Ellipsis size={24} onClick={() => alert(chat.id)} />
          </p>
        </div>
      )}
    </div>
  );
}
