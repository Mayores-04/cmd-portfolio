import React from "react";
import {
  FaGithub,

  import React from "react";
  import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
  import { FiExternalLink } from "react-icons/fi";

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/jakemayores",
      display: "github.com/jakemayores",
      icon: <FaGithub size={18} className="inline mr-2 text-term-cyan" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/jakemayores",
      display: "linkedin.com/in/jakemayores",
      icon: <FaLinkedin size={18} className="inline mr-2 text-term-cyan" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/jakemayores",
      display: "twitter.com/jakemayores",
      icon: <FaTwitter size={18} className="inline mr-2 text-term-cyan" />,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/jakemayores",
      display: "facebook.com/jakemayores",
      icon: <FaFacebook size={18} className="inline mr-2 text-term-cyan" />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/jakemayores",
      display: "instagram.com/jakemayores",
      icon: <FaInstagram size={18} className="inline mr-2 text-term-cyan" />,
    },
  ];

  const SocialsPage = () => (
    <div className="w-full h-full text-term-text font-mono p-0 select-none">
      <div className="text-term-yellow mb-4 font-semibold">
        Connect with me across the web:
      </div>
      <ul className="space-y-3">
        {socials.map((s) => (
          <li key={s.name} className="flex items-center">
            {s.icon}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-term-cyan hover:underline hover:text-term-yellow transition-colors duration-150"
            >
              {s.display}
            </a>
            <FiExternalLink
              size={14}
              className="ml-2 text-term-text opacity-70 inline"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  export default SocialsPage;
            size={14}
            className="ml-2 text-[var(--terminal-muted)] opacity-70 inline"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default SocialsPage;
