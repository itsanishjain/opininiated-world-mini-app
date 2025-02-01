import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    verified: boolean;
    verificationLevel?: string;
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      verified: boolean;
      verificationLevel?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    verified: boolean;
    verificationLevel?: string;
  }
}
