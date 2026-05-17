import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github, ChevronDown, ChevronUp, Star } from "lucide-react";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Odys Global",
      subtitle: "Premium Aged-Domain Marketplace Platform",
      description: "Contributed to the frontend development of a premium aged-domain marketplace platform focused on usability and performance. Built responsive UI components and integrated dynamic marketplace listings using REST APIs.",
      featured: true,
      keyFeatures: [
        "Responsive UI components with mobile-first design for marketplace platform",
        "Dynamic marketplace listings integration using REST APIs",
        "Improved page responsiveness and optimized rendering behavior",
        "Smoother user experience across desktop and mobile devices"
      ],
      technologies: ["React.js", "JavaScript", "REST APIs", "Responsive Design", "Performance Optimization"],
      github: null,
      live: "https://www.odysglobal.com",
      icon: "🌐",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "HTML & CSS Practice Portfolio",
      subtitle: "freeCodeCamp Responsive Web Design Certification",
      description: "A collection of HTML and CSS practice projects completed while earning freeCodeCamp's Responsive Web Design certification, showcasing fundamental web development skills and responsive design principles.",
      keyFeatures: [
        "Responsive layouts with mobile-first design",
        "Semantic HTML5 markup and accessibility best practices",
        "CSS animations and transitions for interactive elements",
        "Form validation and user input handling",
        "Cross-browser compatible implementations"
      ],
      technologies: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design", "Media Queries", "CSS Animations"],
      github: "https://github.com/VladPocris/HTML-CSS-WORK",
      live: null,
      icon: "📝",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "CivPlayers Civ3 League",
      subtitle: "Online Gaming Community Platform",
      description: "Front-end web application for a Civilization III multiplayer league featuring live leaderboards, event management, and ELO-based team generation.",
      featured: true,
      keyFeatures: [
        "Real-time CSV data integration from Google Sheets with <200ms fetch latency",
        "Brute-force team balancing algorithm for optimal 4-8 player splits with probability analysis (<100ms computation)",
        "Comprehensive admin panel with ordered content management and drag-and-drop functionality",
        "Responsive SPA built with React 18 and TypeScript"
      ],
      technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Google Sheets API", "shadcn/ui", "Radix UI", "GitHub Actions", "GitHub Pages"],
      github: "https://github.com/VladPocris/CivPlayers-Civ3-League",
      live: "https://civplayersciv3league.com/",
      icon: "🎮",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "SmartRoute",
      subtitle: "Multi-Stop Journey Planning App",
      description: "Android application that plans optimized multi-stop journeys with Google Places autocomplete and route visualization on Google Maps.",
      keyFeatures: [
        "Google Places autocomplete for destination search",
        "Optimized routing using Google Maps Directions API",
        "Six-digit trip code generation for easy sharing",
        "ASP.NET Core Web API backend with Azure SQL persistence",
        "Per-leg detail cards with distance/time and map previews",
        "Offline caching for instant reload"
      ],
      technologies: ["Java 17", "Android Studio", "Google Maps SDK", "Directions API", "Places API", "Retrofit", "ASP.NET Core", "Azure SQL", "Azure App Service"],
      github: "https://github.com/VladPocris/SmartRoute",
      live: "https://smartroute-i92g.onrender.com/api/trips",
      icon: "🗺️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "RenCloud",
      subtitle: "Windows Video Editing Environment",
      description: "Professional Windows-based video editing application with timeline controls, live thumbnails, and audio waveforms.",
      keyFeatures: [
        "Timeline trim/split/rearrange with frame-accurate control",
        "Live thumbnail previews and audio waveform visualization",
        "FFmpeg integration for advanced video processing",
        "VLC/LibVLC for seamless playback",
        "CI/CD with GitHub Actions and SonarQube quality gates",
        "MSI installer packaging with WiX Toolset"
      ],
      technologies: ["C#", ".NET 8", "Windows Forms", "FFmpeg", "LibVLC", "SonarQube", "GitHub Actions", "WiX Toolset"],
      github: "https://github.com/VladPocris/RenCloud",
      live: "https://github.com/VladPocris/RenCloud/releases",
      icon: "🎬",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "BreachExplorer",
      subtitle: "Data Breach Visualization Tool",
      description: "Blazor WebAssembly SPA that visualizes global 'Have I Been Pwned?' breach statistics with interactive charts and personalized breach checking.",
      keyFeatures: [
        "Top-15 global breach incidents visualization",
        "Per-company breach charts with real-time toggles",
        "Email breach checking via custom ASP.NET Core proxy",
        "CORS bypass with Azure App Service backend",
        "Personalized security guidance based on breach results",
        "Responsive design with BlazorBootstrap"
      ],
      technologies: ["C#", ".NET 8", "Blazor WebAssembly", "ASP.NET Core", "Azure Static Sites", "Azure App Service", "Chart.js", "Playwright", "BlazorBootstrap"],
      github: "https://github.com/VladPocris/BreachExplorer",
      live: "https://vladpocris.github.io/BreachExplorer/",
      icon: "📊",
      color: "from-green-500 to-emerald-500"
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
    <section id="projects" className="relative min-h-screen py-20">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="section-title text-5xl lg:text-6xl font-bold mb-4">PROJECTS</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6" />
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent development work showcasing full-stack capabilities, cloud integration, and modern frameworks.
          </p>
        </div>

        {/* Migration notice */}
        <div className={`max-w-5xl mx-auto mb-12 animate-fade-in ${isVisible ? "in-view" : ""}`}>
          <div className="content-section border-l-4 border-yellow-400/50">
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">⚠️</span>
              <div>
                <p className="text-sm text-yellow-100 font-medium mb-1">Azure Migration Notice</p>
                <p className="text-sm text-yellow-100/80">
                  My Azure student subscription has ended, so some APIs and databases have been migrated to free-tier services that may sleep when idle.
                  If a live demo appears down, please <a href="#contact" className="underline underline-offset-2 text-yellow-200 hover:text-yellow-100 font-semibold">contact me</a> and I'll bring it back online.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`content-section transition-all duration-500 animate-slide-up ${isVisible ? "in-view" : ""}`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`text-4xl shrink-0 p-3 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-10`}>
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="section-title text-2xl font-bold">
                        {project.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border transition-opacity duration-300 ${project.featured ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 opacity-100" : "opacity-0 pointer-events-none absolute"}`}>
                        <Star className="h-3 w-3 fill-yellow-400" />
                        Featured
                      </span>
                    </div>
                    <p className="text-primary font-semibold mb-2">
                      {project.subtitle}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 shrink-0">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/40 text-primary hover:bg-primary/10"
                      onClick={() => window.open(project.github, "_blank")}
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.live ? (
                    <Button
                      size="sm"
                      className="btn-gradient"
                      onClick={() => window.open(project.live, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      disabled
                      className="px-4 py-2 bg-muted/40 text-muted-foreground cursor-not-allowed opacity-50"
                      title="Repository only - no live demo available"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Repo Only
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium mb-3 group"
                  aria-expanded={expandedProject === index}
                >
                  <span className="transition-transform duration-200 group-hover:translate-y-0.5">
                    {expandedProject === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                  {expandedProject === index ? "Hide Details" : "Show Key Features & Technologies"}
                </button>

                <div
                  className="transition-all duration-400 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: expandedProject === index ? "600px" : "0px",
                    opacity: expandedProject === index ? 1 : 0,
                  }}
                >
                  <div className="space-y-4 pt-2">
                    {/* Tech tags preview */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag text-xs">{tech}</span>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-primary font-semibold mb-2 flex items-center gap-2">
                        <span>⚡</span> Key Features
                      </h4>
                      <ul className="achievement-list">
                        {project.keyFeatures.map((feature, fIndex) => (
                          <li key={fIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center animate-fade-in ${isVisible ? "in-view" : ""}`}>
          <div className="content-section max-w-3xl mx-auto">
            <p className="text-foreground text-lg mb-6">
              Want to see more of my work or collaborate on a project?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="btn-gradient px-8 py-3 text-lg"
                onClick={() => window.open("https://github.com/vladpocris", "_blank")}
              >
                <Github className="h-5 w-5 mr-2" />
                View All Projects on GitHub
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg border-primary/40 text-primary hover:bg-primary/10"
                onClick={() => window.open("https://github.com/VladPocris/InteractiveCV", "_blank")}
              >
                <Github className="h-5 w-5 mr-2" />
                Portfolio Source Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;