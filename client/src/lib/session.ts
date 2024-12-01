import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";

// Save token and user details in the session
export async function setSession(
  token: string,
  user: {
    id: string;
    token: string;
    email: string;
  }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Session initialization failed" };
  }

  session.user.token = token;
  session.user = user;

  // Optionally, you can persist this in a database or cache for server-side validation
  return session;
}

// Retrieve token from the session (example use case)
export async function getToken() {
  const session = await getServerSession(authOptions);

  if (session) {
    return session.user.token;
  }
  return null;
}
