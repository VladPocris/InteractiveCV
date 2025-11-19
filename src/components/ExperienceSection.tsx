import { useEffect, useState } from "react";
import experienceImage from "@/assets/experience-bg.jpg";

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const experiences = [
    {
      title: "Customer Assistant",
      company: "Tesco · Ireland",
      period: "Oct 2025 – Present",
      location: "Ireland · On-site",
      type: "Contract",
      description: "Providing excellent customer service in a fast-paced retail environment, managing stock, and supporting daily store operations.",
      achievements: [
        "Delivering exceptional customer service and product knowledge across multiple departments",
        "Efficiently handling checkouts and maintaining high accuracy in cash handling",
        "Assisting with stock replenishment and maintaining store presentation standards",
        "Supporting team members during peak hours to ensure smooth operations"
      ],
      technologies: ["Customer Service", "Point of Sale", "Inventory Management", "Team Collaboration"],
      icon: "🛒"
    },
    {
      title: "Dispatcher (Remote)",
      company: "DWSmart LLC · Chisinau, Moldova Republic Of",
      period: "Jun 2025 – Sep 2025",
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
      period: "Mar 2025 – Sep 2025",
      location: "Tallaght, Ireland",
      type: "Freelance",
      description: "Designed and shipped a responsive marketing site in Webflow using CMS collections and integrated contact‑form submissions. Produced PC‑build video content for ItSpot’s YouTube channel.",
      achievements: [
        "Custom animations/interactions while keeping Core Web Vitals in the green",
        "Created step‑by‑step Editor docs + delivered 30‑minute staff training",
        "Scripted, recorded, and edited walkthrough videos end‑to‑end (VO + post)"
      ],
      technologies: ["Webflow", "CMS Collections", "Interactions", "Core Web Vitals", "SEO", "CapCut", "Adobe After Effects"],
      icon: "🌐"
    },
    {
      title: "OCIP — On Campus Internship",
      company: "Technological University Dublin · Tallaght, IE",
      period: "Jun 2024 – Sep 2024",
      location: "Tallaght, Ireland",
      type: "Internship",
      description: "Supported students and faculty with skills tracking and documentation while pursuing structured professional development.",
      achievements: [
        "Positive feedback from ~80% of faculty for skill‑tracking reports",
        "Awarded 100% discount for AWS Cloud Practitioner exam",
        "Completed 5 technical certifications during the internship",
        "Documented daily progress on skills and completed tasks"
      ],
      technologies: ["AWS", "Reporting", "Documentation", "Organization"],
      icon: "🎓"
    },
    {
      title: "Cleaning Specialist",
      company: "Derrycourt Cleaning Specialists · Ireland",
      period: "Sep 2023 – Oct 2023",
      location: "Ireland · On‑site",
      type: "Part-time",
      description: "Supported healthcare and commercial environments with high‑standard cleaning under strict protocols.",
      achievements: [
        "Followed infection‑control standards with specialized equipment/materials",
        "Handled ad‑hoc requests with strong flexibility and time management",
        "Completed daily logs and checklists for audit and H&S compliance"
      ],
      technologies: ["Infection Control", "H&S Compliance", "Time Management"],
      icon: "🧹"
    },
    {
      title: "Cleaner",
      company: "Ashbrook Facility Management (AFM) Ireland · Bray, IE",
      period: "Aug 2021 – Sep 2023",
      location: "Bray, Ireland · On‑site",
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
        "Guided customers through product selection, boosting sales and guaranteeing a consistently positive shopping experience.",
        "Resolved over 30 customer queries per shift, achieving a 95% satisfaction rate through prompt issue resolution and clear communication.",
        "Maintained store presentation and organized merchandise according to company standards.",
        "Collaborated with retail team members to meet daily sales targets in a high‑traffic setting."
      ],
      technologies: ["Customer Service", "Merchandising", "Point of Sale"],
      icon: "🛒"
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

  return (
    <section 
      id="experience" 
      className="parallax-section relative"
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.8), rgba(34, 34, 34, 0.6)), url(${experienceImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-secondary opacity-60" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">EXPERIENCE</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative overflow-visible">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform -translate-x-1/2 pointer-events-none" />

          {/* Experience Items */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((experience, index) => (
              <div 
                key={index}
                className={`relative animate-slide-up ${isVisible ? "in-view" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Mobile Layout - Stack vertically */}
                <div className="lg:hidden">
                  <div className="glass-card rounded-xl p-4 sm:p-6 w-full">
                    {/* Experience Header */}
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl flex-shrink-0">{experience.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="gradient-text text-lg font-bold break-words hyphens-auto">
                            {experience.title}
                          </h3>
                          <p className="text-primary font-semibold text-sm break-words hyphens-auto">
                            {experience.company}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 flex-shrink-0">
                          {experience.type}
                        </span>
                      </div>
                    </div>

                    {/* Period and Location */}
                    <div className="flex flex-col space-y-1 text-sm text-muted-foreground mb-4">
                      <span className="break-words hyphens-auto">📅 {experience.period}</span>
                      <span className="break-words hyphens-auto">📍 {experience.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-foreground text-sm leading-relaxed mb-4 break-words hyphens-auto">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-primary font-semibold mb-2 text-sm">Key Achievements:</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {experience.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <span className="text-primary mr-2 flex-shrink-0">•</span>
                            <span className="break-words hyphens-auto">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-secondary/50 text-foreground text-xs rounded border border-white/10 break-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Timeline style */}
                <div className="hidden lg:flex lg:flex-row lg:items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2" />

                  {/* Content Card */}
                  <div className={`w-5/12 ${
                    index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
                  }`}>
                    <div className="glass-card rounded-xl p-6 transition-transform duration-300 ease-out hover:scale-105 transform-gpu relative hover:z-20">
                      {/* Experience Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <span className="text-3xl flex-shrink-0">{experience.icon}</span>
                          <div className="min-w-0">
                            <h3 className="gradient-text text-xl font-bold break-words">
                              {experience.title}
                            </h3>
                            <p className="text-primary font-semibold break-words">
                              {experience.company}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 flex-shrink-0">
                          {experience.type}
                        </span>
                      </div>

                      {/* Period and Location */}
                      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground mb-4">
                        <span>📅 {experience.period}</span>
                        <span>📍 {experience.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-foreground text-sm leading-relaxed mb-4">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="text-primary font-semibold mb-2">Key Achievements:</h4>
                        <ul className="text-sm text-foreground space-y-1">
                          {experience.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-secondary/50 text-foreground text-xs rounded border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 animate-fade-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.8s" }}>
          <p className="text-foreground text-lg mb-6">
            Interested in working together?
          </p>
          <a 
            href="#contact"
            className="btn-gradient px-8 py-3 text-lg rounded-lg font-medium transition-all duration-300 hover:scale-105 inline-block"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;