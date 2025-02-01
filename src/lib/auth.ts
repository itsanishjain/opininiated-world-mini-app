import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verified: true,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.verified = user.verified;
        token.verificationLevel = user.verificationLevel;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.verified = token.verified;
        session.user.verificationLevel = token.verificationLevel;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
