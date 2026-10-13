import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom type-scale tokens (tailwind.config.ts → fontSize) so
// `text-h2` is treated as a font size and isn't dropped when combined with a text colour.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h1", "h2", "h3", "h4", "body-lg", "body", "body-sm", "caption", "overline", "nav", "button"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
