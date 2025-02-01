"use client";

import { Home, Calendar, User, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-2 px-4">
      <div className="flex justify-around items-center">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
              pathname === item.href
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
