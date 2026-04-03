import { terminalCommandTypeMap } from "@/data/navigationData";

const pathByType = {
  home: "~",
  about: "~/about",
  projects: "~/projects",
  journey: "~/journey",
  contact: "~/contact",
  socials: "~/socials",
  resume: "~/resume",
} as const;

const typeByDirectory = {
  home: "home",
  about: "about",
  projects: "projects",
  journey: "journey",
  contact: "contact",
  socials: "socials",
  resume: "resume",
} as const;

type NavigableOutputType = keyof typeof pathByType;

function resolveCdType(
  cmd: string,
  currentPath: string,
): NavigableOutputType | null {
  if (!cmd.startsWith("cd")) {
    return null;
  }

  const rawTarget = cmd.slice(2).trim().toLowerCase();

  // Match shell behavior where `cd` without an argument returns home.
  if (!rawTarget || rawTarget === "~" || rawTarget === "/") {
    return "home";
  }

  if (rawTarget === "..") {
    return currentPath === "~" ? "home" : "home";
  }

  const normalizedTarget = rawTarget
    .replace(/^\.\//, "")
    .replace(/^~\//, "")
    .replace(/^\//, "")
    .replace(/\/$/, "");

  if (normalizedTarget in typeByDirectory) {
    return typeByDirectory[normalizedTarget as keyof typeof typeByDirectory];
  }

  return null;
}

function resolveCommandType(
  command: string,
  currentPath = "~",
): TerminalOutputType {
  const cmd = command.trim().toLowerCase();

  const cdType = resolveCdType(cmd, currentPath);
  if (cdType) {
    return cdType;
  }

  if (cmd === "sudo") {
    return "sudo";
  }

  if (cmd === "") {
    return "none";
  }

  const mappedType = terminalCommandTypeMap[cmd];
  if (mappedType) {
    return mappedType as TerminalOutputType;
  }

  return "notfound";
}

export function getPathForCommand(cmd: string, currentPath: string): string {
  const type = resolveCommandType(cmd, currentPath);
  if (type in pathByType) {
    return pathByType[type as NavigableOutputType];
  }
  return currentPath;
}

// Instead of returning JSX, return a string or a key for the output type.
// The presentational logic should be handled in the component layer.
export type TerminalOutputType =
  | "home"
  | "listing"
  | "about"
  | "projects"
  | "journey"
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

export function getTerminalOutputType(
  command: string,
  currentPath = "~",
): TerminalOutputResult {
  return { type: resolveCommandType(command, currentPath), command };
}
