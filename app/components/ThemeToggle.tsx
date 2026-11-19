"use client";

import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "فعال‌کردن حالت روشن" : "فعال‌کردن حالت تیره"}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-purple-100 bg-white text-gray-600 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-500/20 dark:bg-[#151124] dark:text-violet-200 dark:hover:bg-[#211a37]"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? (
        <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      )}
    </button>
  );
}
