import { useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import Python from "../assets/techlog/python.png";
import CSS from "../assets/techlog/css.png";
import C from "../assets/techlog/c.png";
import CPP from "../assets/techlog/cpp.png";
import Figma from "../assets/techlog/figma.png";
import Git from "../assets/techlog/git.png";
import HTML from "../assets/techlog/html.png";
import JS from "../assets/techlog/js.png";
import MySQL from "../assets/techlog/mysql.png";
import NodeJS from "../assets/techlog/node.png";
import ReactLogo from "../assets/techlog/react.png";
import Tailwind from "../assets/techlog/tailwind.png";
import Firebase from "../assets/techlog/firebase.png";
import GitHub from "../assets/techlog/github.png";
import Express from "../assets/techlog/express.png";
import MongoDB from "../assets/techlog/mongodb.png";

const skills = [
  // Frontend
  { name: "HTML", image: HTML, level: 95, category: "frontend" },
  { name: "CSS", image: CSS, level: 95, category: "frontend" },
  { name: "JavaScript", image: JS, level: 90, category: "frontend" },
  { name: "React", image: ReactLogo, level: 90, category: "frontend" },
  { name: "Tailwind CSS", image: Tailwind, level: 90, category: "frontend" },


  // Backend
  { name: "Node.js", image: NodeJS, level: 80, category: "backend" },
  { name: "Express.js", image: Express, level: 75, category: "backend" },
  { name: "MongoDB", image: MongoDB, level: 70, category: "backend" },
  { name: "MySQL", image: MySQL, level: 90, category: "backend" },
  { name: "Python", image: Python, level: 85, category: "backend" },
  { name: "C", image: C, level: 85, category: "backend" },
  { name: "C++", image: CPP, level: 85, category: "backend" },


  // Tools
  { name: "Git", image: Git, level: 90, category: "tools" },
  { name: "GitHub", image: GitHub, level: 90, category: "tools" },
  { name: "Figma", image: Figma, level: 85, category: "tools" },
  // { name: "VS Code", image: VSCode, level: 95, category: "tools" },
  { name: "Firebase", image: Firebase, level: 80, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const imagesMap = [Python, Figma, Git, GitHub, HTML, CSS, JS, MySQL, NodeJS, ReactLogo, Tailwind, Express, MongoDB, Firebase];

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" data-aos="fade-up" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <Marquee className="mb-10" gradient={false} speed={80}>
          {imagesMap.map((image, key) => (
            <div key={key} className="flex items-center space-x-2 mr-15">
              {/* <span className="font-semibold">{skills[key].name}</span> */}
              <img src={image} alt={skills[key].name} className="w-15 h-15" />
            </div>
          ))}
        </Marquee>

        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div> */}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover text-center"
            >
              <img src={skill.image} alt={skill.name} className="w-15 h-15 mx-auto flex items-center justify-center mb-5" />
              <div className="text-center ">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
