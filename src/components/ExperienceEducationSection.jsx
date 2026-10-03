import { useState } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultExperiences = [
  {
    id: "exp-1",
    role: "Full-Stack Web Developer",
    company: "Freelance & Open Source Projects",
    location: "Dhaka, Bangladesh",
    period: "2023 - Present",
    description: "Architected and delivered 10+ web applications including courier management systems, community web portals, food ordering platforms, and e-commerce apps utilizing React, Node.js, Express, MongoDB, MySQL, and Tailwind CSS.",
  },
  {
    id: "exp-2",
    role: "Computer Science Undergraduate Assistant",
    company: "BRAC University",
    location: "Dhaka, Bangladesh",
    period: "2024 - Present",
    description: "Assisted fellow students in mastering Data Structures, Algorithms, Object-Oriented Programming (C++/Python), and web development projects.",
  },
];

const defaultEducation = [
  {
    id: "edu-1",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "BRAC University",
    location: "Dhaka, Bangladesh",
    period: "2021 - 2025 (Final Year)",
    description: "Focusing on Software Engineering, Data Structures & Algorithms, Database Systems, Web Engineering, IoT, and Game Development.",
  },
  {
    id: "edu-2",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Milestone College",
    location: "Dhaka, Bangladesh",
    period: "2018 - 2020",
    description: "Science Stream with distinction in Mathematics, Physics, and Information & Communication Technology.",
  },
];

export const ExperienceEducationSection = () => {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <section id="experience" data-aos="fade-up" className="py-24 px-4 relative bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary"> Journey</span>
        </h2>

        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm md:text-base">
          An overview of my professional work experience and academic background in computer science.
        </p>

        {/* Tab Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-secondary/60 border border-border">
            <button
              onClick={() => setActiveTab("experience")}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                activeTab === "experience"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Briefcase size={18} />
              Work Experience
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                activeTab === "education"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <GraduationCap size={18} />
              Education
            </button>
          </div>
        </div>

        {/* Content Tab 1: Work Experience */}
        {activeTab === "experience" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {defaultExperiences.map((exp, key) => (
              <div
                key={exp.id || key}
                className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-xs card-hover flex flex-col md:flex-row md:items-start gap-6 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-primary/10 text-primary shrink-0 w-fit">
                  <Briefcase className="h-6 w-6" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
                      <Calendar size={13} /> {exp.period}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground/90">{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin size={13} /> {exp.location}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Tab 2: Education */}
        {activeTab === "education" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {defaultEducation.map((edu, key) => (
              <div
                key={edu.id || key}
                className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-xs card-hover flex flex-col md:flex-row md:items-start gap-6 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-primary/10 text-primary shrink-0 w-fit">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
                      <Calendar size={13} /> {edu.period}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground/90">{edu.institution}</span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin size={13} /> {edu.location}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
