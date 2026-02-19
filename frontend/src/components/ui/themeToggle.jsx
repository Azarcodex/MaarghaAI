import { Sun, Moon, Sparkles } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full 
                 bg-secondary/50 border border-border/50 hover:border-primary/30 
                 transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]"
      aria-label="Toggle Theme"
    >
      {/* Icon Container with sliding animation */}
      <div className="relative h-6 w-6 flex items-center justify-center overflow-hidden">
        <div
          className={`transform transition-all duration-500 ease-spring ${
            isDark ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <Sun size={18} className="text-amber-500 fill-amber-500/20" />
        </div>

        <div
          className={`absolute transform transition-all duration-500 ease-spring ${
            isDark ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Moon size={18} className="text-indigo-400 fill-indigo-400/20" />
        </div>
      </div>

      {/* Subtle Text Label */}
      <span className="text-xs font-medium pr-1 text-muted-foreground group-hover:text-foreground transition-colors">
        {isDark ? "Dark" : "Light"}
      </span>

      {/* Decorative Sparkle (only shows on hover) */}
      <Sparkles
        size={12}
        className="absolute -top-1 -right-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </button>
  );
}
