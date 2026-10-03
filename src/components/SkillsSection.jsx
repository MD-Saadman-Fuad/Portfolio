import { useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { usePortfolio } from "../context/PortfolioContext";

const categories = ["all", "frontend", "backend", "database", "tools"];

export const SkillsSection = () => {
  const { skills, formatAssetUrl } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("all");

  const getSkillImage = (image) => {
    if (!image) return "";
    if (typeof image === "object" && image.default) return image.default;
    return formatAssetUrl(image);
  };

  const sortedSkills = [...skills].sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredSkills = sortedSkills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" data-aos="fade-up" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        {sortedSkills && sortedSkills.length > 0 && (
          <Marquee className="mb-10" gradient={false} speed={80}>
            {sortedSkills.map((skill, key) => (
              <div key={skill.id || key} className="flex items-center space-x-2 mr-12">
                <img
                  src={getSkillImage(skill.image)}
                  alt={skill.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="font-semibold text-sm text-foreground/80">{skill.name}</span>
              </div>
            ))}
          </Marquee>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize text-sm font-medium cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={skill.id || key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover text-center flex flex-col items-center justify-center space-y-3 relative"
            >
              <img
                src={getSkillImage(skill.image)}
                alt={skill.name}
                className="w-14 h-14 object-contain mx-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h3 className="font-semibold text-base">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
