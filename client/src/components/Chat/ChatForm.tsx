"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CircleArrowUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMainStore } from "@/lib/store/mainStore";

type FormData = {
  message: string;
};

export default function ChatForm() {
  const [formData, setFormData] = useState<FormData>({ message: "" });
  const { data: session } = useSession();
  const { addMessage, setCurrentChat, currentChatId, addChat } = useMainStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addMessage({ role: "user", content: formData.message });
    setFormData({ message: "" });

    try {
      const res = await fetch(`http://localhost:8000/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          content: formData.message,
          chat_id: currentChatId,
        }),
      });

      const response = await res.json();

      if (!response.success || !res.ok) {
        return;
      }
      if (!currentChatId) {
        addChat({
          id: response.chat_id,
          title: response.title,
          created_at: response.created_at,
        });
        setCurrentChat(response.chat_id);
      } else {
        addMessage({ role: "system", content: response.data.content });
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setFormData({ message: "" });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto sm:h-[15%] p-2 px-5 flex flex-col justify-center relative"
    >
      <Textarea
        placeholder="Chat with Naol"
        className="rounded-xl h-14 sm:h-12 text-white border-2 border-white/50 focus:border-white/70 font-semibold resize-none overflow-hidden p-3 pr-14"
        value={formData.message}
        onChange={(e) => setFormData({ message: e.target.value })}
      />
      <Button type="submit" className="absolute right-10 bg-none p-0 px-0 py-0">
        <CircleArrowUp size={30} />
      </Button>
    </form>
  );
}
