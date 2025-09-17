import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import educationImage from "@/assets/education-bg.jpg";

const EducationSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeYear, setActiveYear] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const educationData = [
    {
      title: "BSc in Computing with Software Development (Level 8)",
      institution: "Technological University Dublin",
      years: [
        {
          year: "Y4 (2024-2025)",
          gpa: "N/A (Classification achieved to date 2:1)",
          semester: "Semester 1",
          subjects: [
            { name: "Information Management", progress: 50 },
            { name: "Applied Machine Learning", progress: 50 },
            { name: "Enterprise Performance Architecture", progress: 50 },
          ]
        },
        {
          year: "Y3 (2023-2024)",
          gpa: "68.2% (2:1)",
          semester: "Full Year",
          subjects: [
            { name: "Advanced Software Development", progress: 75 },
            { name: "Database Systems", progress: 82 },
            { name: "Web Development", progress: 88 },
            { name: "Mobile App Development", progress: 71 },
          ]
        },
        {
          year: "Y2 (2022-2023)",
          gpa: "72.1% (2:1)",
          semester: "Full Year",
          subjects: [
            { name: "Object Oriented Programming", progress: 78 },
            { name: "Data Structures & Algorithms", progress: 85 },
            { name: "Software Engineering", progress: 79 },
            { name: "Computer Networks", progress: 68 },
          ]
        },
        {
          year: "Y1 (2021-2022)",
          gpa: "76.3% (2:1)",
          semester: "Full Year",
          subjects: [
            { name: "Programming Fundamentals", progress: 82 },
            { name: "Mathematics for Computing", progress: 74 },
            { name: "Computer Systems", progress: 81 },
            { name: "Web Technologies", progress: 73 },
          ]
        }
      ]
    },
    {
      title: "Computer Networking and Cyber Security (Level 6)",
      institution: "Previous Institution",
      years: [
        {
          year: "2020-2021",
          gpa: "Distinction",
          semester: "Full Year",
          subjects: [
            { name: "Network Security", progress: 87 },
            { name: "Ethical Hacking", progress: 92 },
            { name: "Firewall Configuration", progress: 83 },
          ]
        }
      ]
    },
    {
      title: "Computer Science (Level 5)",
      institution: "Foundation College",
      years: [
        {
          year: "2019-2020",
          gpa: "Merit",
          semester: "Full Year",
          subjects: [
            { name: "Programming Basics", progress: 78 },
            { name: "Computer Hardware", progress: 85 },
            { name: "Software Applications", progress: 82 },
          ]
        }
      ]
    },
    {
      title: "Baccalaureate (Equivalent to Irish Leaving Certificate)",
      institution: "Republic of Moldova",
      years: [
        {
          year: "2018-2019",
          gpa: "Good Standing",
          semester: "Final Year",
          subjects: [
            { name: "Mathematics", progress: 85 },
            { name: "Physics", progress: 78 },
            { name: "Computer Science", progress: 92 },
          ]
        }
      ]
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

    const element = document.querySelector("#education");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="education" 
      className="parallax-section relative"
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.8), rgba(34, 34, 34, 0.6)), url(${educationImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-secondary opacity-60" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">EDUCATION</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        {/* Education Tabs Container */}
        <div className={`glass-card rounded-2xl overflow-hidden animate-scale-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.3s" }}>
          {/* Main Education Tabs */}
          <div className="border-b border-white/10">
            <div className="flex flex-col space-y-2 lg:flex-row lg:flex-wrap lg:justify-between p-4 lg:space-y-0">
              {educationData.map((education, index) => (
                <Button
                  key={index}
                  variant={activeTab === index ? "default" : "ghost"}
                  onClick={() => {
                    setActiveTab(index);
                    setActiveYear(0);
                  }}
                  className={`text-xs sm:text-sm px-2 sm:px-3 py-2 w-full lg:w-auto lg:flex-1 lg:mx-1 mb-2 lg:mb-0 text-center break-words ${
                    activeTab === index 
                      ? "btn-gradient" 
                      : "text-foreground hover:bg-white/10"
                  }`}
                >
                  <span className="break-words hyphens-auto" style={{ wordBreak: "break-word" }}>
                    {education.title}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Year Tabs (if multiple years available) */}
          {educationData[activeTab].years.length > 1 && (
            <div className="border-b border-white/10 bg-black/20">
              <div className="flex flex-wrap justify-center p-4 gap-2">
                {educationData[activeTab].years.map((yearData, index) => (
                  <Button
                    key={index}
                    variant={activeYear === index ? "secondary" : "ghost"}
                    onClick={() => setActiveYear(index)}
                    className={`text-sm flex-shrink-0 ${
                      activeYear === index 
                        ? "bg-primary/20 text-primary border-primary" 
                        : "text-foreground hover:bg-white/10"
                    }`}
                  >
                    {yearData.year}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Content Display */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8">
              <h3 className="gradient-text text-xl sm:text-2xl font-bold mb-2 break-words">
                {educationData[activeTab].years[activeYear].year}
              </h3>
              <h4 className="text-primary text-lg sm:text-xl font-semibold mb-1 break-words">
                {educationData[activeTab].institution}
              </h4>
              <p className="text-foreground text-sm sm:text-base">
                GPA: {educationData[activeTab].years[activeYear].gpa}
              </p>
            </div>

            {/* Subjects and Progress */}
            <div className="space-y-6">
              <h5 className="text-base sm:text-lg font-semibold text-foreground text-center mb-6">
                {educationData[activeTab].years[activeYear].semester}
              </h5>
              
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {educationData[activeTab].years[activeYear].subjects.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-foreground font-medium text-sm sm:text-base break-words flex-1 mr-2">{subject.name}</span>
                      <span className="text-primary text-sm flex-shrink-0">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary rounded-full h-2 transition-all duration-1000"
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;