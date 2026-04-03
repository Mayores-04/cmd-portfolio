export type NavigationItem = {
  label: string;
  command: string;
  icon: string;
};

export type TerminalMenuItem = {
  key: string;
  label: string;
  desc: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", command: "home", icon: "🏠" },
  { label: "About", command: "about", icon: "👤" },
  { label: "Projects", command: "projects", icon: "💼" },
  { label: "Journey", command: "journey", icon: "🧭" },
  { label: "Contact", command: "contact", icon: "✉️" },
  { label: "Socials", command: "socials", icon: "🔗" },
  { label: "Resume", command: "resume", icon: "📄" },
];

export const navigationPathMap: Record<string, string> = {
  home: "~",
  about: "~/about",
  projects: "~/projects",
  journey: "~/journey",
  contact: "~/contact",
  socials: "~/socials",
  resume: "~/resume",
};

export const breadcrumbLabelMap: Record<string, string> = {
  "~": "Home",
  "~/about": "About",
  "~/projects": "Projects",
  "~/journey": "Journey",
  "~/contact": "Contact",
  "~/socials": "Socials",
  "~/resume": "Resume",
};

export const breadcrumbCommandMap: Record<string, string> = {
  "~": "home",
  "~/about": "about",
  "~/projects": "projects",
  "~/journey": "journey",
  "~/contact": "contact",
  "~/socials": "socials",
  "~/resume": "resume",
};

export const terminalMenuItems: TerminalMenuItem[] = [
  { key: "0", label: "home", desc: "Home page" },
  { key: "1", label: "about", desc: "profile and values" },
  { key: "2", label: "projects", desc: "work and stack" },
  { key: "3", label: "journey", desc: "achievements and milestones" },
  { key: "4", label: "contact", desc: "reach me directly" },
  { key: "5", label: "socials", desc: "social accounts" },
  { key: "6", label: "resume", desc: "download and summary" },
];

export const terminalCommandTypeMap: Record<string, string> = {
  home: "home",
  help: "home",
  menu: "home",
  "0": "home",
  ls: "listing",
  "ls -l": "listing",
  "1": "about",
  "cat about.md": "about",
  "2": "projects",
  "ls projects/": "projects",
  "3": "journey",
  journey: "journey",
  "cat journey.md": "journey",
  "4": "contact",
  "cat contact.txt": "contact",
  "5": "socials",
  "cat socials.txt": "socials",
  "6": "resume",
  resume: "resume",
};
