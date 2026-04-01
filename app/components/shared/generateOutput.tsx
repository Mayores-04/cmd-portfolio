import React from "react";
import { TerminalOutputType } from "@/services/terminalService";
import HomePage from "../pages/HomePage";
import ListingPage from "../pages/ListingPage";
import AboutPage from "../pages/AboutPage";
import ProjectsPage from "../pages/ProjectsPage";
import ContactPage from "../pages/ContactPage";
import SocialsPage from "../pages/SocialsPage";
import ResumePage from "../pages/ResumePage";

export function generateOutput(
  type: TerminalOutputType,
  executeCommand: (cmd: string) => void,
) {
  switch (type) {
    case "home":
      return <HomePage />;
    case "listing":
      return <ListingPage />;
    case "about":
      return <AboutPage />;
    case "projects":
      return <ProjectsPage />;
    case "contact":
      return <ContactPage />;
    case "socials":
      return <SocialsPage />;
    case "resume":
      return <ResumePage />;
    case "sudo":
      return <div>Permission Denied</div>;
    case "notfound":
      return <div>Command Not Found</div>;
    default:
      return null;
  }
}
