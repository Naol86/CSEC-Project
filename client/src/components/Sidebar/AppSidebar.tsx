import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import UserProfile from "../UserProfile/UserProfile";
import ChatHistory from "../Chat/ChatHistory";
import { PlusIcon } from "lucide-react";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-black pl-2 py-2 h-full flex flex-col">
        <div className="relative min-h-12 flex items-center justify-between p-2 border-b border-b-white/20 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[90%] after:h-2 after:bg-transparent">
          <p className="font-semibold">Naol AI</p>
          <PlusIcon />
        </div>

        <div className="grow py-4 space-y-1.5 max-h-full overflow-y-auto">
          {Array.from({ length: 50 }).map((_, ind) => (
            <ChatHistory key={ind} id={ind} />
          ))}
        </div>
        <UserProfile />
      </SidebarContent>
    </Sidebar>
  );
}
