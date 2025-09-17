import { useEffect, useState } from "react";
import experienceImage from "@/assets/experience-bg.jpg";

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const experiences = [
    {
      title: "Full-Stack Developer Intern",
      company: "Tech Solutions Ltd",
      period: "June 2024 - August 2024",
      location: "Dublin, Ireland",
      type: "Internship",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with senior developers on client projects and gained experience in agile development methodologies.",
      achievements: [
        "Built responsive web components serving 10,000+ users",
        "Improved application performance by 25%",
        "Implemented REST APIs with comprehensive testing",
        "Participated in code reviews and team standups"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Git", "Jira"],
      icon: "💻"
    },
    {
      title: "YouTube Content Creator",
      company: "Personal Channel",
      period: "2023 - Present",
      location: "Remote",
      type: "Self-Employed",
      description: "Created educational content focused on programming tutorials and tech reviews. Built and managed a growing community while developing strong communication and video production skills.",
      achievements: [
        "Generated 330,000+ views in 3 months",
        "Reached 500,000+ total channel views",
        "Built engaged subscriber base of 15,000+",
        "Monetization eligibility achieved"
      ],
      technologies: ["Video Editing", "SEO", "Analytics", "Social Media"],
      icon: "🎥"
    },
    {
      title: "IT Support Assistant",
      company: "University IT Department",
      period: "September 2023 - May 2024",
      location: "Dublin, Ireland",
      type: "Part-time",
      description: "Provided technical support to students and faculty. Troubleshot hardware and software issues while maintaining computer labs and network infrastructure.",
      achievements: [
        "Resolved 95% of support tickets within SLA",
        "Assisted 200+ users weekly with technical issues",
        "Maintained lab equipment and software updates",
        "Created user guides and documentation"
      ],
      technologies: ["Windows", "MacOS", "Network Admin", "Help Desk"],
      icon: "🔧"
    },
    {
      title: "Hackathon Team Leader",
      company: "Various Events",
      period: "2022 - Present",
      location: "Ireland & International",
      type: "Competition",
      description: "Led development teams in multiple hackathon competitions, focusing on innovative solutions to real-world problems using cutting-edge technologies.",
      achievements: [
        "Won 2nd place at Dublin Tech Hackathon 2024",
        "Led team of 5 developers successfully",
        "Developed AI-powered sustainability app in 48 hours",
        "Presented solutions to industry judges"
      ],
      technologies: ["Team Leadership", "Rapid Prototyping", "AI/ML", "Presentation"],
      icon: "🏆"
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
        <div className="relative overflow-hidden">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform -translate-x-1/2" />

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
                    <div className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300">
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