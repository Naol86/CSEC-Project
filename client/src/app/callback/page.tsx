"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use next/navigation instead of next/router
import { signIn } from "next-auth/react";

const Callback = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the token from the URL
    const token = searchParams.get("token");
    const login = async (token: string) => {
      await signIn("google-credentials", { token });
      window.location.href = "/";
    };

    if (token) {
      login(token);
    }
  }, [searchParams]);

  return <p>Loading...</p>;
};

export default Callback;
