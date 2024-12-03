"use client";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import UserProfile from "../UserProfile/UserProfile";
import ChatHistory from "../Chat/ChatHistory";
import { PlusIcon } from "lucide-react";
import { useMainStore } from "@/lib/store/mainStore";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function AppSidebar() {
  const { getCategorizedChats, fetchChat, setCurrentChat } = useMainStore();
  const { today, yesterday, lastWeek, older } = getCategorizedChats();

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  const handleAdd = () => {
    setCurrentChat(null);
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-black pl-2 py-2 h-full flex flex-col">
        <div className="relative min-h-10 flex items-center justify-between p-2 border-b border-b-white/20 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[90%] after:h-2 after:bg-transparent">
          <p className="font-semibold">Naol AI</p>
          <Button
            onClick={handleAdd}
            className="rounded-xl p-2 px-3 hover:bg-white/20"
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="grow overflow-y-auto max-h-full space-y-5">
          <div>
            {today.length > 0 && (
              <>
                <h1 className="text-xs font-semibold my-3">Today</h1>
                <div className="space-y-1.5">
                  {today.map((chat, ind) => (
                    <ChatHistory key={ind} chat={chat} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {yesterday.length > 0 && (
              <>
                <h1 className="text-xs font-semibold">Yesterday</h1>
                <div className="space-y-1.5">
                  {yesterday.map((chat, ind) => (
                    <ChatHistory key={ind} chat={chat} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {lastWeek.length > 0 && (
              <>
                <h1 className="text-xs font-semibold">Last Week</h1>
                <div className="space-y-1.5">
                  {lastWeek.map((chat, ind) => (
                    <ChatHistory key={ind} chat={chat} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {older.length > 0 && (
              <>
                <h1 className="text-xs font-semibold">older</h1>
                <div className="space-y-1.5">
                  {older.map((chat, ind) => (
                    <ChatHistory key={ind} chat={chat} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <UserProfile />
      </SidebarContent>
    </Sidebar>
  );
}
