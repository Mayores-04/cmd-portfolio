"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

function ContactForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 0) {
        setFormData({ ...formData, name: input });
        setStep(1);
        setInput("");
      } else if (step === 1) {
        setFormData({ ...formData, email: input });
        setStep(2);
        setInput("");
      } else if (step === 2) {
        setFormData({ ...formData, message: input });
        setStep(3);
        setInput("");
      }
    }
  };

  if (step === 3) {
    return (
      <motion.div
        variants={item}
        className="text-term-green mt-4 flex items-center gap-2"
      >
        <Send size={16} />
        <span>
          Message successfully sent to /dev/null! Thanks for reaching out,{" "}
          {formData.name}.
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div variants={item} className="mt-4 flex flex-col gap-2">
      {step >= 0 && (
        <div className="flex items-center gap-2">
          <span className="text-term-cyan">name:</span>
          {step > 0 ? (
            <span className="text-term-text">{formData.name}</span>
          ) : (
            <div className="flex items-center flex-1">
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none flex-1 text-term-text"
                spellCheck={false}
              />
              <span className="animate-blink">_</span>
            </div>
          )}
        </div>
      )}

      {step >= 1 && (
        <div className="flex items-center gap-2">
          <span className="text-term-cyan">email:</span>
          {step > 1 ? (
            <span className="text-term-text">{formData.email}</span>
          ) : (
            <div className="flex items-center flex-1">
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none flex-1 text-term-text"
                spellCheck={false}
              />
              <span className="animate-blink">_</span>
            </div>
          )}
        </div>
      )}

      {step >= 2 && (
        <div className="flex items-center gap-2">
          <span className="text-term-cyan">message:</span>
          {step > 2 ? (
            <span className="text-term-text">{formData.message}</span>
          ) : (
            <div className="flex items-center flex-1">
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none flex-1 text-term-text"
                spellCheck={false}
              />
              <span className="animate-blink">_</span>
            </div>
          )}
        </div>
      )}

      <div className="text-term-gray text-xs mt-2 italic">
        Press Enter to submit each field.
      </div>
    </motion.div>
  );
}

type ClickableCmdProps = {
  cmdText: string;
  label: string;
};

type SocialLinkProps = {
  href: string;
  label: string;
};

function SocialLink({ href, label }: SocialLinkProps) {
  return (
    <motion.a
      variants={item}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 hover:bg-term-gray/20 p-2 rounded w-fit transition-colors group"
    >
      <LinkIcon size={20} className="text-term-text group-hover:text-white" />
      <span className="text-term-cyan group-hover:underline">{label}</span>
      <ExternalLink size={14} className="text-term-gray" />
    </motion.a>
  );
}

export const generateOutput = (
  command: string,
  runCommand: (cmd: string) => void,
): React.ReactNode => {
  const cmd = command.trim().toLowerCase();

  const ClickableCmd = ({ cmdText, label }: ClickableCmdProps) => (
    <span
      className="cursor-pointer text-term-cyan hover:text-white hover:underline transition-colors"
      onClick={() => runCommand(cmdText)}
    >
      {label}
    </span>
  );

  switch (cmd) {
    case "help":
    case "home":
    case "menu":
    case "0":
    case "cd ~":
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 my-4 h-full items-center justify-center text-center"
        >
          <motion.div
            variants={item}
            className="text-term-green whitespace-pre font-bold hidden sm:block"
          >
            {`  ╔══════════════════════════════════════╗
  ║   Welcome to Jake's Portfolio        ║
  ║   Select a page from the nav menu    ║
  ╚══════════════════════════════════════╝`}
          </motion.div>

          <motion.div
            variants={item}
            className="text-term-green font-bold sm:hidden border border-term-green p-4 inline-block"
          >
            Welcome to Jake's Portfolio
            <br />
            Select a page from the nav menu
          </motion.div>
        </motion.div>
      );

    case "1":
    case "about":
    case "cat about.md":
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 my-4"
        >
          <motion.div
            variants={item}
            className="text-xl font-bold text-term-cyan border-b border-term-gray pb-2 inline-block"
          >
            ~/about.md
          </motion.div>

          <motion.div variants={item} className="max-w-2xl leading-relaxed">
            Hi, I'm{" "}
            <span className="text-term-green font-bold">Jake Mayores</span>. I'm
            a passionate Front-end Web Developer dedicated to building
            responsive, accessible, and performant web applications.
          </motion.div>
        </motion.div>
      );

    case "2":
    case "projects":
    case "ls projects/":
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 my-4"
        >
          <motion.div variants={item} className="text-term-cyan">
            total 4
          </motion.div>
          <motion.div variants={item} className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-term-yellow border-b border-term-gray">
                  <th className="py-2 pr-4 font-normal">Permissions</th>
                  <th className="py-2 pr-4 font-normal">Size</th>
                  <th className="py-2 pr-4 font-normal">Date</th>
                  <th className="py-2 pr-4 font-normal">Project Name</th>
                  <th className="py-2 font-normal">Tech Stack</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-term-gray/20 transition-colors">
                  <td className="py-2 pr-4 text-term-gray">-rw-r--r--</td>
                  <td className="py-2 pr-4">1.2M</td>
                  <td className="py-2 pr-4">Oct 12</td>
                  <td className="py-2 pr-4 text-term-cyan font-bold">
                    E-Commerce_Platform
                  </td>
                  <td className="py-2 text-term-text">
                    Next.js, Stripe, Tailwind
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      );

    case "3":
    case "contact":
    case "cat contact.txt":
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 my-4"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-2 text-term-text"
          >
            <Mail size={16} className="text-term-yellow" />
            <a
              href="mailto:hello@jakemayores.com"
              className="hover:text-term-cyan hover:underline"
            >
              hello@jakemayores.com
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-2 text-term-text mb-4"
          >
            <MapPin size={16} className="text-term-yellow" />
            <span>Manila, Philippines (Open to Remote)</span>
          </motion.div>

          <motion.div
            variants={item}
            className="text-term-purple border-t border-term-gray pt-4"
          >
            --- Send a direct message ---
          </motion.div>

          <ContactForm />
        </motion.div>
      );

    case "4":
    case "socials":
    case "cat socials.txt":
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3 my-4"
        >
          <motion.div variants={item} className="text-term-yellow mb-2">
            Connect with me across the web:
          </motion.div>

          <SocialLink
            href="https://github.com/jakemayores"
            label="github.com/jakemayores"
          />
          <SocialLink
            href="https://linkedin.com/in/jakemayores"
            label="linkedin.com/in/jakemayores"
          />
          <SocialLink
            href="https://twitter.com/jakemayores"
            label="twitter.com/jakemayores"
          />
          <SocialLink
            href="https://facebook.com/jakemayores"
            label="facebook.com/jakemayores"
          />
          <SocialLink
            href="https://instagram.com/jakemayores"
            label="instagram.com/jakemayores"
          />
        </motion.div>
      );

    case "5":
    case "resume":
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 my-4"
        >
          <motion.div variants={item} className="text-term-text">
            Initiating download sequence...
          </motion.div>
          <motion.div variants={item} className="text-term-yellow">
            {"[===================================>] 100%"}
          </motion.div>
          <motion.div variants={item} className="text-term-green">
            Success: resume.pdf downloaded.
          </motion.div>
        </motion.div>
      );

    case "sudo":
      return (
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="text-term-red my-2"
        >
          jake is not in the sudoers file. This incident will be reported.
        </motion.div>
      );

    case "":
      return null;

    default:
      return (
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="text-term-red my-2"
        >
          bash: command not found: {command}
          <br />
          <span className="text-term-gray text-sm">
            Type <ClickableCmd cmdText="help" label="'help'" /> to see available
            commands.
          </span>
        </motion.div>
      );
  }
};

export const getPathForCommand = (cmd: string, currentPath: string): string => {
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
};
