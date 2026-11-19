import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "../styles/layout.css";

/* ─────────────────────────────────────────────
   Dark Mode Hook (persists via localStorage)
   ───────────────────────────────────────────── */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("ieee-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    localStorage.setItem("ieee-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, setIsDark];
}

const NAV_LINKS = [
  { label: "Home", route: "/home" },
  { label: "Events", route: "/home", hash: "#events-section" },
  { label: "Gallery", route: "/gallery" },
  { label: "Societies", route: "/societies" },
  { label: "Boards", route: "/boards" },
  { label: "Team", route: "/team" },
  { label: "Contact", route: "/contact" },
];

function scrollToSection(hash) {
  if (!hash) return;
  document
    .querySelector(hash)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar({ isDark, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [mobileOpen]);

  const trapMenuFocus = (event) => {
    if (event.key !== "Tab") return;
    const focusable = menuRef.current?.querySelectorAll(
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

  const isActive = (link) => {
    if (link.hash) return false;
    return location.pathname === link.route;
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileOpen(false);

    if (link.hash) {
      if (location.pathname === "/home") {
        scrollToSection(link.hash);
        window.history.replaceState(null, "", `/home${link.hash}`);
      } else {
        navigate(`/home${link.hash}`);
      }
      return;
    }

    if (link.route !== "#") navigate(link.route);
  };

  return (
    <>
      <nav className="nb-nav">
        <div className="nb-nav-inner">
          <a
            href="/home"
            className="nb-nav-logo"
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
          >
            <img src="/logo.png" alt="IEEE SJCE" className="nb-logo-img" width={42} height={42} decoding="async" />
            <span className="nb-logo-text">IEEE SJCE</span>
          </a>

          <div className="nb-nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.hash ? `${link.route}${link.hash}` : link.route}
                className={isActive(link) ? "active" : ""}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nb-nav-right">
            <button
              className="nb-theme-toggle nb-theme-toggle-desktop"
              onClick={toggleTheme}
              title={isDark ? "Switch to light" : "Switch to dark"}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdScMuuAzvbgfTRzSE0j7EjLkqhjnf7Xs4sJnImyoaTbibp7w/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn nb-btn-accent"
            >
              JOIN US <ArrowRight size={14} />
            </a>
          </div>

          <div className="nb-mobile-controls">
            <button
              className="nb-theme-toggle nb-theme-toggle-mobile"
              onClick={toggleTheme}
              title={isDark ? "Switch to light" : "Switch to dark"}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              className="nb-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`nb-mobile-menu ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal={mobileOpen ? "true" : undefined}
        aria-label="Site navigation"
        aria-hidden={!mobileOpen}
        onKeyDown={trapMenuFocus}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="nb-mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <X size={28} />
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.hash ? `${link.route}${link.hash}` : link.route}
            className={isActive(link) ? "active" : ""}
            onClick={(e) => handleNavClick(e, link)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScyUvp_2L7Mw3ENLSANaXTQiZmqJJFhxETfKFOXWl9o8wn3Uw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="nb-btn nb-btn-accent"
          style={{ marginTop: "8px" }}
        >
          JOIN US <ArrowRight size={14} />
        </a>
      </div>
    </>
  );
}

export default function Layout() {
  const [isDark, setIsDark] = useDarkMode();
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="nb-layout">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <div id="main-content" tabIndex={-1}>
        <Outlet />
      </div>
    </div>
  );
}
