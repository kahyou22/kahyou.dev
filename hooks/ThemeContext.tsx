"use client";

import {
  AppliedThemeId,
  changeTheme,
  getAppliedTheme,
  getTheme,
  initTheme,
  THEME_KEY,
  ThemeId,
} from "@/lib/theme";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type ThemeContextType = {
  appliedThemeId: AppliedThemeId;
  themeId: ThemeId;
  selectThemeId: (id: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function DangerThemeScript() {
  const innerScript = `
(() => {
  let theme = localStorage.getItem("${THEME_KEY}") || "system";
  if (theme == "system") {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme = systemPrefersDark ? "dark" : "light";
  }
  if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
})();
  `;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: innerScript,
      }}
    />
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appliedThemeId, setAppliedThemeId] = useState<AppliedThemeId>("light");
  const [themeId, setThemeId] = useState<ThemeId>("system");

  useLayoutEffect(() => {
    initTheme();
    setAppliedThemeId(getAppliedTheme());
    setThemeId(getTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (getTheme() === "system") {
        setAppliedThemeId(getAppliedTheme());
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  });

  const selectThemeId = (id: ThemeId) => {
    changeTheme(id);
    setAppliedThemeId(getAppliedTheme());
    setThemeId(getTheme());
  };

  return (
    <ThemeContext.Provider value={{ appliedThemeId, themeId, selectThemeId }}>
      <DangerThemeScript />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme가 ThemeProvider 내부에서 사용되지 않음");
  }
  return ctx;
}
