import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`size-11 rounded-full absolute top-10 right-10`}
      variant="secondary"
    >
      <span>
        {theme === "dark" ? (
          <Sun className="size-6" />
        ) : (
          <Moon className="size-6" />
        )}
      </span>
    </Button>
  );
}

export default ThemeButton;
