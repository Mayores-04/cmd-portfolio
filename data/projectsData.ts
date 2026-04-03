export type Project = {
  permissions: string;
  size: string;
  date: string;
  name: string;
  url: string;
  image: string;
  tech: string;
  description: string;
};

export const projectsData: Project[] = [
  {
    permissions: "-rw-r--r--",
    size: "2.0M",
    date: "Apr 01",
    name: "Portfolio",
    url: "https://jake-mayores-portfolio.vercel.app",
    image: "/projects/Portfolio1.PNG",
    tech: "Next.js, TypeScript, Tailwind CSS, Node.js",
    description:
      "Terminal-inspired personal portfolio with interactive command navigation and animated UI.",
  },
  {
    permissions: "-rw-r--r--",
    size: "1.9M",
    date: "Mar 02",
    name: "Portfolio",
    url: "https://jakemayores.vercel.app",
    image: "/projects/Portfolio2.PNG",
    tech: "Next.js, TypeScript, Tailwind CSS, Node.js",
    description:
      "Modern personal showcase website featuring projects, skills, and contact pages.",
  },
  {
    permissions: "-rw-r--r--",
    size: "1.2M",
    date: "Feb 18",
    name: "EmailSender",
    url: "https://jm-email-sender.vercel.app",
    image: "/projects/EmailSender.png",
    tech: "React, Node.js, EmailJS",
    description:
      "Email utility app for composing and sending messages with a clean and simple interface.",
  },
  {
    permissions: "-rw-r--r--",
    size: "2.7M",
    date: "Jan 06",
    name: "GoCarExpress",
    url: "https://go-car-express.vercel.app",
    image: "/projects/GoCarExpress.png",
    tech: "Next.js, Tailwind CSS, TypeScript, Express.js, MongoDB",
    description:
      "Admin-focused car service platform with backend-driven workflows for managing bookings, service status, customer records, and operational updates.",
  },
  {
    permissions: "-rw-r--r--",
    size: "890K",
    date: "Sep 27",
    name: "MovieMunch",
    url: "https://github.com/Mayores-04/Movie_reservation",
    image: "/projects/MovieMunch.PNG",
    tech: "C#, MongoDB, Figma, Bunifu UI, Guna UI",
    description:
      "The MovieMunch System is an innovative desktop application designed to enhance the cinema experience. Book movie tickets and pre-order snacks. This is a fully functional application.",
  },
  {
    permissions: "-rw-r--r--",
    size: "1.4M",
    date: "Apr 03",
    name: "MessagingApp",
    url: "https://jm-messaging-app.vercel.app",
    image: "/projects/my_messenger.png",
    tech: "Next.js 14+, TypeScript, Clerk, Convex DB, Tailwind CSS, ShadCN UI",
    description:
      "Messaging app project deployed on Vercel with a chat-focused user experience.",
  },
  {
    permissions: "-rw-r--r--",
    size: "980K",
    date: "Apr 03",
    name: "ValenCardCreator",
    url: "https://valencard-creator.vercel.app",
    image: "/projects/valencard.png",
    tech: "Web Application",
    description:
      "Interactive card creator app for generating personalized Valentine-themed cards.",
  },
  {
    permissions: "-rw-r--r--",
    size: "1.1M",
    date: "Apr 03",
    name: "AlphaOfficial2024",
    url: "https://alpha-official2024.vercel.app",
    image: "/projects/alpha_official_2024.png",
    tech: "Next.js, TypeScript, Tailwind CSS, MongoDB",
    description:
      "Official ALPHA organization website for announcements, details, and public presence.",
  },
  {
    permissions: "-rw-r--r--",
    size: "1.6M",
    date: "Apr 03",
    name: "AlphaAdminDashboard",
    url: "https://alpha-admin-dashboard-six.vercel.app",
    image: "/projects/alpha_admin_dashboard.png",
    tech: "Next.js, TypeScript, Tailwind CSS, MongoDB",
    description:
      "Admin dashboard for ALPHA workflows, management tasks, and content operations.",
  },
  {
    permissions: "-rw-r--r--",
    size: "860K",
    date: "Apr 03",
    name: "OfficersPersonalityTest",
    url: "https://officers-personality-test.vercel.app",
    image: "/projects/alpha_personality_test.png",
    tech: "Next.js, TypeScript, Tailwind CSS, MongoDB",
    description:
      "Personality test app for officers with guided questions and result-based feedback.",
  },
];

export const getPreviewImage = (project: Project) =>
  project.image ||
  `https://image.thum.io/get/width/800/noanimate/${project.url}`;
