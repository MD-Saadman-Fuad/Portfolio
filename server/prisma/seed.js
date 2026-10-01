import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding PostgreSQL database...");

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@portfolio.com" },
    update: {},
    create: {
      email: "admin@portfolio.com",
      password: hashedPassword,
    },
  });

  // 2. Create Profile
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: "Saadman Fuad",
        tagline: "I am a Final Year Computer Science Student at BRAC University with a passion for crafting elegant and efficient code. Specializing in Full-stack web development, I love turning complex problems into simple, beautiful, and intuitive designs.",
        aboutTitle: "Passionate Software Developer & Tech Enthusiast",
        aboutBio1: "I specialize in creating responsive, accessible, and performant web applications using modern technologies.",
        aboutBio2: "I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning new technologies and techniques to stay at the forefront of the ever-evolving web landscape.",
        cvUrl: "/Saadman_Fuad_CV.pdf",
        email: "md.saadman.fuad@gmail.com",
        phone: "+8801914995953",
        location: "Dhaka, Bangladesh",
        githubUrl: "https://github.com/MD-Saadman-Fuad",
        linkedinUrl: "https://www.linkedin.com/in/saadmanfuad/",
        facebookUrl: "https://www.facebook.com/Saadman.Fuad.1999/",
        instagramUrl: "https://www.instagram.com/saadman_fuad/",
      },
    });
  }

  // 3. Seed Work Experiences
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          role: "Full-Stack Web Developer",
          company: "Freelance & Open Source Projects",
          location: "Dhaka, Bangladesh",
          period: "2023 - Present",
          description: "Architected and delivered 10+ web applications including courier management systems, community web portals, food ordering platforms, and e-commerce apps utilizing React, Node.js, Express, MongoDB, MySQL, and Tailwind CSS.",
          order: 1,
        },
        {
          role: "Computer Science Undergraduate Assistant",
          company: "BRAC University",
          location: "Dhaka, Bangladesh",
          period: "2024 - Present",
          description: "Assisted fellow students in mastering Data Structures, Algorithms, Object-Oriented Programming (C++/Python), and web development projects.",
          order: 2,
        },
      ],
    });
  }

  // 4. Seed Education
  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    await prisma.education.createMany({
      data: [
        {
          degree: "B.Sc. in Computer Science & Engineering",
          institution: "BRAC University",
          location: "Dhaka, Bangladesh",
          period: "2021 - 2025 (Final Year)",
          description: "Focusing on Software Engineering, Data Structures & Algorithms, Database Systems, Web Engineering, IoT, and Game Development.",
          order: 1,
        },
        {
          degree: "Higher Secondary Certificate (HSC)",
          institution: "Milestone College",
          location: "Dhaka, Bangladesh",
          period: "2018 - 2020",
          description: "Science Stream with distinction in Mathematics, Physics, and Information & Communication Technology.",
          order: 2,
        },
      ],
    });
  }

  // 5. Seed Projects (All 14 projects)
  const projectCount = await prisma.project.count();
  if (projectCount < 10) {
    await prisma.project.deleteMany({});
    await prisma.project.createMany({
      data: [
        {
          title: "Jibonjatra",
          description: "A Community Web App for Local People's Day-to-Day Needs.",
          image: "/projects/project1.png",
          tags: ["JavaScript", "Express.js", "React.js", "Tailwind", "Node.js", "MongoDB"],
          demoUrl: "https://jibonjatra-web.vercel.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/JibonJatra",
          order: 1,
        },
        {
          title: "ZapShift",
          description: "ZapShift is a role-based courier and parcel management platform.",
          image: "/projects/project202.png",
          tags: ["JavaScript", "Express.js", "React.js", "Tailwind", "Node.js", "MongoDB"],
          demoUrl: "https://zap-shift-web.vercel.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/ZapShift",
          order: 2,
        },
        {
          title: "Ki Khabo",
          description: "Online Food Ordering Platform",
          image: "/projects/project2.png",
          tags: ["HTML", "CSS", "Tailwind", "PHP", "JavaScript", "MySQL"],
          demoUrl: "https://ki-khabo.hstn.me",
          githubUrl: "https://github.com/MD-Saadman-Fuad/ki-khaboV2",
          order: 3,
        },
        {
          title: "Garmentix",
          description: "Online Garments Platform",
          image: "/projects/project201.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind"],
          demoUrl: "https://garmentix.netlify.app",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Garmentix-client",
          order: 4,
        },
        {
          title: "Gari Lagbe",
          description: "Vehicle Booking Platform",
          image: "/projects/project3.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "MySQL"],
          demoUrl: "https://garilagbe.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/garilagbe",
          order: 5,
        },
        {
          title: "Smart Deals",
          description: "An online marketplace that connects buyers and sellers.",
          image: "/projects/project4.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind"],
          demoUrl: "https://smartdeals-web.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Smart-Deals-Client",
          order: 6,
        },
        {
          title: "Civix",
          description: "Community-driven clean-up & civic reporting platform.",
          image: "/projects/project5.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind"],
          demoUrl: "https://civix-web.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Civix-Client",
          order: 7,
        },
        {
          title: "Warm Paws",
          description: "Pet Service And Pet Store Website",
          image: "/projects/project6.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Firebase"],
          demoUrl: "https://warmpaws-store.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/WarmPaws",
          order: 8,
        },
        {
          title: "Serpent Strike",
          description: "The Reverse Snake Game",
          image: "/projects/project7.png",
          tags: ["Python", "Pygame", "Game Development", "OpenGL"],
          demoUrl: "",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Serpent-Strike",
          order: 9,
        },
        {
          title: "Smart Security System",
          description: "A real-time security system using IOT components",
          image: "/projects/project8.jpg",
          tags: ["Arduino", "C++", "Biometric", "RFID", "IOT"],
          demoUrl: "https://youtu.be/_uNRfn5VH9E?si=QgqO5gBS085Vd733",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Security-System-using-Arduinos",
          order: 10,
        },
        {
          title: "Boi Poka",
          description: "Online Bookstore for Book Lovers",
          image: "/projects/project9.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
          demoUrl: "https://boipoka-store.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/PH-MERN-stack/tree/main/Milestone%208/Module%2045/BoiPoka",
          order: 11,
        },
        {
          title: "Hero Playstore",
          description: "Online App Store for Mobile Applications",
          image: "/projects/project10.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
          demoUrl: "https://hero-playstore.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Hero-Apps",
          order: 12,
        },
        {
          title: "Dragon News Portal",
          description: "Online News Portal for Latest News Updates",
          image: "/projects/project11.png",
          tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Firebase"],
          demoUrl: "https://dragon-news-portal-live.web.app",
          githubUrl: "https://github.com/MD-Saadman-Fuad/Dragon-News-Portal",
          order: 13,
        },
        {
          title: "Javascript Mini Projects",
          description: "A collection of 13 interactive JavaScript projects including dice rollers, games, calculators, weather app, and utility tools showcasing modern web development techniques and API integrations.",
          image: "/projects/project12.png",
          tags: ["HTML", "CSS", "JavaScript", "Dom Manipulation", "APIs"],
          demoUrl: "https://javascript-mini-projects-webapp.netlify.app/",
          githubUrl: "https://github.com/MD-Saadman-Fuad/JavaScript-Mini-Projects",
          order: 14,
        },
      ],
    });
  }

  // 6. Seed Skills
  const skillCount = await prisma.skill.count();
  if (skillCount < 10) {
    await prisma.skill.deleteMany({});
    await prisma.skill.createMany({
      data: [
        { name: "HTML", image: "/techlog/html.png", category: "frontend", order: 1 },
        { name: "CSS", image: "/techlog/css.png", category: "frontend", order: 2 },
        { name: "JavaScript", image: "/techlog/js.png", category: "frontend", order: 3 },
        { name: "React", image: "/techlog/react.png", category: "frontend", order: 4 },
        { name: "Tailwind CSS", image: "/techlog/tailwind.png", category: "frontend", order: 5 },
        { name: "Node.js", image: "/techlog/node.png", category: "backend", order: 6 },
        { name: "Express.js", image: "/techlog/express.png", category: "backend", order: 7 },
        { name: "MongoDB", image: "/techlog/mongodb.png", category: "database", order: 8 },
        { name: "MySQL", image: "/techlog/mysql.png", category: "database", order: 9 },
        { name: "Python", image: "/techlog/python.png", category: "backend", order: 10 },
        { name: "C", image: "/techlog/c.png", category: "backend", order: 11 },
        { name: "C++", image: "/techlog/cpp.png", category: "backend", order: 12 },
        { name: "Git", image: "/techlog/git.png", category: "tools", order: 13 },
        { name: "GitHub", image: "/techlog/github.png", category: "tools", order: 14 },
        { name: "Figma", image: "/techlog/figma.png", category: "tools", order: 15 },
        { name: "Firebase", image: "/techlog/firebase.png", category: "tools", order: 16 },
      ],
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
