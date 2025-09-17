import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import FocusSection from "@/components/FocusSection";
import ContactSection from "@/components/ContactSection";
import { useScrollEffect } from "@/hooks/useScrollEffect";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isScrolled = useScrollEffect();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="text-6xl mb-6">👨‍💻</div>
            <div className="gradient-text text-2xl font-bold mb-4">Loading Portfolio</div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navigation isScrolled={isScrolled} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <ExperienceSection />
        <FocusSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
