import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-bg.jpg";
import profileImage from "@/assets/hero_profile_picture.jpg";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="parallax-section relative overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.7), rgba(34, 34, 34, 0.4)), url(${heroImage})`,
      }}
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-60 animate-glow" />
      
      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className={`animate-slide-left ${isLoaded ? "in-view" : ""}`}>
              <h1 className="gradient-text text-lg font-bold">28/10</h1>
            </div>
            <div className={`animate-slide-up ${isLoaded ? "in-view" : ""}`} style={{ animationDelay: "0.2s" }}>
              <h1 className="gradient-text text-2xl font-bold">Portfolio</h1>
            </div>
            <div className={`animate-slide-right ${isLoaded ? "in-view" : ""}`} style={{ animationDelay: "0.4s" }}>
              <h1 className="gradient-text text-lg font-bold">2025</h1>
            </div>
          </div>
          <div className={`flex justify-center mt-6 animate-fade-in ${isLoaded ? "in-view" : ""}`} style={{ animationDelay: "0.6s" }}>
            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-32 pb-16 px-6 max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className={`lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 animate-slide-left ${isLoaded ? "in-view" : ""}`} style={{ animationDelay: "0.8s" }}>
          <div className="relative inline-block mb-8">
            <div className="w-80 h-80 rounded-full bg-gradient-primary p-1 animate-glow">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="gradient-text text-xl font-semibold">Software Developer & Web Developer</h2>
            <h3 className="gradient-text text-lg">Front-end/Back-end</h3>
          </div>
        </div>

        {/* Description Section */}
        <div className={`lg:w-1/2 lg:pl-12 animate-slide-right ${isLoaded ? "in-view" : ""}`} style={{ animationDelay: "1s" }}>
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-foreground text-lg leading-relaxed">
              Computing & Software Development graduate from TU Dublin with hands-on experience in software engineering, cloud
              technologies (AWS, Google Cloud, Azure), and full-stack web development. Thrive in diverse teams, tackling complex
              challenges through internships, hackathons, and certifications. Fluent in English and Romanian, conversational in Russian;
              ready to deliver tech solutions that move businesses forward.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-fade-in ${isLoaded ? "in-view" : ""}`} style={{ animationDelay: "1.2s" }}>
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;