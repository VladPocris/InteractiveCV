import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import educationImage from "@/assets/education-bg.jpg";

const EducationSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeYear, setActiveYear] = useState(0);
  const [activeSemester, setActiveSemester] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const educationData = [
    {
      title: "BSc in Computing with Software Development (Level 8)",
      institution: "Technological University Dublin",
      years: [
        {
          year: "Y4 (2024-2025)",
          gpa: "3.73 (1st Class Honours - 1:1)",
          semesters: [
            {
              name: "Semester 1",
              subjects: [
                { name: "Final Year Project", progress: 100 },
                { name: "Interactive Media Design", progress: 83 },
                { name: "Algorithms & Computation", progress: 82 },
                { name: "Applied Machine Learning", progress: 78.4 },
                { name: "Enterprise App Development 1", progress: 77 },
                { name: "Information Management", progress: 57.2 },
              ],
            },
            {
              name: "Semester 2",
              subjects: [
                { name: "Final Year Project", progress: 100 },
                { name: "Enterprise App Development 2", progress: 89 },
                { name: "Computational Theory", progress: 80.1 },
                { name: "Applied Artificial Intelligence and Deep Learning", progress: 80.1 },
                { name: "Enterprise Performance Architecture", progress: 67.4 },
              ],
            },
          ],
        },
        {
          year: "Y3 (2023-2024)",
          gpa: "2.88",
          semesters: [
            {
              name: "Semester 1",
              subjects: [
                { name: "Data Analysis", progress: 72 },
                { name: "Data Structures & Algorithms", progress: 64 },
                { name: "Server-side Web Development", progress: 62 },
                { name: "Operating Systems", progress: 60 },
                { name: "Cloud Services & Distributed Computing", progress: 55.11 },
                { name: "Big Data Technologies", progress: 48.4 },
              ],
            },
            {
              name: "Semester 2",
              subjects: [
                { name: "Experiential Learning", progress: 75 },
              ],
            },
          ],
        },
        {
          year: "Y2 (2022-2023)",
          gpa: "3.15",
          semesters: [
            {
              name: "Semester 1",
              subjects: [
                { name: "Discrete Mathematics 1", progress: 90 },
                { name: "Software Quality Assessment & Testing", progress: 87 },
                { name: "Client-side Web Development", progress: 73 },
                { name: "Advanced Database Technologies", progress: 70.99 },
                { name: "Information Security", progress: 70 },
                { name: "Software Development 3", progress: 56 },
                { name: "Network Fundamentals", progress: 54 },
              ],
            },
            {
              name: "Semester 2",
              subjects: [
                { name: "Discrete Maths 2", progress: 84 },
                { name: "Management Science", progress: 76 },
                { name: "Routing & Switching Essentials", progress: 72.9 },
                { name: "Information Security", progress: 68 },
                { name: "Database Admin & Analysis", progress: 60.97 },
                { name: "Networking Fundamentals", progress: 49.835 },
                { name: "Software Development 4", progress: 42 },
                { name: "Project", progress: 40 },
              ],
            },
          ],
        },
        {
          year: "Y1 (2021-2022)",
          gpa: "Advanced Entry to Year 2",
        }
      ]
    },
    {
      title: "Computer Networking and Cyber Security (Level 6)",
      institution: "Bray Institute Of Further Education",
      years: [
        {
          year: "2021-2022",
          gpa: "Distinction (1:1)",
          semesters: [
            {
              name: "Semester 1",
              subjects: [
                { name: "Network Infrastructure", progress: 100 },
                { name: "Mobile Technologies", progress: 100 },
                { name: "Information Technology Administration", progress: 100 },
                { name: "Systems Software", progress: 100 },
                { name: "Work Experience", progress: 100 },
              ],
            },
            {
              name: "Semester 2",
              subjects: [
                { name: "Communications", progress: 100 },
                { name: "Physical and Logical Networking", progress: 100 },
                { name: "Object Oriented Programming", progress: 100 },
                { name: "Mathematics", progress: 100 },
              ],
            },
          ],
        }
      ]
    },
    {
      title: "Computer Science (Level 5)",
      institution: "Bray Institute Of Further Education",
      years: [
        {
          year: "2020-2021",
          gpa: "Distinction (1:1)",
          semesters: [
            {
              name: "Semester 1",
              subjects: [
                { name: "Computer Systems Hardware", progress: 100 },
                { name: "Mobile Technologies", progress: 100 },
                { name: "Maths for Information Technology", progress: 100 },
                { name: "Programming and Design Principles", progress: 100 },
              ],
            },
            {
              name: "Semester 2",
              subjects: [
                { name: "Operating Systems", progress: 100 },
                { name: "Networking Essentials", progress: 100 },
                { name: "Personal and Professional Development", progress: 100 },
                { name: "Communications", progress: 79 },
              ],
            },
          ],
        }
      ]
    },
    {
      title: "Baccalaureate (Equivalent to Irish Leaving Certificate)",
      institution: "Republic of Moldova",
      years: [
        {
          year: "2017-2020",
          gpa: "87.3 (Eminent)",
          semesters: [
            {
              name: "General Grades for Years X-XII",
              subjects: [
                { name: "Personal Development", progress: 100 },
                { name: "Physical Education", progress: 100 },
                { name: "Computer Science", progress: 98.9 },
                { name: "Mathematics", progress: 91.7 },
                { name: "Geography", progress: 90.1 },
                { name: "Biology", progress: 87.9 },
                { name: "Physics and Astronomy", progress: 87.4 },
                { name: "Civic Education", progress: 87 },
                { name: "English Language", progress: 82.2 },
                { name: "History of the Romanians and World History", progress: 81.2 },
                { name: "Romanian Language and Literature", progress: 79.2 },
                { name: "Chemistry", progress: 75.7 },
              ],
            },
            {
              name: "Exam Subjects",
              subjects: [
                { name: "Mathematics", progress: 90 },
                { name: "Geography", progress: 90 },
                { name: "Romanian Language and Literature", progress: 80 },
                { name: "English Language", progress: 80 },
              ],
            },
          ],
        }
      ]
    },
    {
      title: "Gymnasium (Lower Secondary Education, equivalent to Junior Cycle)",
      institution: "Republic of Moldova",
      years: [
        {
          year: "2008-2017",
          gpa: "84.2 (Eminent)",
          semesters: [
            {
              name: "General Grades for Years I-IX",
              subjects: [
                { name: "Visual Arts", progress: 100 },
                { name: "Physical Education", progress: 94.5 },
                { name: "Technology Education", progress: 91.2 },
                { name: "Biology", progress: 91 },
                { name: "Music Education", progress: 90 },
                { name: "Geography", progress: 90 },
                { name: "Science", progress: 90 },
                { name: "Mathematics", progress: 82 },
                { name: "Russian Language", progress: 81.2 },
                { name: "Physics", progress: 80.7 },
                { name: "Civic Education", progress: 80 },
                { name: "Chemistry", progress: 77.5 },
                { name: "Romanian Language and Literature", progress: 77 },
                { name: "Computer Science", progress: 76.2 },
                { name: "English Language", progress: 73.7 },
                { name: "History of the Romanians and World History", progress: 72.8 },
              ],
            },
            {
              name: "Exam Subjects",
              subjects: [
                { name: "Geography", progress: 80 },
                { name: "Romanian Language and Literature", progress: 70 },
                { name: "Romanian Language and Literature", progress: 60 },
              ],
            },
          ],
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
                    setActiveSemester(0);
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

          {/* Semester Tabs (when a year has multiple semesters) */}
          {educationData[activeTab].years[activeYear].semesters && educationData[activeTab].years[activeYear].semesters.length > 1 && (
            <div className="border-b border-white/10 bg-black/10">
              <div className="flex flex-wrap justify-center p-4 gap-2">
                {educationData[activeTab].years[activeYear].semesters.map((sem, index) => (
                  <Button
                    key={index}
                    variant={activeSemester === index ? "secondary" : "ghost"}
                    onClick={() => setActiveSemester(index)}
                    className={`text-sm flex-shrink-0 ${
                      activeSemester === index 
                        ? "bg-primary/20 text-primary border-primary" 
                        : "text-foreground hover:bg-white/10"
                    }`}
                  >
                    {sem.name}
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
                {educationData[activeTab].years[activeYear].semesters
                  ? educationData[activeTab].years[activeYear].semesters[activeSemester]?.name
                  : ""}
              </h5>
              
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {(educationData[activeTab].years[activeYear].semesters?.[activeSemester]?.subjects || []).map((subject, index) => (
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