import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Jibonjatra",
    description: "A Community Web App for Local People’s Day-to-Day Needs.",
    image: "/projects/project1.png",
    tags: ["JavaScript", "Express.js", "React.js", "Tailwind", "Node.js", "MongoDB", "Mongoose"],
    demoUrl: "https://jibonjatra-web.onrender.com/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/JibonJatra",
  },
  {
    id: 2,
    title: "Ki Khabo",
    description:
      "Online Food Ordering Platform",
    image: "/projects/project2.png",
    tags: ["HTML", "CSS", "Tailwind", "PHP", "JavaScript", "MySQL"],
    demoUrl: "https://ki-khabo.hstn.me",
    githubUrl: "https://github.com/MD-Saadman-Fuad/ki-khaboV2",
  },
  {
    id: 3,
    title: "Gari Lagbe",
    description:
      "Vehicle Booking Platform",
    image: "/projects/project3.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "MySQL"],
    demoUrl: "https://garilagbe.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/garilagbe",
  },

  {
    id: 4,
    title: "Smart Deals",
    description:
      "An oinline marketplace that connects buyers and sellers.",
    image: "/projects/project4.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind", "MongoDB", "Firebase"],
    demoUrl: "https://smartdeals-web.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Smart-Deals-Client",
  },
  {
    id: 5,
    title: "Civix",
    description:
      "Community-driven clean-up & civic reporting platform.",
    image: "/projects/project5.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind", "MongoDB", "Firebase"],
    demoUrl: "https://civix-web.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Smart-Deals-Client",
  },
  {
    id: 6,
    title: "Warm Paws",
    description:
      "Vehicle Booking Platform",
    image: "/projects/project6.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Firebase"],
    demoUrl: "https://warmpaws-store.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/WarmPaws",
  },
  
  {
    id: 7,
    title: "Serpent Strike",
    description:
      "The Reverse Snake Game",
    image: "/projects/project7.png",
    tags: ["Python", "Pygame", "Game Development", "OpenGL"],
    demoUrl: "",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Serpent-Strike",
  },
  {
    id: 8,
    title: "Smart Security System",
    description:
      "A real-time security system using IOT components",
    image: "/projects/project8.jpg",
    tags: ["Arduino", "C++", "Biometric", "RFID", "IOT"],
    demoUrl: "https://youtu.be/_uNRfn5VH9E?si=QgqO5gBS085Vd733",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Security-System-using-Arduinos",
  },
  {
    id: 9,
    title: "Boi Poka",
    description:
      "Online Bookstore for Book Lovers",
    image: "/projects/project9.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    demoUrl: "https://boipoka-store.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/PH-MERN-stack/tree/main/Milestone%208/Module%2045/BoiPoka",
  },
  {
    id: 10,
    title: "Hero Playstore",
    description:
      "Online App Store for Mobile Applications",
    image: "/projects/project10.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    demoUrl: "https://hero-playstore.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Hero-Apps",
  },
  {
    id: 11,
    title: "Dragon News Portal",
    description:
      "Online App Store for Mobile Applications",
    image: "/projects/project11.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Firebase"],
    demoUrl: "https://dragon-news-portal-live.web.app",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Dragon-News-Portal",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" data-aos="fade-up" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4 ">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1 h-full mt-auto"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-bottom mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/MD-Saadman-Fuad"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
