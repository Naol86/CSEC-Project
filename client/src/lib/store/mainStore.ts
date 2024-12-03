import { CategorizedChats, Chat, Message } from "@/types/chat.type";
import { getSession } from "next-auth/react";
import { create } from "zustand";

interface SidebarState {
  isOpenSidebar: boolean;
  chats: Chat[];
  messages: Message[];
  currentChatId: string | null;
  setIsOpenSidebar: (isOpen: boolean) => void;
  setCurrentChat: (id: string | null) => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  addMessage: (message: Message) => void; // Add a new message
  clearMessages: () => void; // Clear all messages
  addChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
  updateChat: (id: string, updatedChat: Partial<Chat>) => void;
  fetchChat: () => Promise<void>;
  getCategorizedChats: () => CategorizedChats;
}

export const useMainStore = create<SidebarState>((set, get) => ({
  chats: [],
  messages: [],
  isOpenSidebar: false,
  currentChatId: null,
  setIsOpenSidebar: (isOpen) => set(() => ({ isOpenSidebar: isOpen })),
  setCurrentChat: async (id) => {
    set(() => ({ currentChatId: id }));
    if (id) {
      await get().fetchMessages(id);
    } else {
      get().clearMessages();
    }
  },
  fetchMessages: async (chatId) => {
    try {
      const session = await getSession(); // Fetch session data
      const token = session?.user?.token; // Extract token from session

      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch(
        `http://localhost:8000/chats/${chatId}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set(() => ({ messages: data.data }));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      set(() => ({ messages: [] }));
    }
  },
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),
  clearMessages: () => set(() => ({ messages: [] })),
  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats],
      currentChatId: null,
    })),
  removeChat: (id) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      currentChatId: state.currentChatId === id ? null : state.currentChatId,
    })),
  updateChat: (id, updatedChat) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id ? { ...chat, ...updatedChat } : chat
      ),
    })),
  fetchChat: async () => {
    try {
      const session = await getSession(); // Fetch session data
      const token = session?.user?.token; // Extract token from session

      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch(`http://localhost:8000/chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      set(() => ({ chats: data.data }));
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      set(() => ({ chats: [] }));
    }
  },

  getCategorizedChats: () => {
    const chats = get().chats;
    const now = new Date();

    const today: Chat[] = [];
    const yesterday: Chat[] = [];
    const lastWeek: Chat[] = [];
    const older: Chat[] = [];

    chats?.forEach((chat) => {
      const createdAt = new Date(chat.created_at);
      const diffInDays = Math.floor(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays === 0) {
        today.push(chat);
      } else if (diffInDays === 1) {
        yesterday.push(chat);
      } else if (diffInDays <= 7) {
        lastWeek.push(chat);
      } else {
        older.push(chat);
      }
    });

    return { today, yesterday, lastWeek, older };
  },
}));
