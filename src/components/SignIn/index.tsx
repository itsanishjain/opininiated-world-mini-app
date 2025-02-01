"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const SignIn = () => {
  const { status } = useSession();

  const handleSignIn = () => {
    signIn("worldcoin", {
      callbackUrl: "/home",
      redirect: true,
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return redirect("/home");
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleSignIn}>Sign in with Worldcoin</Button>
    </div>
  );
};
