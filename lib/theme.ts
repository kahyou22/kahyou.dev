const THEME_KEY = "kahyou.dev__theme";

export type ThemeId = "system" | "light" | "dark";
export type AppliedThemeId = "light" | "dark";

const VALID_THEMES: ThemeId[] = ["system", "light", "dark"];
const VALID_APPLIED_THEMES: AppliedThemeId[] = ["light", "dark"];

const isSystemDarkMode = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const applyTheme = (theme: ThemeId) => {
  if (theme == "system") {
    document.documentElement.setAttribute(
      "data-theme",
      isSystemDarkMode() ? "dark" : "light"
    );
  } else if (VALID_APPLIED_THEMES.includes(theme)) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};

/**
 * 테마 변경 + 저장
 * @param theme 적용할 테마 (기본값: system)
 */
const changeTheme = (theme: ThemeId = "system") => {
  if (!VALID_THEMES.includes(theme)) return;
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

/**
 * 실제로 적용된 테마
 */
const getAppliedTheme = (): AppliedThemeId => {
  let theme = getTheme();
  if (theme == "system") {
    return isSystemDarkMode() ? "dark" : "light";
  }
  if (VALID_APPLIED_THEMES.includes(theme)) {
    return theme;
  }
  return "light";
};

const getTheme = (): ThemeId => {
  const value = localStorage.getItem(THEME_KEY);
  return VALID_THEMES.includes(value as ThemeId)
    ? (value as ThemeId)
    : "system";
};

// 초기 로드 시
const initTheme = () => {
  const savedTheme = getTheme();
  applyTheme(savedTheme);

  // 시스템 테마 변경 감지 (system 선택 시에만)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (getTheme() == "system") {
        applyTheme("system");
      }
    });
};

export { THEME_KEY, initTheme, changeTheme, getTheme, getAppliedTheme };
