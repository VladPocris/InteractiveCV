import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ExternalLink} from "lucide-react";
import aboutImage from "@/assets/about-bg.jpg";

const AboutSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Youtube Content Creator",
      icon: "🎥",
      description: "Generated over 330,000 views in 3 months, holding over 900,000 views in total, fully Youtube monetized. Which contributed on my social media analysis & video editing skills.",
      image: "🎬",
      link: "https://www.youtube.com/@cinema_creativity"
    },
    {
      title: "Taekwondo Fighter",
      icon: "🥋",
      description: "Represented Republic of Moldova participating in 5 tournaments, holding a record of 5 first places, and best tournament technique cup throughout Bulgaria, Ukraine and Republic of Moldova.",
      image: "🏆"
    },
    {
      title: "Strategic Thinker",
      icon: "💡",
      description: "Have been a former captain of Ialoveni soccer team from Republic of Moldova achieving great results in the Moldavian league. Participated in multiple hackathons, leading teams to solve real-world problems.",
      image: "⚽"
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

    const element = document.querySelector("#about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      id="about" 
      className="parallax-section relative"
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.8), rgba(34, 34, 34, 0.6)), url(${aboutImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-secondary opacity-60" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">ABOUT</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        {/* Carousel Container */}
        <div className={`relative max-w-4xl mx-auto animate-scale-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Slide Content */}
            <div className="relative h-96 lg:h-80 flex items-center justify-center p-8">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="text-8xl mb-4">
                  {slides[activeSlide].image}
                </div>
                
                {/* Title */}
                <h3 className="gradient-text text-2xl lg:text-3xl font-bold flex items-center justify-center gap-3">
                  <span>{slides[activeSlide].icon}</span>
                  {slides[activeSlide].title}
                </h3>
                
                {/* Description */}
                <p className="text-foreground text-lg leading-relaxed max-w-2xl">
                  {slides[activeSlide].description}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-card hover:bg-white/10 text-foreground"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-card hover:bg-white/10 text-foreground"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="relative px-6 mt-6 pb-2">
                {/* Mobile layout */}
                <div className="sm:hidden flex flex-col items-center">
                  {slides[activeSlide].link && (
                    <Button
                      size="sm"
                      className="btn-gradient mb-2" // spacing below button
                      onClick={() => window.open(slides[activeSlide].link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Link
                    </Button>
                  )}

                  <div className="flex justify-center space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeSlide ? "bg-primary scale-110" : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop layout*/}
                <div className="hidden sm:block">
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeSlide ? "bg-primary scale-110" : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Desktop link button */}
                  {slides[activeSlide].link && (
                    <div className="hidden sm:flex justify-end mt-4">
                      <Button
                        size="sm"
                        className="btn-gradient"
                        onClick={() => window.open(slides[activeSlide].link, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Link
                      </Button>
                    </div>
                  )}
                </div>
              </div>

          </div>
        </div>

        {/* Auto-advance carousel */}
        <div className="text-center mt-8">
          <div className="flex justify-center space-x-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  index === activeSlide
                    ? "btn-gradient"
                    : "glass-card hover:bg-white/10 text-foreground"
                }`}
              >
                {slide.icon} {slide.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;