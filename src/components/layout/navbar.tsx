"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DayPassButton } from "@/components/day-pass/day-pass-button";
import { Close, Menu } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { NAV, SITE } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  // The menu is "open for" a specific path, so navigating anywhere closes it with no effect needed.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const menuOpen = openFor === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenFor(null);
      // The menu closes under the focused element, so put focus back on the button that opened it.
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line-subtle bg-canvas">
      {/* Edge to edge: logo anchors left, primary links anchor right on lg+ (hamburger below lg). */}
      <div className="shell-full flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${SITE.name}, home`}
        >
          <Image
            src="/images/gold-logo.png"
            alt=""
            width={44}
            height={44}
            quality={85}
            loading="eager"
            className="size-11"
          />
          <span className="font-label text-[1.25rem] leading-none tracking-[0.06em] whitespace-nowrap uppercase sm:text-[1.5rem]">
            Gold&rsquo;s Gym <span className="text-gold">Iloilo</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "nav-link font-label text-[1.25rem] leading-none tracking-[0.06em] uppercase",
                    "transition-colors duration-[160ms]",
                    isActive(item.href) ? "text-gold" : "text-fg hover:text-gold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center border border-line-subtle text-fg transition-colors duration-[160ms] hover:border-gold hover:text-gold lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setOpenFor(menuOpen ? null : pathname)}
        >
          {menuOpen ? <Close className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full border-b border-line-subtle bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="px-[var(--gutter)] pt-2 pb-8">
          <ul>
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line-subtle">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center font-display text-[2rem] leading-none uppercase",
                    isActive(item.href) ? "text-gold" : "text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Hand focus to the toggle first: the menu is hidden as the drawer opens, and the drawer
              returns focus to whatever was focused when it opened. */}
          <DayPassButton
            className="mt-6 w-full"
            onOpen={() => {
              toggleRef.current?.focus();
              setOpenFor(null);
            }}
          >
            Get your free day pass
          </DayPassButton>
        </nav>
      </div>
    </header>
  );
}
