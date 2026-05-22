import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "lucide-react";

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleAchievements, setVisibleAchievements] = useState<Set<string>>(new Set());

  const experiences = [
    {
      title: "Frontend Developer",
      company: "Compire · Chisinau, Republic of Moldova",
      period: "Oct 2024 – Feb 2026",
      location: "Chisinau, Moldova (Remote)",
      type: "Full-time",
      description: "Developed interactive frontend features using React.js for a startup web application, improving responsiveness and user experience across desktop and mobile devices.",
      achievements: [
        "Developed interactive frontend features using React.js for a startup web application, improving responsiveness and user experience across desktop and mobile devices.",
        "Implemented API integrations using Express.js, AWS Lambda, and SendGrid to support application workflows and notifications.",
        "Collaborated with designers and developers in an Agile environment to deliver features and consistent UI quality."
      ],
      technologies: ["React.js", "JavaScript", "API Integration", "AWS Lambda", "SendGrid", "Responsive Design", "Agile"],
      icon: "⚛️"
    },
    {
      title: "Dispatcher (Remote)",
      company: "DWSmart LLC · Chisinau, Moldova",
      period: "Jun 2024 – Sep 2024",
      location: "Chisinau, Moldova (Remote)",
      type: "Contract",
      description: "Coordinated daily logistics operations, optimized routes and managed client communications to maintain high on‑time delivery performance.",
      achievements: [
        "Coordinated daily logistics operations, optimizing routes and managing client communications; maintained 98% on‑time delivery rate and ensured revenue targets of $1.80+/mile.",
        "Maintained consistent service quality while multitasking in a fast‑paced environment handling 2–3 trucks daily."
      ],
      technologies: ["Logistics Coordination", "Route Optimization", "Client Communications"],
      icon: "🚚"
    },
    {
      title: "Webflow Developer & Content Creator",
      company: "ItSpot · Tallaght, IE",
      period: "Mar 2024 – Sep 2024",
      location: "Tallaght, Ireland",
      type: "Freelance",
      description: "Designed and shipped a responsive marketing site in Webflow using CMS collections and integrated contact-form submissions. Produced PC-build video content for ItSpot's YouTube channel.",
      achievements: [
        "Designed and launched a responsive marketing site using Webflow, improving client engagement by 28%.",
        "Improved mobile performance (4.2s to 2.6s) via CMS restructure and lazy-loading.",
        "Created step-by-step Editor docs and delivered 30-minute staff training.",
        "Scripted, recorded, and edited walkthrough videos end-to-end (VO + post)."
      ],
      technologies: ["Webflow", "CMS Collections", "Interactions", "Core Web Vitals", "SEO", "CapCut", "Adobe After Effects"],
      icon: "🌐"
    },
    {
      title: "Cleaning Specialist",
      company: "Derrycourt Cleaning Specialists · Ireland",
      period: "Sep 2023 – Oct 2023",
      location: "Ireland · On-site",
      type: "Part-time",
      description: "Supported healthcare and commercial environments with high-standard cleaning under strict protocols.",
      achievements: [
        "Followed infection-control standards with specialized equipment and materials",
        "Handled ad-hoc requests with strong flexibility and time management",
        "Completed daily logs and checklists for audit and health & safety compliance"
      ],
      technologies: ["Infection Control", "H&S Compliance", "Time Management"],
      icon: "🧹"
    },
    {
      title: "OCIP — On Campus Internship",
      company: "Technological University Dublin · Tallaght, IE",
      period: "Jun 2023 – Sep 2023",
      location: "Tallaght, Ireland",
      type: "Internship",
      description: "Supported students and faculty with skills tracking and documentation while pursuing structured professional development.",
      achievements: [
        "Facilitated faculty research projects by authoring technical documentation and implementing data-tracking templates; cut report turnaround time by 25%.",
        "Streamlined reporting templates and programmed CSV exports that cut weekly report preparation time by 66%.",
        "Awarded 100% discount for AWS Cloud Practitioner exam"
      ],
      technologies: ["AWS", "Reporting", "Documentation", "CSV Export", "Organization"],
      icon: "🎓"
    },
    {
      title: "Cleaner",
      company: "Ashbrook Facility Management (AFM) Ireland · Bray, IE",
      period: "Aug 2021 – Sep 2023",
      location: "Bray, Ireland · On-site",
      type: "Part-time",
      description: "Maintained cleanliness across specialized facilities with optimized scheduling and resource management.",
      achievements: [
        "Reduced daily cleaning time from 5.5h to 4h with schedule improvements",
        "Coordinated cleaning across labs, gym, and sports hall with 100% protocol adherence",
        "Supported 5 school events by aligning cleaning scope, timing, and supplies"
      ],
      technologies: ["Scheduling", "Resource Management", "Safety Protocols"],
      icon: "🧽"
    },
    {
      title: "Network Engineer",
      company: "Capri · Bray, IE",
      period: "Jun 2021 – Feb 2022",
      location: "Bray, Ireland",
      type: "Full-time",
      description: "Delivered network performance improvements and end‑user enablement across the site.",
      achievements: [
        "Increased internet/Wi‑Fi throughput by ~120 Mbps",
        "Trained 20 staff members, boosting productivity by ~15%",
        "Improved connectivity for 20+ users; reduced downtime by ~80%"
      ],
      technologies: ["Networking", "Wi‑Fi Optimization", "Troubleshooting", "End‑User Training"],
      icon: "📶"
    },
    {
      title: "Sales Assistant",
      company: "Linella · Chisinau, Moldova",
      period: "Jan 2019 – Jun 2019",
      location: "Chisinau, Moldova",
      type: "Full-time",
      description: "Assisted customers with product selection, maintained store presentation, and supported the retail team to meet daily sales targets.",
      achievements: [
        "Guided customers through product selection, boosting sales and ensuring a consistently positive shopping experience",
        "Resolved 30+ customer queries per shift with a 95% satisfaction rate through prompt issue resolution",
        "Maintained store presentation and organized merchandise according to company standards",
        "Collaborated with retail team members to meet daily sales targets in a high-traffic setting"
      ],
      technologies: ["Customer Service", "Merchandising", "Point of Sale"],
      icon: "🏪"
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