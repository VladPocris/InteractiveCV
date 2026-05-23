import { useEffect, useRef, useState } from "react";
import { Download, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import profileImage from "@/assets/hero_profile_picture.png";

const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1500;
          const steps = 30;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref} className="animate-count-up">{count}{suffix}</span>;
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const titles = [
    "Front-End Web Developer",
    "Back-End Web Developer",
    "Full-Stack Web Developer",
    "Problem Solver",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseTimer = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fullText = titles[titleIndex];
    const typeSpeed = 45; // faster typing
    const deleteSpeed = 25; // faster deleting
    const pauseBeforeDelete = 2500; // wait 2.5s at end before deleting
    const pauseBetween = 200;

    // (don't clear pauseTimer here — preserve scheduled pauses across renders)

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayTitle((prev) => {
          const next = fullText.slice(0, prev.length + 1);
          if (next === prev) return prev;
          // if reached full word, schedule delete
          if (next.length === fullText.length) {
            if (pauseTimer.current == null) {
              pauseTimer.current = window.setTimeout(() => {
                setIsDeleting(true);
                pauseTimer.current = null;
              }, pauseBeforeDelete);
            }
          }
          return next;
        });
      } else {
        setDisplayTitle((prev) => {
          const next = prev.slice(0, Math.max(0, prev.length - 1));
          if (next === "") {
            // small pause then move to next title
            if (pauseTimer.current == null) {
              pauseTimer.current = window.setTimeout(() => {
                setIsDeleting(false);
                setTitleIndex((i) => (i + 1) % titles.length);
                pauseTimer.current = null;
              }, pauseBetween);
            }
          }
          return next;
        });
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => {
      clearTimeout(timeout);
    };
  }, [displayTitle, isDeleting, titleIndex]);

  // clear pause timer on unmount
  useEffect(() => {
    return () => {
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
        pauseTimer.current = null;
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Main Hero Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-16 pb-16 px-6 max-w-6xl mx-auto w-full">
        {/* Profile Section */}
        <div className={`lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 animate-slide-left ${isLoaded ? "in-view" : ""}`}>
          <div className="relative inline-block mb-8 group">
            {/* Animated ring */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full p-1 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-primary animate-spin" style={{ animationDuration: "4s" }} />
              <div className="absolute inset-1 rounded-full bg-gradient-secondary" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
              <div className="absolute inset-[3px] rounded-full bg-card flex items-center justify-center overflow-hidden">
                <img
                  src={profileImage}
                  alt="Vlad Pocris - Profile Photo"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className={`lg:w-1/2 lg:pl-12 animate-slide-right ${isLoaded ? "in-view" : ""}`}>
          <div className="space-y-6">
            {/* Intro */}
            <div>
              <p className="text-lg text-primary font-semibold mb-2">Hi, I'm</p>
              <h1 className="text-5xl lg:text-6xl font-bold mb-3">
                Vlad Pocris
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground/90 mb-4 min-h-[2.5rem] sm:min-h-[3rem]">
                <span>{displayTitle}</span>
                <span className="typewriter-cursor" />
              </h2>
            </div>

            {/* Description */}
            <div className="glass-card p-6 rounded-2xl">
              <p className="text-foreground text-base leading-relaxed">
                Software Developer with 3+ years hands-on coding experience — from university projects and shipped apps to production web work. I build responsive interfaces with React, TypeScript, JavaScript, and .NET, focusing on performance, component architecture, and user-focused design. Comfortable delivering full-stack features and integrating cloud services (AWS, Azure) in Agile teams.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text"><CountUp end={3} suffix="+" /></div>
                <div className="text-xs text-muted-foreground mt-1">Years Coding</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text"><CountUp end={10} suffix="+" /></div>
                <div className="text-xs text-muted-foreground mt-1">Projects</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text"><CountUp end={8} suffix="" /></div>
                <div className="text-xs text-muted-foreground mt-1">Certifications</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                className="btn-gradient flex-1"
                onClick={() => scrollTo("#projects")}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                View My Work
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60"
                onClick={() => window.open(`${import.meta.env.BASE_URL}cv/Vlad_Pocris_CV.pdf`, "_blank")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-white/10"
                onClick={() => scrollTo("#contact")}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 text-primary animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;