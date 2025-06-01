// src/utils/formatters.ts

/**
 * Formats an ISO date string into a more readable format.
 * Example: "October 15, 2023"
 * @param isoDateString The ISO date string to format.
 * @returns A formatted date string.
 */
export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
