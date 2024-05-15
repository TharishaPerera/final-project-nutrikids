import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';

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

/**
 * Format date into 'ddd MMM DD YYYY [at] h:mm A' format
 * @param date Date
 * @returns date formatted as '
 */
export const dateFormat = (date?: Date, format?: string) => {
  if (format) {
    return moment(date).format(format).toString();
  }
  return moment(date).format('ddd MMM DD YYYY [at] h:mm A').toString();
}

/**
 * Truncate text if it is longer than maxLength
 * @param text string
 * @param maxLength number
 * @returns text string
 */
export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
}

/**
 * Format timeslots
 * @param timeSlotString string
 * @returns string format (8:00 AM - 5:00 PM)
 */
export function formatTimeSlot(timeSlotString: string): string {
  const [start, end] = timeSlotString.split('-').map(Number);

  const formatTime = (timestamp: number): string => {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
}
