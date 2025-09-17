import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import projectsImage from "@/assets/projects-bg.jpg";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      github: "https://github.com/vladpocris/ecommerce",
      live: "https://ecommerce-demo.com",
      icon: "🛒"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Vue.js", "Express.js", "Socket.io", "PostgreSQL"],
      github: "https://github.com/vladpocris/taskmanager",
      live: "https://taskmanager-demo.com",
      icon: "📋"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts, historical data visualization, and mobile-responsive design.",
      technologies: ["React", "D3.js", "Weather API", "Tailwind CSS"],
      github: "https://github.com/vladpocris/weather",
      live: "https://weather-demo.com",
      icon: "🌤️"
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for social media performance tracking with data visualization and automated reporting features.",
      technologies: ["Python", "Django", "Pandas", "Chart.js"],
      github: "https://github.com/vladpocris/analytics",
      live: "https://analytics-demo.com",
      icon: "📊"
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application with workout plans, progress tracking, and social features.",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      github: "https://github.com/vladpocris/fitness",
      live: "https://fitness-demo.com",
      icon: "💪"
    },
    {
      title: "AI Chatbot",
      description: "Intelligent chatbot with natural language processing capabilities for customer support and automated responses.",
      technologies: ["Python", "TensorFlow", "Flask", "NLP"],
      github: "https://github.com/vladpocris/chatbot",
      live: "https://chatbot-demo.com",
      icon: "🤖"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 animate-slide-up ${isVisible ? "in-view" : ""}`}
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
          <Button 
            className="btn-gradient px-8 py-3 text-lg"
            onClick={() => window.open("https://github.com/vladpocris", "_blank")}
          >
            <Github className="h-5 w-5 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;