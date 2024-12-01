import { useSession, signIn, signOut } from "next-auth/react";

export default function TestCom() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  const handleGoogleSignIn = () => {
    // Redirect to your NestJS backend Google OAuth endpoint
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <button onClick={() => signIn("custom")}>
        Sign in with Custom Provider
      </button>
    </div>
  );
}
