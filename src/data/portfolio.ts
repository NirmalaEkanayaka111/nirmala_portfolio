// Central editable content. Replace every [PLACEHOLDER] with your real details.
import portrait from "@/assets/hero.png";
import transitionPortrait from "@/assets/hero 2.jpg";
import p1 from "@/assets/project 1.jpg";
import p2 from "@/assets/project 2.jpg";
import p3 from "@/assets/project 3.jpg";

export const profile = {
  name: "Nirmala",
  shortName: "Nirmala",
  email: "nirmalaekanayaka111@gmail.com",
  github: "https://github.com/NirmalaEkanayaka111",
  linkedin: "https://www.linkedin.com/in/nirmala-ekanayaka-b05258393",
  portrait,
  transitionPortrait,
  heroBio:
    "I'm Nirmala, an ICT undergraduate at the Faculty of Computing and Technology, University of Kelaniya, Sri Lanka.",
  heroActions: { work: "Explore My Work", contact: "Let's Connect" },
  intro:
    "I'm Nirmala, an ICT undergraduate at the Faculty of Computing and Technology, University of Kelaniya, Sri Lanka. I'm passionate about technology, software development, computer networking and exploring how innovative technologies shape the future.",
  headline: ["Technology enthusiast.", "Future software developer."],
  tagline: "Learning how technology works — underneath the interface.",
  degree: "Bachelor of Information and Communication Technology (BICT)",
  faculty: "Faculty of Computing and Technology (FCT)",
  university: "University of Kelaniya, Sri Lanka",
  roles: ["ICT Undergraduate", "Aspiring Software Developer"],
  interests: [
    "Software Development",
    "Computer Networking",
    "Cybersecurity",
    "Artificial Intelligence",
    "Web Development",
    "Programming",
    "System Architecture",
    "Cloud Technologies",
  ],
};

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  accent: string;
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    name: "Network Monitoring Dashboard",
    category: "Networking",
    description:
      "A network monitoring dashboard concept designed to visualize network traffic, connected devices, IP addresses, and system performance in one interface.",
    tech: ["Python", "Flask", "HTML", "CSS"],
    image: p1,
    accent: "var(--primary-glow)",
    github: "#",
    live: "#",
  },
  {
    id: "p2",
    name: "Secure File Transfer System",
    category: "Cybersecurity",
    description:
      "A secure file transfer system concept focused on user authentication and protecting files during transfer through encryption.",
    tech: ["Python", "Flask", "JavaScript", "Cryptography"],
    image: p2,
    accent: "var(--ice)",
    github: "#",
    live: "#",
  },
  {
    id: "p3",
    name: "Smart Home Automation System",
    category: "IoT & Networking",
    description:
      "A smart home automation concept that connects household devices and allows users to monitor and control them through a centralized interface.",
    tech: ["Python", "ESP32", "MQTT", "IoT", "HTML", "CSS"],
    image: p3,
    accent: "var(--ice)",
    github: "#",
    live: "#",
  },
];

export const skills = [
  { title: "Languages", items: ["JavaScript", "Python", "Java", "C", "C++"] },
  { title: "Web Development", items: ["HTML", "CSS", "React", "Next.js"] },
  {
    title: "Networking & Tools",
    items: ["Computer Networking", "Linux", "Git", "GitHub", "VS Code"],
  },
];

export const exploring = [
  "Networking Technologies",
  "Cybersecurity",
  "Artificial Intelligence",
  "Software Engineering",
  "Cloud Computing",
  "System Architecture",
];

export const mindPanels = [
  {
    title: "Networking & Security",
    items: [
      "Computer Networking",
      "Network Infrastructure",
      "Cybersecurity",
      "Linux",
      "Cloud Computing",
    ],
  },
  {
    title: "Software & Technology",
    items: [
      "Programming",
      "Web Development",
      "Artificial Intelligence",
      "APIs",
      "Databases",
      "System Design",
    ],
  },
];

export const about = {
  who: "I'm Nirmala, an ICT undergraduate who enjoys exploring technology, learning new skills and developing creative solutions.",
  what: ["Software Development", "Web Technologies", "Computer Networking", "Cybersecurity"],
  philosophy: ["Learn", "Explore", "Build", "Experiment", "Improve"],
  philosophyText:
    "I believe technology is constantly evolving, and learning through practical experience is one of the best ways to grow.",
};

export const mind = {
  heading: ["I'm curious about", "how technology", "works."],
  text: "From software applications to computer networks, I enjoy exploring the systems and ideas that power the digital world.",
};

export const contact = {
  text: "I'm always excited to learn, explore new technologies, connect with creative people and work on interesting projects.",
};
