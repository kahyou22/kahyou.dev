"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Button from "./Button";
import { Sun, Moon, MonitorCog, Check } from "lucide-react";
import { ThemeId } from "@/lib/theme";

import styles from "./ThemePicker.module.css";
import { useTheme } from "@/hooks/ThemeContext";

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

export default function ThemePicker() {
  const { appliedThemeId, themeId, selectThemeId } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) return;
      close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const close = () => setOpen(false);

  const toggle = () => setOpen((v) => !v);

  const choose = (id: ThemeId) => {
    selectThemeId(id);
    close();
  };

  return (
    <>
      <div ref={wrapperRef} className={styles.wrapper}>
        <Button variant="ghost" iconOnly onClick={toggle}>
          {themes.map((t) => {
            if (t.id === appliedThemeId) {
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
                  {theme.id === themeId && <Check className={styles.check} />}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
