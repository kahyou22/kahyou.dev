"use client";

import { useLayoutEffect, useState } from "react";
import Button from "./Button";
import { Sun, Moon, MonitorCog, Check } from "lucide-react";
import {
  AppliedThemeId,
  changeTheme,
  getAppliedTheme,
  getTheme,
  initTheme,
  THEME_KEY,
  ThemeId,
} from "@/lib/theme";

import styles from "./ThemePicker.module.css";

type IconType = React.ComponentType<any>;

interface ThemeItem {
  id: ThemeId;
  name: string;
  icon: IconType;
}

const themes: ThemeItem[] = [
  { id: "light", name: "밝은 테마", icon: Sun },
  { id: "dark", name: "어두운 테마", icon: Moon },
  { id: "system", name: "시스템 테마", icon: MonitorCog },
];

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

export default function ThemePicker() {
  const [theme, setTheme] = useState<AppliedThemeId>("light");
  const [selected, setSelected] = useState<ThemeId>("system");
  const [open, setOpen] = useState<boolean>(false);
  useLayoutEffect(() => {
    initTheme();
    setTheme(getAppliedTheme());
    setSelected(getTheme());

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (getTheme() == "system") {
          setTheme(getAppliedTheme());
        }
      });
  }, []);

  const toggle = () => setOpen((v) => !v);

  const choose = (id: ThemeId) => {
    changeTheme(id);
    setTheme(getAppliedTheme());
    setSelected(id);
    setOpen(false);
  };

  return (
    <>
      <DangerThemeScript />
      <div className={styles.wrapper}>
        <Button variant="ghost" iconOnly onClick={toggle}>
          {themes.map((t) => {
            if (t.id === theme) {
              const Icon = t.icon;
              return <Icon key={t.id} />;
            }
            return null;
          })}
        </Button>
        {open && (
          <div className={styles.popover}>
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <Button
                  key={theme.id}
                  variant="ghost"
                  size="sm"
                  className={styles.item}
                  onClick={() => choose(theme.id)}
                >
                  <Icon />
                  <span>{theme.name}</span>
                  {theme.id === selected && <Check className={styles.check} />}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// export default async function ThemePicker() {
//   const cookieTheme = (await cookies()).get("kahyou.dev__theme")?.value;
//   const theme = cookieTheme ? cookieTheme : "system";
// }
