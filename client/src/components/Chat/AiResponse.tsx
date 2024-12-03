import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function AiResponse({ message }: { message: string }) {
  return (
    <div className="flex space-x-2 text-sm">
      <div>
        <Avatar className="h-5 w-5 sm:w-7 sm:h-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </div>
      <div className="overflow-x-auto x-scrollbar " data-color-mode="dark">
        <MarkdownPreview
          source={message}
          className="rounded-2xl p-4 text-sm text-red-400 py-6 sm:py-10"
        />
      </div>
    </div>
  );
}
