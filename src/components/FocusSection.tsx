import { useEffect, useState } from "react";

const FocusSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

  const focusAreas = [
    {
      title: "Certifications",
      icon: "📜",
      description: "Foundational cloud, virtualization, and professional skills certifications earned during 2024.",
      skills: [
        "Red Hat Academy – Program Learner (2024)",
        "AWS Academy Graduate – Cloud Foundations",
        "VMware Cloud & Virtualization Concepts",
        "VMware Data Center Virtualization Core (CTA‑DCV)",
        "Working in a Digital World: Professional Skills"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Hackathons",
      icon: "🏁",
      description: "Hands‑on teamwork under time pressure across health and R&D themes.",
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
      description: "Content creation (YouTube monetized) and sports—staying creative and disciplined.",
      skills: ["YouTube Content Creation", "Monetization", "Sports"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Awards & Achievements",
      icon: "🏆",
      description: "Competitive results in martial arts and athletics.",
      skills: [
        "5× Taekwondo WTF tournament winner (MD/UA/BG)",
        "High‑school long‑distance marathon winner",
        "Consecutive 60m sprint winner"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Career Goal",
      icon: "💼",
      description: "Actively pursuing roles as a Software Developer or Web Developer.",
      skills: [
        "Software Development",
        "Web Development",
        "Open to internships & graduate roles"
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ];

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

  // Auto-rotate active skill
  useEffect(() => {
    if (!isVisible) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % focusAreas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, focusAreas.length]);

  return (
    <section id="focus" className="relative min-h-screen py-20">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">MY FOCUS</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6" />
          <p className="text-foreground text-lg max-w-2xl mx-auto">Areas of interest, recognition, and current goals.</p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className={`content-section cursor-pointer transition-all duration-300 animate-slide-up ${
                activeSkill === index ? "ring-2 ring-primary shadow-glow scale-[1.02]" : "hover:scale-[1.02]"
              } ${isVisible ? "in-view" : ""}`}
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => setActiveSkill(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveSkill(index); }}
              aria-label={`View ${area.title} details`}
              aria-current={activeSkill === index ? "true" : undefined}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="gradient-text text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/90">{area.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {area.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="tech-tag text-xs">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured focus detail with crossfade */}
        <div className={`glass-card rounded-2xl p-8 animate-scale-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.6s" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">{focusAreas[activeSkill].icon}</span>
                <div>
                  <h3 className="gradient-text text-3xl font-bold">
                    {focusAreas[activeSkill].title}
                  </h3>
                </div>
              </div>
              <p className="text-foreground text-lg leading-relaxed mb-6">
                {focusAreas[activeSkill].description}
              </p>
            </div>

            {/* Skills Display */}
            <div>
              <h4 className="text-primary font-semibold text-lg mb-4">Details</h4>
              <ul className="achievement-list">
                {focusAreas[activeSkill].skills.map((skill, index) => (
                  <li key={index} className="transition-all duration-300" style={{ transitionDelay: `${index * 80}ms` }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-3 mt-12 pt-8 border-t border-white/10">
            {focusAreas.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSkill(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSkill
                    ? "bg-primary scale-125 shadow-glow"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to ${focusAreas[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusSection;