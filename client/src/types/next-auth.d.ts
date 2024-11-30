import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add this to satisfy the type requirement
    token: string;
    email: string;
  }

  interface Session {
    user: {
      id: string;
      token: string;
      email: string;
    };
  }

  interface JWT {
    id: string;
    token: string;
    email: string;
  }
}
