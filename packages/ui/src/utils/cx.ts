import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class lists and resolve Tailwind conflicts (later wins). */
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
