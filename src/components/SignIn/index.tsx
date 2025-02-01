"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const SignIn = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    // You can specify the provider directly, e.g., 'google', 'github'
    signIn("worldcoin", {
      // Disable the default signin page
      callbackUrl: "/",
      redirect: true,
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm">Welcome, {session.user?.name?.slice(0, 10)}!</p>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleSignIn}>Sign in with Worldcoin</Button>
    </div>
  );
};
