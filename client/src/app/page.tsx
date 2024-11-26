import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Bolt, CircleArrowUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col bg-custom-gradient2 h-screen p-2">
      <div className="h-[7%] border-b border-white/15 flex justify-between items-center pr-2">
        <SidebarTrigger className="w-10 h-10 hover:bg-white/20 rounded-xl hover:text-white" />
        <p className="sm:hidden">Naol AI</p>
        <Bolt />
      </div>
      <div className="grow p-5">this is main content</div>
      <div className="h-[15%] p-2 px-5 flex flex-col justify-center relative">
        <Textarea
          placeholder="chat with Naol"
          className="rounded-xl h-14 text-white border-2 border-white/50 focus:border-white/70 font-semibold resize-none overflow-hidden p-3 pr-14"
        />
        <CircleArrowUp size={30} className="absolute right-10" />
      </div>
    </div>
  );
}
