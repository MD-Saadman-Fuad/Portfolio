import { useState } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink, CheckCircle2, Layers, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultExperiences = [
  {
    id: "exp-1",
    role: "Full-Stack Web Developer",
    company: "SA Khan TradeX",
    location: "Dhaka, Bangladesh",
    period: "Jan, 2026 - Present",
    responsibilities: [
      "Leading full-stack development of an enterprise export-import trading ERP platform from the ground up.",
      "Architected real-time POS, inventory, finance, and CRM modules to streamline cross-border trade workflows.",
      "Built scalable REST backend services with NestJS, PostgreSQL, and Prisma ORM.",
      "Designed responsive, accessible, and high-performance UI components using Next.js, TypeScript, and Tailwind CSS.",
    ],
    projects: [
      {
        name: "Enterprise ERP & Multi-Branch POS System",
        description: "Centralized ERP platform managing real-time inventory across multiple branch locations, automated barcode POS invoicing, financial ledger tracking, and stock auditing.",
        link: null, // Set to live website URL if available (e.g., "https://sakpantradex.com")
        isPrivate: true,
        technologies: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Tailwind CSS"],
      },
      {
        name: "Export-Import Trade & CRM Engine",
        description: "Supply chain tracking engine managing international shipment documentation, Letter of Credit (LC) status, customs clearance, and automated client notifications.",
        link: null,
        isPrivate: true,
        technologies: ["TypeScript", "NestJS", "PostgreSQL", "Prisma"],
      },
    ],
  },
  {
    id: "exp-2",
    role: "Computer Science Undergraduate Assistant",
    company: "BRAC University",
    location: "Dhaka, Bangladesh",
    period: "2024 - 2025",
    responsibilities: [
      "Assisted fellow students in mastering Data Structures, Algorithms, Object-Oriented Programming (C++/Python), and web development projects.",
      "Conducted weekly problem-solving lab sessions and code reviews for 100+ undergraduate computer science students.",
    ],
    projects: [
      {
        name: "Student Lab Feedback & Grading Helper Tool",
        description: "Developed helper automation scripts and grading evaluation tools to provide instant feedback on student coding assignments.",
        link: "https://github.com/MD-Saadman-Fuad",
        isPrivate: false,
        technologies: ["Python", "C++", "Git", "GitHub"],
      },
    ],
  },
];

const defaultEducation = [
  {
    id: "edu-1",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "BRAC University",
    location: "Dhaka, Bangladesh",
    period: "2021 - 2025",
    highlights: [
      "Specialization in Software Engineering, Data Structures & Algorithms, and Web Development.",
      "Focused coursework in Database Systems, Web Engineering, IoT, and Game Development.",
      "Completed advanced software engineering projects and collaborative web application developments.",
    ],
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
          <div className="space-y-8 max-w-4xl mx-auto text-left">
            {defaultExperiences.map((exp, key) => (
              <div
                key={exp.id || key}
                className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-xs card-hover space-y-6 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/50 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Briefcase className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="font-semibold text-primary">{exp.company}</span>
                        {exp.location && (
                          <span className="flex items-center gap-1 text-xs">
                            <MapPin size={13} /> {exp.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit shrink-0">
                    <Calendar size={13} /> {exp.period}
                  </div>
                </div>

                {/* Structured Responsibilities List */}
                <div className="space-y-2.5">
                  {exp.responsibilities && exp.responsibilities.length > 0 ? (
                    exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground/90 leading-relaxed">
                          {resp}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>

                {/* Company Delivered Projects & Systems */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="pt-5 border-t border-border/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                        <Layers size={15} /> Key Systems & Delivered Projects
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exp.projects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl bg-secondary/30 border border-border/60 hover:border-primary/40 transition-colors flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="font-bold text-sm text-foreground">
                                {proj.name}
                              </h5>
                              {proj.link ? (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-primary hover:underline text-xs flex items-center gap-1 font-medium shrink-0"
                                >
                                  View <ExternalLink size={12} />
                                </a>
                              ) : proj.isPrivate ? (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground flex items-center gap-1 shrink-0" title="Internal Enterprise System">
                                  <Lock size={10} /> Enterprise
                                </span>
                              ) : null}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {proj.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {proj.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content Tab 2: Education */}
        {activeTab === "education" && (
          <div className="space-y-8 max-w-4xl mx-auto text-left">
            {defaultEducation.map((edu, key) => (
              <div
                key={edu.id || key}
                className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-xs card-hover space-y-5 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/50 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="font-semibold text-primary">{edu.institution}</span>
                        {edu.location && (
                          <span className="flex items-center gap-1 text-xs">
                            <MapPin size={13} /> {edu.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit shrink-0">
                    <Calendar size={13} /> {edu.period}
                  </div>
                </div>

                {/* Structured Academic Highlights */}
                <div className="space-y-2.5">
                  {edu.highlights && edu.highlights.length > 0 ? (
                    edu.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground/90 leading-relaxed">
                          {hl}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
