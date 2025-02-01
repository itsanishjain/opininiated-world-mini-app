import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number = 20): string {
  if (!str) return "";
  if (str.length <= 8) return str;
  return str.slice(0, 4) + "..." + str.slice(-4);
}
