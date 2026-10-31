import { useEffect, useState } from "react";

const FocusSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFocus, setActiveFocus] = useState(0);

  const focusAreas = [
    {
      title: "Certifications",
      icon: "📜",
      description: "Earned freeCodeCamp certifications, plus cloud and virtualisation training completed during my studies.",
      skills: [
        "freeCodeCamp — Responsive Web Design Certification (2026)",
        "freeCodeCamp — JavaScript Certification (2026)",
        "AWS Academy — Cloud Foundations (course completion)",
        "Red Hat Academy — Program Learner badge (2024)",
        "VMware IT Academy — Cloud and Virtualization Concepts (course)",
        "VMware IT Academy — Data Center Virtualization Core Technical Skills (course)"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Hackathons",
      icon: "🏁",
      description: "Took part in three hackathons during my degree, working in teams under time pressure on health and R&D themes.",
      skills: [
        "Ethicon Hackathon (May 2024)",
        "RAD Hackathon (Apr 2024)",
        "Health Hackathon (Mar 2024)"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Interests",
      icon: "🎥",
      description: "Continuous learning, content creation and sport outside of software work.",
      skills: [
        "Continuous learning: web development, testing, cloud and systems engineering",
        "YouTube content creation and video editing",
        "Sports"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Awards & Achievements",
      icon: "🏆",
      description: "Competitive results in martial arts.",
      skills: [
        "Five-time Taekwondo champion (Republic of Moldova, Ukraine, Bulgaria)"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Career Goal",
      icon: "💼",
      description: "Looking for fully remote frontend or full-stack development work where I can ship production features and keep growing as an engineer.",
      skills: [
        "Frontend Development (React, TypeScript, Next.js)",
        "Full-Stack Web Development",
        "EU citizen · Authorised to work across the EU without sponsorship · Open to relocation within the EU",
        "Languages: Romanian (native), English (fluent), Russian (fluent)"
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const [certifications, ...otherFocusAreas] = focusAreas;

  const renderFocusCard = (area: (typeof focusAreas)[number], wide = false) => (
    <article
      key={area.title}
      className={`glass-card rounded-2xl p-5 md:p-6 ${wide ? "col-span-full" : ""}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl leading-none">{area.icon}</span>
        <div className="min-w-0">
          <h4 className="gradient-text text-xl font-bold break-anywhere">{area.title}</h4>
          <p className="text-sm text-foreground/90 mt-2 leading-relaxed">{area.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {area.skills.map((skill) => (
          <span key={skill} className="tech-tag text-xs break-anywhere">{skill}</span>
        ))}
      </div>
    </article>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#focus");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveFocus((prev) => (prev + 1) % focusAreas.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isVisible, focusAreas.length]);

  return (
    <section id="focus" className="relative min-h-screen py-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">MY FOCUS</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6" />
          <p className="text-foreground text-lg max-w-2xl mx-auto">Areas of interest, recognition, and current goals.</p>
        </div>

        {/* Focus Carousel */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 animate-scale-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.6s" }}>
          <div className="lg:col-span-12 content-section rounded-2xl p-6 md:p-8">
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex items-center justify-center gap-4 min-w-0 flex-1 text-center">
                  <span className="text-5xl md:text-6xl">{focusAreas[activeFocus].icon}</span>
                  <h3 className="gradient-text text-3xl md:text-4xl font-bold whitespace-nowrap">{focusAreas[activeFocus].title}</h3>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 md:p-6">
                <p className="text-foreground text-lg leading-relaxed max-w-4xl">
                  {focusAreas[activeFocus].description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {focusAreas.map((area, index) => (
                  <button
                    key={area.title}
                    type="button"
                    onClick={() => setActiveFocus(index)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                      index === activeFocus
                        ? "bg-primary/15 text-primary border-primary/30 shadow-glow scale-[1.03]"
                        : "bg-secondary/50 text-foreground border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                    aria-label={`Show ${area.title}`}
                    aria-current={activeFocus === index ? "true" : undefined}
                  >
                    {area.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {renderFocusCard(certifications, true)}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {otherFocusAreas.map((area) => renderFocusCard(area))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusSection;