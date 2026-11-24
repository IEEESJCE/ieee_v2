import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import gsap from "gsap";
import RecruitmentModal from "./RecruitmentModal";
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
  { label: "Contact Us", route: "/contact" },
];

function scrollToSection(hash) {
  if (!hash) return;
  document
    .querySelector(hash)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const MEMBERSHIP_DRIVE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdScMuuAzvbgfTRzSE0j7EjLkqhjnf7Xs4sJnImyoaTbibp7w/viewform";

function Navbar({ isDark, toggleTheme, onOpenRecruitment }) {
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const joinRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const innerRef = useRef(null);
  const logoTextRef = useRef(null);

  // Fit the desktop row (logo, links, theme toggle, Join Us) as the window
  // narrows: first shrink everything in two steps ("nb-tight", then
  // "nb-tighter"), and only when even the smallest size doesn't fit switch
  // to the hamburger layout ("nb-compact"). Each step is measured with the
  // classes applied and the final one is kept in the same frame, so
  // nothing flickers.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const inner = innerRef.current;
    if (!nav || !inner) return;

    const TIERS = ["", "nb-tight", "nb-tighter"];
    const ALL = ["nb-tight", "nb-tighter", "nb-compact"];

    const fits = () => {
      const style = getComputedStyle(inner);
      const available =
        inner.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      const needed =
        (logoRef.current?.offsetWidth ?? 0) +
        (linksRef.current?.scrollWidth ?? 0) +
        (joinRef.current?.offsetWidth ?? 0) +
        32; // minimum breathing room between the three groups
      return needed <= available;
    };

    const pickTier = () => {
      nav.classList.remove(...ALL);
      if (window.innerWidth < 768) return;
      for (const tier of TIERS) {
        if (tier) nav.classList.add(tier);
        if (fits()) return;
        if (tier) nav.classList.remove(tier);
      }
      nav.classList.add("nb-compact");
    };

    // Links and buttons animate font-size/padding ("transition: all"), so
    // measure with transitions off or the old sizes would be read.
    const check = () => {
      nav.classList.add("nb-measuring");
      pickTier();
      void nav.offsetWidth; // commit final sizes before transitions return
      nav.classList.remove("nb-measuring");
    };

    // Re-check on the next frame too: some browsers fire resize before the
    // new layout width is final.
    let raf = 0;
    const schedule = () => {
      check();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(inner);
    if (logoTextRef.current) ro.observe(logoTextRef.current);
    document.fonts?.ready.then(check);
    return () => {
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      logoRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7 },
    );
    if (window.innerWidth >= 768 && linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
        "-=0.3",
      );
    }
    if (joinRef.current) {
      tl.fromTo(
        joinRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4 },
        "-=0.2",
      );
    }
  }, []);

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
      <nav ref={navRef} className="nb-nav">
        <div ref={innerRef} className="nb-nav-inner">
          <div
            ref={logoRef}
            className="nb-nav-logo"
            onClick={() => navigate("/home")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/home")}
          >
            <img src="/logo.png" alt="IEEE-SJCE" className="nb-logo-img" />
            <span ref={logoTextRef} className="nb-logo-text">IEEE-SJCE</span>
          </div>

          <div ref={linksRef} className="nb-nav-links">
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

          <div ref={joinRef} className="nb-nav-right">
            <button
              className="nb-theme-toggle nb-theme-toggle-desktop"
              onClick={toggleTheme}
              title={isDark ? "Switch to light" : "Switch to dark"}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="/join_us"
              onClick={(e) => {
                e.preventDefault();
                navigate("/join_us");
              }}
              className="nb-btn nb-btn-accent"
              aria-label="Join IEEE-SJCE (Membership Drive 2027)"
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
              className="nb-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nb-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          className="nb-mobile-close"
          onClick={() => setMobileOpen(false)}
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
          href="/join_us"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/join_us");
          }}
          className="nb-btn nb-btn-accent"
          style={{ marginTop: "8px" }}
          aria-label="Join IEEE-SJCE (Membership Drive 2027)"
        >
          JOIN US <ArrowRight size={14} />
        </a>
      </div>
    </>
  );
}

export default function Layout() {
  const [isDark, setIsDark] = useDarkMode();
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const handleOpen = () => setRecruitmentOpen(true);
    window.addEventListener("open-recruitment-modal", handleOpen);
    return () => window.removeEventListener("open-recruitment-modal", handleOpen);
  }, []);

  return (
    <div className="nb-layout">
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenRecruitment={() => setRecruitmentOpen(true)}
      />
      <Outlet />
      <RecruitmentModal
        isOpen={recruitmentOpen}
        onClose={() => setRecruitmentOpen(false)}
      />
    </div>
  );
}
