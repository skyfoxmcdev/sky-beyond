"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { navItems, siteConfig, joinHref } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { LiveStatus } from "@/components/status/LiveStatus";
import { ButtonLink } from "@/components/ui/Button";

const SECTION_IDS = ["decouvrir", "fonctionnalites", "monde", "communaute", "faq", "rejoindre"];

function useHomeScrollState(pathname: string) {
  const [active, setActive] = useState<string>(pathname === "/" ? "top" : "page");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;

    const update = () => {
      const marker = window.scrollY + Math.round(window.innerHeight * 0.32);
      let current = "top";

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= marker) {
          current = id;
        }
      }

      setScrolled(window.scrollY > 24);
      setActive(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return { active, scrolled };
}

export function SiteHeader() {
  const pathname = usePathname();
  const { active, scrolled } = useHomeScrollState(pathname);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const solidHeader = pathname !== "/" || scrolled || open;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>("button, a[href]");
      firstFocusable?.focus();
    }, 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function isActive(label: string): boolean {
    if (pathname !== "/") return label === "Actualités" && pathname.startsWith("/actualites");
    if (label === "Accueil") return active === "top";
    if (label === "Découvrir") return active === "decouvrir";
    if (label === "Fonctionnalités") return active === "fonctionnalites";
    if (label === "FAQ") return active === "faq";
    if (label === "Actualités") return false;
    return false;
  }

  return (
    <>
      <header
        className={cn("site-header", solidHeader && "is-scrolled", open && "is-menu-open")}
      >
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label={`${siteConfig.name}, accueil`}>
            <Logo />
          </Link>

          <nav className="desktop-nav" aria-label="Navigation principale">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-link"
                    data-active={isActive(item.label)}
                    aria-current={
                      isActive(item.label)
                        ? item.label === "Actualités"
                          ? "page"
                          : "location"
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
              ),
            )}
          </nav>

          <div className="header-actions">
            <div className="header-status">
              <LiveStatus />
            </div>
            <ButtonLink href={joinHref} variant="primary" className="header-cta">
              Rejoindre
              <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
            <button
              ref={triggerRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => (open ? closeMenu() : setOpen(true))}
            >
              <span className="menu-toggle-label">{open ? "Fermer" : "Menu"}</span>
              <span className="menu-lines" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-inner">
              <nav aria-label="Navigation mobile">
                {navItems.map((item, index) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="mobile-nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <span className="index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="mobile-nav-link"
                      data-active={isActive(item.label)}
                      aria-current={isActive(item.label) ? "location" : undefined}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <span className="index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  ),
                )}
              </nav>

              <div className="mobile-menu-foot">
                <ButtonLink href={joinHref} variant="primary" className="w-full" onClick={closeMenu}>
                  Rejoindre
                  <ArrowUpRight aria-hidden="true" />
                </ButtonLink>
                <div className="header-line">
                  <span className="mono">Statut du serveur</span>
                  <LiveStatus />
                </div>
                <button type="button" className="mobile-menu-close" onClick={closeMenu}>
                  <X aria-hidden="true" />
                  Fermer le menu
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
