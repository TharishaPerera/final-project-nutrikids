import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get initials of the names for the user button
 * @param input string
 * @returns string
 */
export function getFirstLetters(input?: string): string {
  if (!input) return ''

  const words = input.trim().split(/|s+/)
  
  let result = ''
  if (words) {
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      const word = words[i]
      if (word.length > 0) {
        result += word.charAt(0).toUpperCase()
      }
    }
  }

  return result
}