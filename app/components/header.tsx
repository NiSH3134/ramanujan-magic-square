"use client";

import React, { useEffect, useState } from "react";
import { Menu, SunMoon, X } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  onHeroClick: () => void;
  onReferencesClick: () => void;
};

export const Header = ({ onHeroClick, onReferencesClick }: HeaderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme");
    const bodyHasDark = document.body.classList.contains("dark");
    const initial =
      stored === "dark" || stored === "light"
        ? stored
        : (window as any).__theme || (bodyHasDark ? "dark" : "light");

    (window as any).__theme = initial;
    if (initial === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    setTheme(initial as "light" | "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    if (typeof window !== "undefined") {
      (window as any).__theme = newTheme;
      try {
        localStorage.setItem("theme", newTheme);
      } catch { }
    }
    setTheme(newTheme as "light" | "dark");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="combined main-color main-bg sticky top-0 z-50 flex items-center justify-between p-4">
      {/* Logo */}
      <div className="logo text-lg font-bold">
        <Link href="/">Ramanujan Magic Square</Link>
      </div>

      {/* Desktop Links */}
      <nav className="hidden md:flex items-center gap-5.5">
        <button onClick={onHeroClick}>Home</button>
        <button onClick={onReferencesClick}>References</button>
        <span
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
          aria-label={
            theme === "light" ? "Enable dark mode" : "Enable light mode"
          }
          onClick={toggleTheme}
          className="cursor-pointer p-1 rounded-md"
        >
          <SunMoon className="pointer-events-none" />
        </span>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          {isMobileMenuOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--color-primary)] text-[var(--color-secondary)] shadow-lg flex flex-col gap-3 p-4">
          <button
            onClick={() => {
              onHeroClick();
              setIsMobileMenuOpen(false);
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              onReferencesClick();
              setIsMobileMenuOpen(false);
            }}
          >
            References
          </button>
          <span
            onClick={toggleTheme}
            className="cursor-pointer flex items-center gap-2"
          >
            <SunMoon className="pointer-events-none" />
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      )}
    </header>
  );
};
