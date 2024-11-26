import AiResponse from "@/components/Chat/AiResponse";
import UserChat from "@/components/Chat/UserChat";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Bolt, CircleArrowUp } from "lucide-react";

export default function Home() {
  const chatHistory = [
    {
      sender: "user",
      message: "Give me a list of fruits.",
    },
    {
      sender: "response",
      message: "Apples, Bananas, Oranges, Mangoes, Grapes",
    },
    {
      sender: "user",
      message: "Hello",
    },
    {
      sender: "response",
      message: "Hi there! How can I assist you today?",
    },
    {
      sender: "user",
      message: "What is the capital of France?",
    },
    {
      sender: "response",
      message: "The capital of France is Paris.",
    },
    {
      sender: "user",
      message: "What is quantum entanglement?",
    },
    {
      sender: "response",
      message:
        "Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles are generated, interact, or share spatial proximity in ways such that the quantum state of each particle cannot be described independently of the state of the others, even when the particles are separated by a large distance.",
    },
    {
      sender: "user",
      message: "Goodbye",
    },
    {
      sender: "response",
      message: "Goodbye! Have a great day!",
    },
    {
      sender: "user",
      message: "Tell me a joke!",
    },
    {
      sender: "response",
      message: "I'm sorry, I didn't understand that. Can you please clarify?",
    },
  ];

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

      <div className="h-auto sm:h-[15%] p-2 px-5 flex flex-col justify-center relative">
        <Textarea
          placeholder="chat with Naol"
          className="rounded-xl h-14 sm:h-12 text-white border-2 border-white/50 focus:border-white/70 font-semibold resize-none overflow-hidden p-3 pr-14"
        />
        <CircleArrowUp size={30} className="absolute right-10" />
      </div>
    </div>
  );
}
