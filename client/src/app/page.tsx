"use client";
import AiResponse from "@/components/Chat/AiResponse";
import UserChat from "@/components/Chat/UserChat";
import TestCom from "@/components/TestCom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import CustomSessionProvider from "@/hooks/CustomeSessionProvider";
import { Bolt, CircleArrowUp } from "lucide-react";
import { useState } from "react";

type FormData = {
  message: string;
};
type ChatMessage = {
  sender: "user" | "response";
  message: string;
};

export default function Home() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const [formData, setFormData] = useState<FormData>({ message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: formData.message },
    ]);

    try {
      const res = await fetch("http://localhost:3000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: formData.message }),
      });

      const response = await res.json();

      console.log(response);
      if (response.statusCode && response.statusCode != 200) {
        return;
      }

      setChatHistory((prev) => [
        ...prev,
        { sender: "response", message: response.response.content },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setFormData({ message: "" });
    }
  };

  return (
    <div className="flex flex-col bg-custom-gradient2 h-screen p-2">
      <div className="h-auto min-h-[60px] border-b border-white/15 flex justify-between items-center pr-2">
        <SidebarTrigger className="w-10 h-10 hover:bg-white/20 rounded-xl hover:text-white" />
        <p className="sm:hidden">Naol AI</p>
        <Bolt />
      </div>

      <div className="grow p-5 space-y-4 px-3 sm:px-24 sm:pr-28 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div key={index}>
            {chat.sender === "user" ? (
              <UserChat message={chat.message} />
            ) : (
              <AiResponse message={chat.message} />
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="h-auto sm:h-[15%] p-2 px-5 flex flex-col justify-center relative"
      >
        <CustomSessionProvider>
          <TestCom />
        </CustomSessionProvider>
        <Textarea
          placeholder="Chat with Naol"
          className="rounded-xl h-14 sm:h-12 text-white border-2 border-white/50 focus:border-white/70 font-semibold resize-none overflow-hidden p-3 pr-14"
          value={formData.message}
          onChange={(e) => setFormData({ message: e.target.value })}
        />
        <Button
          type="submit"
          className="absolute right-10 bg-none p-0 px-0 py-0"
        >
          <CircleArrowUp size={30} />
        </Button>
      </form>
    </div>
  );
}
