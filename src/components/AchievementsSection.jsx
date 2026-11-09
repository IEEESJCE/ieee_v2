import { useEffect, useRef } from "react";
import { Award, Globe, Trophy, Medal, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    rank: "I",
  },
  {
    id: 2,
    award: "Outstanding Student Branch",
    section: "IEEE Mysore Subsection",
    year: "2021",
    icon: <Trophy size={28} />,
    accent: "#00E5FF",
    rank: "II",
  },
  {
    id: 3,
    award: "Best Student Branch Website",
    section: "IEEE Bangalore Section",
    year: "2019",
    icon: <Globe size={28} />,
    accent: "#3B82F6",
    rank: "III",
  },
  {
    id: 4,
    award: "Best Student Branch Website",
    section: "IEEE Bangalore Section",
    year: "2017",
    icon: <Globe size={28} />,
    accent: "#8B5CF6",
    rank: "IV",
  },
  {
    id: 5,
    award: "Silver Jubilee Milestone",
    section: "IEEE Bangalore Section · 25 Yrs (Est. 1991)",
    year: "2016",
    icon: <Medal size={28} />,
    accent: "#E2E8F0",
    rank: "V",
  },
  {
    id: 6,
    award: "Best Student Branch Website",
    section: "IEEE Bangalore Section",
    year: "2016",
    icon: <Award size={28} />,
    accent: "#00F5D4",
    rank: "VI",
  },
  {
    id: 7,
    award: "Best Student Branch in India",
    section: "IEEE India Council",
    year: "2003–04",
    icon: <Trophy size={28} />,
    accent: "#F59E0B",
    rank: "VII",
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const scrollPodium = (direction) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: direction * 280, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ach-hero-block > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".ach-plaque",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
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
            trigger: sectionRef.current,
            start: "top 90%",
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
            <div className="ach-hero-stats">
              <div className="ach-stat">
                <span className="ach-stat-value">{ACHIEVEMENTS.length}</span>
                <span className="ach-stat-key">Major Awards</span>
              </div>
              <div className="ach-stat-divider" />
              <div className="ach-stat">
                <span className="ach-stat-value">30+</span>
                <span className="ach-stat-key">Years</span>
              </div>
            </div>
            <div className="ach-orb">
              <iframe
                title="Achievement animation"
                className="ach-orb-lottie"
                src="https://lottie.host/?file=f399cd9d-eb80-432b-b0da-04e11035a8e4/RKEVGpvACW.json"
              />
            </div>
          </div>
        </div>

        <div className="ach-podium">
          <button
            className="ach-nav-btn ach-nav-prev"
            onClick={() => scrollPodium(-1)}
            aria-label="Previous awards"
          >
            <ChevronLeft size={20} />
          </button>

          <div ref={trackRef} className="ach-plaque-row">
            {ACHIEVEMENTS.map((item) => (
              <article
                key={item.id}
                className="ach-plaque"
                style={{ "--plaque-accent": item.accent }}
              >
                <span className="ach-plaque-year-bg">{item.year}</span>

                <div className="ach-plaque-ribbon" aria-hidden="true" />

                <div className="ach-plaque-medal">{item.icon}</div>

                <span className="ach-plaque-rank">{item.rank}</span>
                <span className="ach-plaque-year">{item.year}</span>

                <h3 className="ach-plaque-award">{item.award}</h3>
                <p className="ach-plaque-section">{item.section}</p>

                <div className="ach-plaque-base" aria-hidden="true" />
              </article>
            ))}
          </div>

          <button
            className="ach-nav-btn ach-nav-next"
            onClick={() => scrollPodium(1)}
            aria-label="Next awards"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <p className="ach-scroll-hint">← Scroll or swipe to explore all awards →</p>
      </div>
    </section>
  );
}
