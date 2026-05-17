import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation = ({ isScrolled }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);

  const navigationItems = [
    { name: "Vlad Pocris", href: "#home", icon: "👨‍💻" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Education", href: "#education", icon: "🎓" },
    { name: "Projects", href: "#projects", icon: "🚀" },
    { name: "Experience", href: "#experience", icon: "💼" },
    { name: "Focus", href: "#focus", icon: "🎯" },
    { name: "Contact", href: "#contact", icon: "✉️" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Track active section + hide/show nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "projects", "experience", "focus", "contact"];
      const scrollY = window.scrollY;

      // Active section
      const current = sections.find((section) => {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom > 150;
        }
        return false;
      });
      if (current) setActiveSection(current);

      // Hide on scroll down, show on scroll up
      if (scrollY > 100) {
        if (scrollY > lastScrollY.current && isVisible) {
          setIsVisible(false);
        } else if (scrollY < lastScrollY.current && !isVisible) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = scrollY;

      // Scroll to top button
      setShowScrollTop(scrollY > 600);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, isOpen]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card text-foreground hover:bg-white/10"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Desktop Navigation */}
      <nav aria-label="Main navigation"
        className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "glass-card py-2 mt-0 rounded-none border-x-0 border-t-0" : "bg-transparent py-4"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-1">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 animate-slide-down flex items-center gap-1.5 ${
                  activeSection === item.href.slice(1)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                aria-current={activeSection === item.href.slice(1) ? "true" : undefined}
              >
                <span>{item.icon}</span>
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div
          className={`absolute top-0 left-0 w-72 sm:w-80 h-full bg-card/95 backdrop-blur-md border-r border-white/10 p-6 transition-all duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo in drawer */}
          <div className="mb-8 mt-4">
            <span className="gradient-text text-xl font-bold">VP</span>
          </div>

          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-base font-medium border flex items-center gap-3 ${
                  activeSection === item.href.slice(1)
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "text-foreground/80 hover:bg-white/5 border-transparent hover:text-foreground"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-muted-foreground">Vlad Pocris</p>
              <p className="text-xs text-muted-foreground">Software Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-40 p-3 rounded-full glass-card text-primary hover:bg-primary/20 transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-4"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
};

export default Navigation;