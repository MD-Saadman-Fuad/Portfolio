import project1 from "/projects/project1.png";
import project202 from "/projects/project202.png";
import project2 from "/projects/project2.png";
import project201 from "/projects/project201.png";
import project3 from "/projects/project3.png";
import project4 from "/projects/project4.png";
import project5 from "/projects/project5.png";
import project6 from "/projects/project6.png";
import project7 from "/projects/project7.png";
import project8 from "/projects/project8.jpg";
import project9 from "/projects/project9.png";
import project10 from "/projects/project10.png";
import project11 from "/projects/project11.png";
import project12 from "/projects/project12.png";

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

import defaultResume from "../assets/Saadman_Fuad_CV.pdf";

export const defaultProfile = {
  name: "Saadman Fuad",
  headline: "Hi, I'm Saadman Fuad",
  tagline: "I am a Final Year Computer Science Student at BRAC University with a passion for crafting elegant and efficient code. Specializing in Full-stack web development, I love turning complex problems into simple, beautiful, and intuitive designs.",
  aboutTitle: "Passionate Software Developer & Tech Enthusiast",
  aboutBio1: "I specialize in creating responsive, accessible, and performant web applications using modern technologies.",
  aboutBio2: "I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning new technologies and techniques to stay at the forefront of the ever-evolving web landscape.",
  cvUrl: defaultResume,
  email: "md.saadman.fuad@gmail.com",
  phone: "+8801914995953",
  location: "Dhaka, Bangladesh",
  facebookUrl: "https://www.facebook.com/Saadman.Fuad.1999/",
  linkedinUrl: "https://www.linkedin.com/in/saadmanfuad/",
  githubUrl: "https://github.com/MD-Saadman-Fuad",
  instagramUrl: "https://www.instagram.com/saadman_fuad/"
};

export const defaultExperiences = [
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

export const defaultEducation = [
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

export const defaultProjects = [
  {
    id: "1",
    title: "Jibonjatra",
    description: "A Community Web App for Local People's Day-to-Day Needs.",
    image: project1,
    tags: ["JavaScript", "Express.js", "React.js", "Tailwind", "Node.js", "MongoDB", "Mongoose"],
    demoUrl: "https://jibonjatra-web.vercel.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/JibonJatra",
  },
  {
    id: "202",
    title: "ZapShift",
    description: "ZapShift is a role-based courier and parcel management platform.",
    image: project202,
    tags: ["JavaScript", "Express.js", "React.js", "Tailwind", "Node.js", "MongoDB"],
    demoUrl: "https://zap-shift-web.vercel.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/ZapShift",
  },
  {
    id: "2",
    title: "Ki Khabo",
    description: "Online Food Ordering Platform",
    image: project2,
    tags: ["HTML", "CSS", "Tailwind", "PHP", "JavaScript", "MySQL"],
    demoUrl: "https://ki-khabo.hstn.me",
    githubUrl: "https://github.com/MD-Saadman-Fuad/ki-khaboV2",
  },
  {
    id: "201",
    title: "Garmentix",
    description: "Online Garments Platform",
    image: project201,
    tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind", "MongoDB", "Firebase"],
    demoUrl: "https://garmentix.netlify.app",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Garmentix-client",
  },
  {
    id: "3",
    title: "Gari Lagbe",
    description: "Vehicle Booking Platform",
    image: project3,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "MySQL"],
    demoUrl: "https://garilagbe.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/garilagbe",
  },
  {
    id: "4",
    title: "Smart Deals",
    description: "An online marketplace that connects buyers and sellers.",
    image: project4,
    tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind", "MongoDB", "Firebase"],
    demoUrl: "https://smartdeals-web.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Smart-Deals-Client",
  },
  {
    id: "5",
    title: "Civix",
    description: "Community-driven clean-up & civic reporting platform.",
    image: project5,
    tags: ["HTML", "CSS", "JavaScript", "React", "Express.js", "Node.js", "Tailwind", "MongoDB", "Firebase"],
    demoUrl: "https://civix-web.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Civix-Client",
  },
  {
    id: "6",
    title: "Warm Paws",
    description: "Pet Service And Pet Store Website",
    image: project6,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Firebase"],
    demoUrl: "https://warmpaws-store.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/WarmPaws",
  },
  {
    id: "7",
    title: "Serpent Strike",
    description: "The Reverse Snake Game",
    image: project7,
    tags: ["Python", "Pygame", "Game Development", "OpenGL"],
    demoUrl: "",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Serpent-Strike",
  },
  {
    id: "8",
    title: "Smart Security System",
    description: "A real-time security system using IOT components",
    image: project8,
    tags: ["Arduino", "C++", "Biometric", "RFID", "IOT"],
    demoUrl: "https://youtu.be/_uNRfn5VH9E?si=QgqO5gBS085Vd733",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Security-System-using-Arduinos",
  },
  {
    id: "9",
    title: "Boi Poka",
    description: "Online Bookstore for Book Lovers",
    image: project9,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    demoUrl: "https://boipoka-store.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/PH-MERN-stack/tree/main/Milestone%208/Module%2045/BoiPoka",
  },
  {
    id: "10",
    title: "Hero Playstore",
    description: "Online App Store for Mobile Applications",
    image: project10,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    demoUrl: "https://hero-playstore.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Hero-Apps",
  },
  {
    id: "11",
    title: "Dragon News Portal",
    description: "Online News Portal for Latest News Updates",
    image: project11,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Firebase"],
    demoUrl: "https://dragon-news-portal-live.web.app",
    githubUrl: "https://github.com/MD-Saadman-Fuad/Dragon-News-Portal",
  },
  {
    id: "12",
    title: "Javascript Mini Projects",
    description: "A collection of 13 interactive JavaScript projects including dice rollers, games, calculators, weather app, and utility tools showcasing modern web development techniques and API integrations.",
    image: project12,
    tags: ["HTML", "CSS", "JavaScript", "Dom Manipulation", "APIs"],
    demoUrl: "https://javascript-mini-projects-webapp.netlify.app/",
    githubUrl: "https://github.com/MD-Saadman-Fuad/JavaScript-Mini-Projects",
  },
];

export const defaultSkills = [
  // Frontend
  { id: "1", name: "HTML", image: HTML, category: "frontend" },
  { id: "2", name: "CSS", image: CSS, category: "frontend" },
  { id: "3", name: "JavaScript", image: JS, category: "frontend" },
  { id: "4", name: "React", image: ReactLogo, category: "frontend" },
  { id: "5", name: "Tailwind CSS", image: Tailwind, category: "frontend" },

  // Backend
  { id: "6", name: "Node.js", image: NodeJS, category: "backend" },
  { id: "7", name: "Express.js", image: Express, category: "backend" },
  { id: "10", name: "Python", image: Python, category: "backend" },
  { id: "11", name: "C", image: C, category: "backend" },
  { id: "12", name: "C++", image: CPP, category: "backend" },

  // Database
  { id: "8", name: "MongoDB", image: MongoDB, category: "database" },
  { id: "9", name: "MySQL", image: MySQL, category: "database" },

  // Tools
  { id: "13", name: "Git", image: Git, category: "tools" },
  { id: "14", name: "GitHub", image: GitHub, category: "tools" },
  { id: "15", name: "Figma", image: Figma, category: "tools" },
  { id: "16", name: "Firebase", image: Firebase, category: "tools" },
];
