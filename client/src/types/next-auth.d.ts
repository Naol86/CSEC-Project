import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add this to satisfy the type requirement
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    isEmailVerified: boolean;
  }

  interface Session {
    user: {
      id: string;
      token: string;
      email: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      isEmailVerified: boolean;
    };
  }

  interface JWT {
    id: string;
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    isEmailVerified: boolean;
  }
}
