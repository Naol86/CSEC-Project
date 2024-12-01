"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", { email, password });
    console.log(res, "res is ");
    setTimeout(() => {}, 5000);
  };

  const handleGoogle = async () => {
    redirect(`http://localhost:8000/auth/google`);
  };

  return (
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit} method="post">
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
      <Button onClick={handleGoogle}>google signin</Button>
    </div>
  );
}
