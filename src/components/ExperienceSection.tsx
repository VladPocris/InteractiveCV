import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "lucide-react";

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleAchievements, setVisibleAchievements] = useState<Set<string>>(new Set());

  const experiences = [
    {
      title: "Frontend Developer (Independent Contractor)",
      company: "DOT (High Quality Digital SRL) · Shopify Partner agency",
      period: "Sep 2026 – Present",
      location: "Remote",
      type: "Contract",
      description: "Project-based independent contractor agreement with a Shopify Partner agency, delivering frontend work for its clients' headless Next.js storefronts and Shopify Liquid themes.",
      achievements: [
        "Delivered frontend work for five of the agency's client stores, all now live – two headless Next.js storefronts (VGR, Parflab) and three Shopify Liquid themes (Ella Cosmetic, Florentino Delure, MonManor).",
        "Shipped 46 merged pull requests through review by the agency lead – 33 of them on VGR in three weeks – and wrote 190+ Vitest unit tests across the two headless codebases.",
        "Worked directly with the VGR client day to day, clarifying requirements, walking through changes and turning feedback rounds into shipped features."
      ],
      technologies: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Shopify Storefront & Admin APIs", "Liquid", "Vitest"],
      icon: "⚛️"
    },
    {
      title: "Webflow Developer & Content Creator",
      company: "ItSpot Tallaght Computer Repairs · Tallaght, IE",
      period: "Mar 2024 – Sep 2024",
      location: "Tallaght, Dublin, Ireland",
      type: "Freelance",
      description: "Built the business's responsive marketing website on Webflow CMS and produced PC build and repair video content.",
      achievements: [
        "Built and launched the business's responsive Webflow CMS website, set up so staff publish their own updates.",
        "Wrote editor documentation and trained staff to maintain the site.",
        "Scripted, recorded and edited PC build and repair walkthrough videos."
      ],
      technologies: ["Webflow", "CMS Collections", "Responsive Design", "Technical Documentation", "Video Editing"],
      icon: "🌐"
    },
    {
      title: "Service Dispatcher",
      company: "DWSmart LLC",
      period: "Jun 2024 – Sep 2024",
      location: "Remote",
      type: "Contract",
      description: "Remote dispatch role coordinating daily operations and client communication for a small trucking fleet.",
      achievements: [
        "Coordinated daily truck dispatch and kept clients informed in a fast-paced remote role."
      ],
      technologies: ["Remote Coordination", "Client Communication", "Prioritisation"],
      icon: "🚚"
    },
    {
      title: "Student Intern (On-Campus Internship)",
      company: "Technological University Dublin · Tallaght, IE",
      period: "Jun 2023 – Sep 2023",
      location: "Tallaght, Dublin, Ireland",
      type: "Internship",
      description: "Supported faculty with reporting and documentation during a summer on-campus internship.",
      achievements: [
        "Created data-tracking templates and scripted CSV exports for faculty reporting.",
        "Wrote technical documentation for faculty research projects."
      ],
      technologies: ["Reporting", "CSV Export", "Documentation"],
      icon: "🎓"
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

    const element = document.querySelector("#experience");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Timeline progress based on scroll within section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const passed = window.innerHeight - rect.top;
      const progress = Math.min(Math.max((passed / total) * 100, 0), 100);
      setTimelineProgress(progress);

      // Mark achievements as visible based on card position
      const cards = sectionRef.current.querySelectorAll(".exp-card");
      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < window.innerHeight - 100) {
          // Stagger achievement visibility
          setTimeout(() => {
            setVisibleAchievements(prev => new Set(prev).add(`exp-${idx}`));
          }, idx * 100);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="relative min-h-screen py-20" ref={sectionRef}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">EXPERIENCE</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none">
            <div className="h-full w-full bg-white/10 rounded-full" />
            <div
              className="absolute top-0 left-0 w-full bg-gradient-primary transition-all duration-300 rounded-full"
              style={{ height: `${timelineProgress}%` }}
            />
          </div>

          <div className="space-y-8 lg:space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={`${experience.company}-${experience.period}`}
                className={`exp-card relative animate-slide-up ${isVisible ? "in-view" : ""}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="hidden lg:block absolute left-1/2 w-4 h-4 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow" />
                </div>

                <div className={`lg:w-5/12 ${index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}>
                  <div className="glass-card rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow">
                    <div className={`flex items-start justify-between gap-3 mb-3 lg:mb-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                      <div className={`flex items-start gap-3 flex-1 min-w-0 ${index % 2 === 0 ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                        <span className="text-2xl lg:text-3xl shrink-0">{experience.icon}</span>
                        <div className="min-w-0">
                          <h3 className="gradient-text text-lg lg:text-xl font-bold">{experience.title}</h3>
                          <p className="text-primary font-semibold text-sm lg:text-base">{experience.company}</p>
                        </div>
                      </div>
                      <span className={`px-2 lg:px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 shrink-0 ${index % 2 === 0 ? "lg:ml-2" : "lg:mr-2"}`}>
                        {experience.type}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm text-muted-foreground mb-3 lg:mb-4">
                      <span>📅 {experience.period}</span>
                      <span>📍 {experience.location}</span>
                    </div>

                    <p className="text-foreground text-sm leading-relaxed mb-4">{experience.description}</p>

                    <div className="mb-4">
                      <h4 className="text-primary font-semibold mb-2 text-sm">Key Achievements:</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {experience.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className={`flex items-start transition-all duration-300 ${
                              visibleAchievements.has(`exp-${index}`)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2"
                            }`}
                            style={{ transitionDelay: `${achIndex * 50}ms` }}
                          >
                            <span className="text-primary mr-2 shrink-0 lg:hidden">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-secondary/50 text-foreground text-xs rounded border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 animate-fade-in ${isVisible ? "in-view" : ""}`}>
          <div className="glass-card rounded-xl p-8 max-w-lg mx-auto">
            <p className="text-foreground text-lg mb-4">Interested in working together?</p>
            <a
              href="#contact"
              className="btn-gradient px-8 py-3 text-lg rounded-lg font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              Get In Touch
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;