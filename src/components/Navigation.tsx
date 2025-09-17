import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation = ({ isScrolled }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigationItems = [
    { name: "Vlad Pocris", href: "#home", icon: "👨‍💻" },
    { name: "Contact", href: "#contact", icon: "✉️" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Education", href: "#education", icon: "🎓" },
    { name: "Projects", href: "#projects", icon: "🚀" },
    { name: "Experience", href: "#experience", icon: "💼" },
    { name: "My Focus", href: "#focus", icon: "🎯" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "projects", "experience", "focus", "contact"];
      const current = sections.find(section => {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card text-foreground hover:bg-white/10"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? "glass-card py-2" : "bg-transparent py-4"
      } hidden lg:block`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`nav-link-effect gradient-text hover:text-primary transition-all duration-300 text-sm font-medium animate-slide-down ${
                  activeSection === item.href.slice(1) ? "text-primary" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 left-0 w-72 sm:w-80 h-full bg-card/95 backdrop-blur-md border-r border-white/10 p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="mt-16 space-y-6">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-lg font-medium bg-secondary/30 hover:bg-primary/20 border border-white/10 ${
                  activeSection === item.href.slice(1) ? "bg-primary/20 text-primary border-primary/30" : "text-foreground hover:text-primary"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;