"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

export const SignIn = () => {
  // const { status } = useSession();
  // const router = useRouter();

  const handleSignIn = () => {
    signIn("worldcoin", {
      callbackUrl: "/home",
      redirect: true,
    });
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "authenticated") {
  //   router.push("/home");
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Button onClick={handleSignIn}>Sign in with Worldcoin</Button>
    </div>
  );
};
