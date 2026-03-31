export function getPathForCommand(cmd: string, currentPath: string): string {
  const normalized = cmd.trim().toLowerCase();
  switch (normalized) {
    case "1":
    case "about":
    case "cat about.md":
      return "~/about";
    case "2":
    case "projects":
    case "ls projects/":
      return "~/projects";
    case "3":
    case "contact":
    case "cat contact.txt":
      return "~/contact";
    case "4":
    case "socials":
    case "cat socials.txt":
      return "~/socials";
    case "5":
    case "resume":
      return "~/resume";
    case "0":
    case "home":
    case "help":
    case "menu":
    case "cd ~":
      return "~";
    default:
      return currentPath;
  }
}

// Instead of returning JSX, return a string or a key for the output type.
// The presentational logic should be handled in the component layer.
export type TerminalOutputType =
  | "home"
  | "about"
  | "projects"
  | "contact"
  | "socials"
  | "resume"
  | "sudo"
  | "notfound"
  | "none";

export interface TerminalOutputResult {
  type: TerminalOutputType;
  command: string;
}

export function getTerminalOutputType(command: string): TerminalOutputResult {
  const cmd = command.trim().toLowerCase();
  switch (cmd) {
    case "help":
    case "home":
    case "menu":
    case "0":
    case "cd ~":
      return { type: "home", command };
    case "1":
    case "about":
    case "cat about.md":
      return { type: "about", command };
    case "2":
    case "projects":
    case "ls projects/":
      return { type: "projects", command };
    case "3":
    case "contact":
    case "cat contact.txt":
      return { type: "contact", command };
    case "4":
    case "socials":
    case "cat socials.txt":
      return { type: "socials", command };
    case "5":
    case "resume":
      return { type: "resume", command };
    case "sudo":
      return { type: "sudo", command };
    case "":
      return { type: "none", command };
    default:
      return { type: "notfound", command };
  }
}
