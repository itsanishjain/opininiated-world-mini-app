"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { truncate } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return redirect("/");
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-8">Profile</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 p-6 border rounded-lg">
          <p className="text-lg font-medium">
            Welcome, {truncate(session.user?.name || "")}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-xs">
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
