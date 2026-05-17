import { useEffect, useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import FocusSection from "@/components/FocusSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";
import SectionDivider from "@/components/SectionDivider";
import ScrollProgress from "@/components/ScrollProgress";
import { useScrollEffect } from "@/hooks/useScrollEffect";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isScrolled = useScrollEffect();

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty("--mouse-x", String(x));
      document.documentElement.style.setProperty("--mouse-y", String(y));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadComplete} />;
  }

  return (
    <div className="relative">
      <ScrollProgress />
      <Navigation isScrolled={isScrolled} />

      <main role="main">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <FocusSection />
        <SectionDivider />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;