import { useEffect, useState } from "react";

const FocusSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

  const focusAreas = [
    {
      title: "Full-Stack Development",
      icon: "🔧",
      description: "Experienced in both frontend and backend technologies, creating end-to-end solutions with modern frameworks and databases.",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
      proficiency: 90,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      description: "Skilled in cloud platforms and deployment strategies, ensuring scalable and reliable applications in production environments.",
      skills: ["AWS", "Google Cloud", "Azure", "Docker", "CI/CD"],
      proficiency: 85,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Machine Learning",
      icon: "🤖",
      description: "Applying AI and ML techniques to solve real-world problems, with experience in data analysis and predictive modeling.",
      skills: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "NLP"],
      proficiency: 75,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Mobile Development",
      icon: "📱",
      description: "Creating cross-platform mobile applications with native performance and modern user experiences.",
      skills: ["React Native", "Flutter", "iOS", "Android", "Expo"],
      proficiency: 80,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "UI/UX Design",
      icon: "🎨",
      description: "Designing intuitive and engaging user interfaces with focus on user experience and accessibility principles.",
      skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Accessibility"],
      proficiency: 70,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Project Leadership",
      icon: "👥",
      description: "Leading development teams and managing projects from conception to delivery using agile methodologies.",
      skills: ["Team Management", "Agile", "Scrum", "Communication", "Problem Solving"],
      proficiency: 88,
      color: "from-yellow-500 to-orange-500"
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

    const element = document.querySelector("#focus");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Auto-rotate focus areas
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveSkill((prev) => (prev + 1) % focusAreas.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible, focusAreas.length]);

  return (
    <section 
      id="focus" 
      className="parallax-section relative bg-gradient-to-br from-background via-secondary to-background"
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">MY FOCUS</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6" />
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            Areas where I excel and continue to grow, combining technical expertise with creative problem-solving.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {focusAreas.map((area, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-500 hover:scale-105 animate-slide-up ${
                activeSkill === index ? "ring-2 ring-primary shadow-glow" : ""
              } ${isVisible ? "in-view" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setActiveSkill(index)}
            >
              {/* Icon and Title */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{area.icon}</div>
                <h3 className="gradient-text text-xl font-bold mb-2">
                  {area.title}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Proficiency</span>
                  <span className="text-primary font-semibold">{area.proficiency}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${area.color} rounded-full h-2 transition-all duration-1000`}
                    style={{ 
                      width: isVisible ? `${area.proficiency}%` : "0%",
                      transitionDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {area.skills.slice(0, 3).map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                  >
                    {skill}
                  </span>
                ))}
                {area.skills.length > 3 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{area.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Focus Area */}
        <div className={`glass-card rounded-2xl p-8 animate-scale-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.6s" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl">{focusAreas[activeSkill].icon}</span>
                <div>
                  <h3 className="gradient-text text-3xl font-bold">
                    {focusAreas[activeSkill].title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-primary font-semibold mr-2">Proficiency:</span>
                    <div className="flex-1 bg-white/10 rounded-full h-2 max-w-32">
                      <div 
                        className={`bg-gradient-to-r ${focusAreas[activeSkill].color} rounded-full h-2 transition-all duration-1000`}
                        style={{ width: `${focusAreas[activeSkill].proficiency}%` }}
                      />
                    </div>
                    <span className="text-primary font-semibold ml-2">{focusAreas[activeSkill].proficiency}%</span>
                  </div>
                </div>
              </div>
              <p className="text-foreground text-lg leading-relaxed mb-6">
                {focusAreas[activeSkill].description}
              </p>
            </div>

            {/* Skills Display */}
            <div>
              <h4 className="text-primary font-semibold text-lg mb-4">Core Technologies & Skills</h4>
              <div className="grid grid-cols-2 gap-3">
                {focusAreas[activeSkill].skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg border border-white/10"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${focusAreas[activeSkill].color}`} />
                    <span className="text-foreground font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {focusAreas.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSkill(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSkill 
                    ? "bg-primary scale-110" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusSection;