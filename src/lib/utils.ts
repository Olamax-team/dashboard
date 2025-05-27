import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractFirstName = (fullName: string | null | undefined): string => {
  if (!fullName) return "";

  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);

  return parts[0];
};
