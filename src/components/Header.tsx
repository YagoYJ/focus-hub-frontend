import { ThemeModeToggle } from "./ThemeModeToggle";

export function Header() {
  return (
    <header className="w-full h-14 border border-b-border flex items-center justify-between px-3">
      <div />

      <h1 className="text-lg font-bold">FocusHub</h1>

      <ThemeModeToggle />
    </header>
  );
}
