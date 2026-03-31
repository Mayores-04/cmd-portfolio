import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/jakemayores",
    display: "github.com/jakemayores",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/jakemayores",
    display: "linkedin.com/in/jakemayores",
    icon: FaLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/jakemayores",
    display: "twitter.com/jakemayores",
    icon: FaTwitter,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/jakemayores",
    display: "facebook.com/jakemayores",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/jakemayores",
    display: "instagram.com/jakemayores",
    icon: FaInstagram,
  },
];

const SocialsPage = () => (
  <div className="w-full h-full font-mono p-0 select-none">
    <div className="text-term-yellow mb-4 font-semibold">
      Connect with me across the web:
    </div>

    <ul className="space-y-3">
      {socials.map((s) => {
        const Icon = s.icon;

        return (
          <li key={s.name} className="flex items-center">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-term-text hover:text--term-cyan hover:underline underline-offset-4 transition-colors duration-150"
            >
              <Icon size={18} className="mr-2 shrink-0" />
              <span>{s.display}</span>
              <FiExternalLink size={14} className="ml-2 shrink-0 opacity-70" />
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);

export default SocialsPage;
