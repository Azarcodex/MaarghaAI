import { Sun, Moon, Sparkles } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center gap-3 px-4 py-2 rounded-2xl 
                 bg-secondary/40 border border-border/40 hover:border-primary/40 
                 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 active:scale-95"
      aria-label="Toggle Theme"
    >
      {/* Icon Container with sliding animation */}
      <div className="relative h-5 w-5 flex items-center justify-center overflow-hidden">
        <div
          className={`transform transition-all duration-700 ease-spring ${isDark ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100"
            }`}
        >
          <Sun size={20} className="text-amber-500 fill-amber-500/20" />
        </div>

        <div
          className={`absolute transform transition-all duration-700 ease-spring ${isDark ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <Moon size={20} className="text-blue-400 fill-blue-400/20" />
        </div>
      </div>

      {/* Subtle Text Label */}
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors pr-1">
        {isDark ? "Night" : "Day"}
      </span>

      {/* Decorative Sparkle (only shows on hover) */}
      <Sparkles
        size={12}
        className="absolute -top-1 -right-1 text-primary animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </button>
  );
}

