import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github, ChevronDown, ChevronUp, Star } from "lucide-react";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  type Project = {
    title: string;
    relationship: "DOT Client" | "Independent Project" | "University Project";
    subtitle: string;
    description: string;
    featured?: boolean;
    keyFeatures: string[];
    technologies: string[];
    github: string | null;
    live: string | null;
    icon: string;
    color: string;
  };

  // Client projects were delivered as an independent contractor for DOT; their source code is private.
  const projects: Project[] = [
    {
      title: "VGR — Headless Shopify Storefront",
      relationship: "DOT Client",
      subtitle: "UK retailer · Sep 2026",
      description: "Feature work on a production headless storefront: shipped 33 reviewed pull requests in three weeks while working directly with the client.",
      featured: true,
      keyFeatures: [
        "Product comparison table and specification filters driven by one shared metafield data model, with the logic in pure TypeScript modules covered by 80+ unit tests",
        "Diagnosed a broken price-range filter as the Storefront API narrowing price bounds to the active filter; fixed it with a separate, unfiltered bounds query and a regression test",
        "Metaobject-driven video components (a scroller that plays only the centred clip, with reduced-motion support) and an accessible gallery lightbox on the native dialog element",
        "Node.js Admin API scripts that provision metaobject and metafield definitions so the client edits videos, specifications and FAQs in Shopify admin"
      ],
      technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Shopify Storefront API", "Admin API", "Vitest"],
      github: null,
      live: "https://vgr.store",
      icon: "🛒",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Parflab — Headless Perfume Store",
      relationship: "DOT Client",
      subtitle: "Romania · Sep 2026",
      description: "First versions of seven storefront features from Figma, plus consent-aware analytics and an automated product-image pipeline.",
      featured: true,
      keyFeatures: [
        "Consent-gated Meta Pixel tracking backed by a useSyncExternalStore consent store (cross-tab sync, no hydration mismatch) with one PageView per navigation",
        "Node.js pipeline that composites product photos into a Figma-defined template, checks geometry and publishes 2,300+ images through the Admin GraphQL API in resumable, read-back-verified runs",
        "First versions of seven storefront features in 13 pull requests, later integrated with Shopify by the agency lead"
      ],
      technologies: ["Next.js", "TypeScript", "next-intl", "Node.js", "Shopify Admin GraphQL API"],
      github: null,
      live: "https://www.parflab.ro",
      icon: "🧴",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Ella Cosmetic (SKYA) — Liquid Theme Extension",
      relationship: "DOT Client",
      subtitle: "Moldova · Sep 2026",
      description: "Extended a premium Shopify theme with custom sections, templates and a metaobject-driven ingredient library.",
      keyFeatures: [
        "9 custom sections, 5 snippets and 15 JavaScript/CSS assets (~3.4k lines) used across 15 JSON templates",
        "Ingredient library generated from metaobjects, with search and an A–Z index",
        "Per-range product templates and a drag, swipe and keyboard product rail",
        "Legacy-site content migrated into metaobjects and metafields with Admin API scripts, with backups and verification"
      ],
      technologies: ["Shopify Liquid", "Online Store 2.0", "Metaobjects", "Metafields", "JavaScript", "CSS"],
      github: null,
      live: "https://ella.md",
      icon: "🌿",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Florentino Delure — Campaign Landing Page",
      relationship: "DOT Client",
      subtitle: "Menswear brand · Sep 2026",
      description: "Developed the first version of a CSR campaign landing page from editor-configurable Liquid sections and blocks; the page was later extended by others.",
      keyFeatures: [
        "Editor-configurable Liquid sections and blocks on a Dawn-based theme"
      ],
      technologies: ["Shopify Liquid", "Sections & Blocks", "Dawn"],
      github: null,
      live: "https://florentinodelure.com/pages/best-for-romania",
      icon: "👔",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "MonManor — Theme Configuration & Localisation",
      relationship: "DOT Client",
      subtitle: "Home textiles store · Sep 2026",
      description: "Configured store templates on the agency's base theme and completed the Romanian locale to clear missing translations.",
      keyFeatures: [
        "Template configuration and full Romanian localisation of the storefront"
      ],
      technologies: ["Shopify Liquid", "Theme Configuration", "Localisation"],
      github: null,
      live: "https://monmanor.md",
      icon: "🏡",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "CivPlayers Civ3 League",
      relationship: "Independent Project",
      subtitle: "Online gaming community platform · Sep 2025 – Oct 2025",
      description: "React and TypeScript web app for a Civilization III multiplayer league, with leaderboards, player profiles, events and an Elo-based team generator.",
      featured: true,
      keyFeatures: [
        "Team generator that evaluates every captain-draft split for 4–8 players to balance rating totals and shows each side's Elo win probability",
        "Sortable, searchable leaderboards for 8 game modes, loaded from published Google Sheets CSV data",
        "Player profiles with charts, plus events, guides and admin pages",
        "Deployed with a GitHub Actions workflow to a custom domain"
      ],
      technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Chart.js", "GitHub Actions"],
      github: "https://github.com/VladPocris/CivPlayers-Civ3-League",
      live: "https://civplayersciv3league.com/",
      icon: "🎮",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "BreachExplorer — Data-Breach Dashboard",
      relationship: "University Project",
      subtitle: "Full-stack .NET web app · Nov 2024",
      description: "Blazor WebAssembly dashboard of public breach data, backed by an ASP.NET Core proxy API that keeps the Have I Been Pwned key server-side and avoids browser CORS limits.",
      keyFeatures: [
        "Latest-breach highlight, top-15 chart and a searchable comparison chart",
        "Email check that discovers sources through LeakCheck's public API and enriches each with Have I Been Pwned breach details, de-duplicating sources and throttling requests",
        "API containerised with Docker and hosted on Render; client published to GitHub Pages",
        "GitHub Actions pipeline that runs Playwright UI tests before publishing"
      ],
      technologies: ["C#", ".NET 8", "Blazor WebAssembly", "ASP.NET Core", "Docker", "Playwright", "MSTest", "GitHub Actions"],
      github: "https://github.com/VladPocris/BreachExplorer",
      live: "https://vladpocris.github.io/BreachExplorer/",
      icon: "📊",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "RenCloud — Windows Video Editor",
      relationship: "University Project",
      subtitle: "Final-year project (individual) · Oct 2024 – Apr 2025",
      description: "Windows video editor with a custom timeline engine, live preview, frame thumbnails and audio waveforms.",
      keyFeatures: [
        "Custom timeline engine with no UI SDK: a segment model with split, delete and drag-reorder that recalculates every clip position",
        "Frame thumbnails and audio waveform rendering on the timeline",
        "LibVLC for continuous scrub preview and FFmpeg for rendering",
        "GitHub Actions CI with a SonarQube quality gate and a WiX MSI installer"
      ],
      technologies: ["C#", ".NET Framework", "Windows Forms", "FFmpeg", "LibVLC", "MSTest", "SonarQube", "GitHub Actions"],
      github: "https://github.com/VladPocris/RenCloud",
      live: "https://github.com/VladPocris/RenCloud/releases",
      icon: "🎬",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "SmartRoute — Route-Planning App",
      relationship: "University Project",
      subtitle: "Android app with REST API · May 2025 – Jun 2025",
      description: "Android application that plans optimised multi-stop routes, backed by an ASP.NET Core REST API.",
      keyFeatures: [
        "Google Places autocomplete and optimised routing with the Google Directions API",
        "Trips shared through a six-digit code",
        "REST API for trips and route steps (create, read, update and delete by share code)",
        "Storage migrated from Azure SQL to Supabase PostgreSQL and the API redeployed on Render"
      ],
      technologies: ["Java", "Android", "ASP.NET Core", "PostgreSQL (Supabase)", "Google Maps APIs", "Docker"],
      github: "https://github.com/VladPocris/SmartRoute",
      live: null,
      icon: "🗺️",
      color: "from-blue-500 to-cyan-500"
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
            Commercial work delivered for DOT clients, an independent project and university projects – from headless React storefronts and Shopify themes to full-stack .NET applications.
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
              key={project.title}
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
                      <span className="inline-block mr-2 px-2 py-0.5 text-xs font-semibold rounded-full border border-primary/30 bg-primary/10 align-middle">
                        {project.relationship}
                      </span>
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
                      onClick={() => window.open(project.github!, "_blank")}
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
                      onClick={() => window.open(project.live!, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {project.relationship === "DOT Client" ? "Live Site" : "Live Demo"}
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