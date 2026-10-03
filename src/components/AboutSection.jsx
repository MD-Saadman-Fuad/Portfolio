import { Briefcase, Code, User, Server, Cpu, Globe, Terminal, Zap, Database, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const iconMap = {
  code: Code,
  user: User,
  briefcase: Briefcase,
  server: Server,
  cpu: Cpu,
  globe: Globe,
  terminal: Terminal,
  zap: Zap,
  database: Database,
  sparkles: Sparkles,
};

export const AboutSection = () => {
  const { profile, aboutHighlights, API_BASE_URL } = usePortfolio();

  const getCvUrl = (url) => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/uploads/")) return `${API_BASE_URL.replace("/api", "")}${url}`;
    return url;
  };

  const cvHref = getCvUrl(profile.cvUrl);
  const sortedHighlights = [...(aboutHighlights || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="about" data-aos="fade-up" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              {profile.aboutTitle || "Passionate Software Developer & Tech Enthusiast"}
            </h3>

            <p className="text-muted-foreground">
              {profile.aboutBio1 || "I specialize in creating responsive, accessible, and performant web applications using modern technologies."}
            </p>

            <p className="text-muted-foreground">
              {profile.aboutBio2 || "I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning new technologies."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href={cvHref}
                target="_blank"
                rel="noreferrer"
                download="Saadman_Fuad_CV.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
                aria-label="Download CV"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Dynamic Highlight / Focus Cards */}
          <div className="grid grid-cols-1 gap-6">
            {sortedHighlights.map((hl, key) => {
              const IconComponent = iconMap[hl.icon?.toLowerCase()] || Code;
              return (
                <div key={hl.id || key} className="gradient-border p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg">{hl.title}</h4>
                      <p className="text-muted-foreground">{hl.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
