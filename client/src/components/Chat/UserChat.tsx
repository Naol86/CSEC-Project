import React from "react";

export default function UserChat({ message }: { message: string }) {
  return (
    <div className={`rounded-xl p-2 text-right ml-auto`}>
      <p className="bg-white/10 w-fit text-right ml-auto p-2 px-3 rounded-xl">
        {message}
      </p>
    </div>
  );
}
