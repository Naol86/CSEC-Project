import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReactMarkdown from "react-markdown";

export default function AiResponse({ message }: { message: string }) {
  return (
    <div className="flex space-x-2">
      <div>
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </div>
      <div className="grow px-3 pr-6 text-justify">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}
