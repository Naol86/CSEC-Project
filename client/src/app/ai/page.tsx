"use client";
import AiResponse from "@/components/Chat/AiResponse";
import UserChat from "@/components/Chat/UserChat";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bolt } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import ChatForm from "../../components/Chat/ChatForm";
import { useMainStore } from "@/lib/store/mainStore";

export default function Home() {
  const { messages } = useMainStore();

  return (
    <div className="flex flex-col bg-custom-gradient2 h-screen p-2 relative">
      <div className="h-auto min-h-[40px] border-b border-white/15 flex justify-between items-center pr-2">
        <SidebarTrigger className="w-10 h-10 hover:bg-white/20 rounded-xl hover:text-white" />
        <p className="sm:hidden">Naol AI</p>
        <Bolt />
      </div>

      <div className="flex-1 p-5 space-y-4 px-1 sm:px-16 sm:pr-20 overflow-y-auto flex flex-col-reverse">
        {messages &&
          messages.map((chat, index) => (
            <div key={index}>
              {chat.role === "user" ? (
                <UserChat message={chat.content} />
              ) : (
                <AiResponse message={chat.content} />
              )}
            </div>
          ))}
      </div>

      <SessionProvider>
        <ChatForm />
      </SessionProvider>
    </div>
  );
}
