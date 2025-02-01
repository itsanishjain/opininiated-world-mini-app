import { BottomNav } from "@/components/bottom-nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">{children}</div>
      <BottomNav />
    </div>
  );
}
