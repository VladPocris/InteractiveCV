import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import projectsImage from "@/assets/projects-bg.jpg";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    {
      title: "CivPlayers Civ3 League · Online",
      description: "Front‑end web application for a Civilization III multiplayer league with live leaderboards, event management, and ELO‑based team generation. Built responsive SPA with React 18 and TypeScript integrating real‑time CSV data from Google Sheets (<200ms fetch latency). Engineered brute‑force team balancing algorithm generating optimal 4‑8 player splits with probability analysis (<100ms computation). Developed comprehensive admin panel with ordered content blocks (paragraphs, images, links) and JSON export, reducing content update time by 80%. Created 40+ reusable UI components using shadcn/ui with custom Civ3 theme and mobile‑first design.",
      technologies: [
        "React 18",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Google Sheets API",
        "shadcn/ui",
        "Radix UI",
        "GitHub Actions",
        "GitHub Pages",
        "Git"
      ],
      github: "https://github.com/VladPocris/CivPlayers-Civ3-League",
      live: "https://civplayersciv3league.com/",
      icon: "🎮"
    },
    {
      title: "SmartRoute · Tallaght, IE",
      description: "Android app that plans multi‑stop journeys with Google Places autocomplete and an optimised route drawn on Google Maps (Directions API). Generates a six‑digit trip code; an ASP.NET Core Web API (Azure App Service) persists trips & steps in Azure SQL and exposes CRUD. 'Show details' per‑leg cards with distance/time + on‑demand map previews; offline caching for instant reload.",
      technologies: [
        "Java 17",
        "Android Studio",
        "Google Maps SDK",
        "Directions API",
        "Places API",
        "Retrofit",
        "ASP.NET Core Web API",
        "Azure SQL Database",
        "Azure App Service",
        "Git"
      ],
      github: "https://github.com/VladPocris/SmartRoute",
      live: "https://smartroute-i92g.onrender.com/api/trips",
      icon: "🗺️"
    },
    {
      title: "RenCloud · Tallaght, IE",
      description: "Windows‑based video‑editing environment with timeline trim/split/rearrange, live thumbnails and audio waveforms. Integrates FFmpeg (advanced processing roadmap) and VLC/LibVLC for seamless, frame‑accurate playback. CI with GitHub Actions + SonarQube quality gates; WiX Toolset packaging produces an MSI installer. Plugin‑ready architecture for future extensibility.",
      technologies: [
        "C#",
        ".NET 8",
        "Windows Forms",
        "FFmpeg",
        "LibVLC",
        "SonarQube",
        "GitHub Actions",
        "WiX Toolset",
        "Git"
      ],
      github: "https://github.com/VladPocris/RenCloud",
      live: "https://github.com/VladPocris/RenCloud/releases",
      icon: "🎬"
    },
    {
      title: "BreachExplorer · Tallaght, IE",
      description: "Blazor WebAssembly SPA that visualises global ‘Have I Been Pwned?’ breach stats: top‑15 incidents and per‑company charts with real‑time toggles. ‘Was I Breached?’ checks an email via a custom ASP.NET Core Web API proxy (Azure App Service) to bypass CORS and returns personalised guidance. Responsive design built with BlazorBootstrap.",
      technologies: [
        "C#",
        ".NET 8",
        "Blazor WebAssembly",
        "ASP.NET Core Web API",
        "Azure Blob Static Site",
        "Azure App Service",
        "Chart.js",
        "Playwright",
        "CSS",
        "HTML",
        "BlazorBootstrap",
        "Git"
      ],
      github: "https://github.com/VladPocris/BreachExplorer",
      live: "https://vladpocris.github.io/BreachExplorer/",
      icon: "📊"
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

    const element = document.querySelector("#projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="projects" 
      className="parallax-section relative"
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.8), rgba(34, 34, 34, 0.6)), url(${projectsImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-secondary opacity-60" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">PROJECTS</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        {/* Hosting Notice */}
        <div className={`max-w-4xl mx-auto mb-10 animate-fade-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.1s" }}>
          <div className="glass-card rounded-lg p-4 border border-yellow-400/30">
            <p className="text-sm text-yellow-100">
              Note: My Azure student subscription has ended, so I migrated some APIs and databases to free-tier services that may sleep when idle. If a live demo or API endpoint appears down, it likely just needs a manual restart per the provider's policy. Please <a href="#contact" className="underline underline-offset-4 text-yellow-200 hover:text-yellow-100">contact me</a> and I will bring it back online.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 transition-transform duration-200 ease-out hover:-translate-y-1 transform-gpu animate-slide-up ${isVisible ? "in-view" : ""} overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Icon */}
              <div className="text-4xl mb-4 text-center">
                {project.icon}
              </div>

              {/* Project Title */}
              <h3 className="gradient-text text-xl font-bold mb-3 text-center">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Button>
                <Button 
                  size="sm"
                  className="flex-1 btn-gradient"
                  onClick={() => window.open(project.live, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 animate-fade-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.6s" }}>
          <p className="text-foreground text-lg mb-6">
            Interested in seeing more of my work?
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              className="btn-gradient px-8 py-3 text-lg"
              onClick={() => window.open("https://github.com/vladpocris", "_blank")}
            >
              <Github className="h-5 w-5 mr-2" />
              View All Projects
            </Button>
            <Button
              variant="outline"
              className="px-4 py-3 text-lg border-primary/30 text-primary hover:bg-primary/10 flex items-center"
              onClick={() => window.open("https://github.com/VladPocris/InteractiveCV", "_blank")}
            >
              <Github className="h-5 w-5 mr-2" />
              Portfolio Code
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;