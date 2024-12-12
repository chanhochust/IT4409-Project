import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS and clsx to support conditional classes. Also wrap it with tailwind-merge to respect the order of classes defined in component template rather than the order of the class in the generated CSS file.
 * @param classes
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
