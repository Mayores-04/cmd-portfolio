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
  { key: "3", label: "contact", desc: "reach me directly" },
  { key: "4", label: "socials", desc: "social accounts" },
  { key: "5", label: "resume", desc: "download and summary" },
  { key: "6", label: "journey", desc: "achievements and milestones" },
];
