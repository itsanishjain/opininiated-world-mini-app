"use client";

import { VerificationLevel, VerifyCommandInput } from "@worldcoin/minikit-js";
import { SignIn } from "@/components/SignIn";
import { PayBlock } from "@/components/Pay";
import { VerifyBlock } from "@/components/Verify";

const verifyPayload: VerifyCommandInput = {
  action: "driver",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

export default function Home() {
  return (
    <div>
      <SignIn />
      <PayBlock />
      <VerifyBlock />
    </div>
  );
}
