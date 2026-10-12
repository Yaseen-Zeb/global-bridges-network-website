"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // The approved design is light-only, so the theme is pinned to light.
    <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
