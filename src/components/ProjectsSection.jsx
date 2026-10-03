import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export const ProjectsSection = () => {
  const { projects, profile, formatAssetUrl } = usePortfolio();

  return (
    <section id="projects" data-aos="fade-up" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={project.id || key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden">
                  <img
                    src={formatAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.tags)
                      ? project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))
                      : typeof project.tags === "string"
                      ? project.tags.split(",").map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tag.trim()}
                          </span>
                        ))
                      : null}
                  </div>

                  <h3 className="text-xl font-semibold mb-2"> {project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto flex justify-between items-center">
                <div className="flex space-x-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      title="GitHub Repository"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-bottom mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noreferrer"
            href={profile.githubUrl || "https://github.com/MD-Saadman-Fuad"}
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
