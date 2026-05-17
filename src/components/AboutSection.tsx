import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const AboutSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();

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

  // Auto-advance with pause on hover
  useEffect(() => {
    if (!isVisible || isHovering) return;
    autoPlayRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isVisible, isHovering, slides.length]);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Section Title */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">ABOUT</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        {/* Carousel Container */}
        <div
          className={`relative max-w-4xl mx-auto animate-scale-in ${isVisible ? "in-view" : ""}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="glass-card rounded-2xl overflow-hidden relative">
            {/* Slide Content with crossfade */}
            <div className="relative h-96 lg:h-80 flex items-center justify-center p-8">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-500 ease-in-out"
                  style={{
                    opacity: index === activeSlide ? 1 : 0,
                    transform: `translateX(${(index - activeSlide) * 30}px) scale(${index === activeSlide ? 1 : 0.95})`,
                    pointerEvents: index === activeSlide ? "auto" : "none",
                  }}
                >
                  <div className="text-center space-y-6">
                    <div className="text-8xl mb-4">{slide.image}</div>
                    <h3 className="gradient-text text-2xl lg:text-3xl font-bold flex items-center justify-center gap-3">
                      <span>{slide.icon}</span>
                      {slide.title}
                    </h3>
                    <p className="text-foreground text-lg leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass-card hover:bg-white/10 text-foreground transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass-card hover:bg-white/10 text-foreground transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Bottom controls */}
            <div className="relative px-6 pb-4">
              <div className="flex items-center justify-between">
                {/* Dots */}
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === activeSlide
                          ? "bg-primary scale-110 w-6"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Link button */}
                <div className="h-10">
                  {slides[activeSlide].link && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary hover:bg-primary/10"
                      onClick={() => window.open(slides[activeSlide].link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Channel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tab buttons */}
        <div className={`text-center mt-8 animate-fade-in ${isVisible ? "in-view" : ""}`}>
          <div className="flex justify-center space-x-3">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
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