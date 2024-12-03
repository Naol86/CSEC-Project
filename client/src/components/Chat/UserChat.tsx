import React from "react";

export default function UserChat({ message }: { message: string }) {
  return (
    <div className="rounded-xl pl-4 py-2 text-left ml-auto">
      <p className="bg-white/10 bg-opacity-10 backdrop-blur-lg w-fit my-4 ml-auto p-2 px-3 rounded-xl">
        {message}
      </p>
    </div>
  );
}
