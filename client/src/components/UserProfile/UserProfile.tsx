"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <div className="border-t border-white/30 flex items-center p-2 text-white gap-2">
      <Avatar>
        {session?.user.profilePicture ? (
          <AvatarImage src={`${session?.user.profilePicture}`} alt="@shadcn" />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        )}
        <AvatarFallback className="bg-white/20">PF</AvatarFallback>
      </Avatar>
      <div className="flex justify-between grow items-center">
        <h2 className="capitalize">{session?.user.firstName}</h2>
        <Button
          className="bg-white/15 font-semibold rounded-xl p-1 py-0 m-0 text-sm"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
