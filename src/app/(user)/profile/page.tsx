"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Shield, User, Edit2, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  address: string;
  verificationLevel: string;
  name: string;
  username: string;
  balance: number;
  verified: boolean;
}

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpdateProfile = async () => {
    // Add API call to update profile
    setIsEditing(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <Card className="p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Username</label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Enter your username"
                />
              </div>
              <Button onClick={handleUpdateProfile} className="w-full">
                Save Changes
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{session.user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold">
                      {
                        (session.user as { verificationLevel?: string })
                          ?.verificationLevel
                      }
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
