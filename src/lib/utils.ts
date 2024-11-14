import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HUNT_START_TIME: Date = new Date("2023-11-16T12:00:00-05:00");

export const HUNT_HAS_STARTED = (() => {
  return new Date() >= HUNT_START_TIME;
})();
