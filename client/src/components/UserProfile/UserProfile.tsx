import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function UserProfile() {
  return (
    <div className="border-t border-white/30 flex items-center p-2 text-white gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>PF</AvatarFallback>
      </Avatar>
      <div className="flex justify-between grow items-center">
        <h2>Naol Kasinet</h2>
        <Button className="bg-white/15 font-semibold rounded-xl p-1 py-0 m-0 text-sm">
          Logout
        </Button>
      </div>
    </div>
  );
}
