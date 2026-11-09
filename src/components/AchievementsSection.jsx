import { useEffect, useRef } from "react";
import { Award, Globe, Trophy, Medal, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/achievements.css";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    id: 1,
    award: "MDC Star",
    section: "IEEE Bangalore Section",
    year: "2026",
    icon: <Star size={28} />,
    accent: "#FFE600",
  },
  {
    id: 2,
    award: "Outstanding Student Branch",
    section: "IEEE Mysore Subsection",
    year: "2021",
    icon: <Trophy size={28} />,
    accent: "#00E5FF",
  },
  {
    id: 3,
    award: "Best Student Branch Website",
    section: "IEEE Bangalore Section",
    year: "2019",
    icon: <Globe size={28} />,
    accent: "#3B82F6",
  },
  {
    id: 4,
    award: "Best Student Branch Website",
    section: "IEEE Bangalore Section",
    year: "2017",
    icon: <Globe size={28} />,
    accent: "#8B5CF6",
  },
  {
    id: 5,
    award: "Best Student Branch Website",
    section: "IEEE Bangalore Section",
    year: "2016",
    icon: <Award size={28} />,
    accent: "#00F5D4",
  },
  {
    id: 6,
    award: "Best Student Branch (India)",
    year: "2003–2004",
    icon: <Trophy size={28} />,
    accent: "#EC4899",
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ach-hero-block > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ach-hero-block",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".ach-plaque",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ach-podium",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".ach-orb",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".ach-hero-block",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="ach-section">
      <div className="ach-rays" aria-hidden="true" />

      <div className="ach-inner">
        <div className="ach-hero-block">
          <div className="ach-hero-left">
            <Medal size={20} className="ach-hero-icon" />
            <h2 className="ach-hero-title">Hall of Fame</h2>
            <p className="ach-hero-desc">
              Awards that celebrate our commitment to excellence across IEEE
              sections nationwide.
            </p>
          </div>
          <div className="ach-hero-right">
            <div className="ach-hero-stats ach-jubilee">
              <span className="ach-jubilee-title">Silver Jubilee Milestone</span>
              <span className="ach-jubilee-sub">25 years down, forever to go!</span>
            </div>
            <div className="ach-orb" role="img" aria-label="Silver trophy">
              <svg className="ach-orb-trophy" viewBox="0 0 64 64" aria-hidden="true">
                <defs>
                  <linearGradient id="ach-silver" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="45%" stopColor="#CBD5E1" />
                    <stop offset="70%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                </defs>
                {/* handles */}
                <path d="M18 15 H11 C11 27 16 31 22 31" fill="none" stroke="url(#ach-silver)" strokeWidth="4" strokeLinecap="round" />
                <path d="M46 15 H53 C53 27 48 31 42 31" fill="none" stroke="url(#ach-silver)" strokeWidth="4" strokeLinecap="round" />
                {/* cup */}
                <path d="M17 9 H47 V23 C47 33 41 40 32 40 C23 40 17 33 17 23 Z" fill="url(#ach-silver)" />
                <path d="M22 13 V23" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
                <text x="33" y="28" textAnchor="middle" className="ach-orb-trophy-num">25</text>
                {/* stem + base */}
                <rect x="29" y="40" width="6" height="8" fill="url(#ach-silver)" />
                <rect x="22" y="47" width="20" height="4" rx="1" fill="url(#ach-silver)" />
                <rect x="18" y="51" width="28" height="6" rx="1.5" fill="url(#ach-silver)" />
              </svg>
            </div>
          </div>
        </div>

        <div className="ach-podium">
          <div className="ach-plaque-row">
            {ACHIEVEMENTS.map((item) => (
              <article
                key={item.id}
                className="ach-plaque"
                style={{ "--plaque-accent": item.accent }}
              >
                <span className="ach-plaque-year-bg">{item.year}</span>

                <div className="ach-plaque-ribbon" aria-hidden="true" />

                <div className="ach-plaque-medal">{item.icon}</div>

                <span className="ach-plaque-year">{item.year}</span>

                <h3 className="ach-plaque-award">{item.award}</h3>
                {item.section && (
                  <p className="ach-plaque-section">{item.section}</p>
                )}

                <div className="ach-plaque-base" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
