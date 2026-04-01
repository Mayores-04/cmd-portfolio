import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const SocialsPage: React.FC<{ executeCommand?: (cmd: string) => void }> = ({
  executeCommand,
}) => {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/Mayores-04",
      display: "github.com/Mayores-04",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jake-mayores-81677530a/",
      display: "linkedin.com/in/jake-mayores-81677530a",
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/your-profile",
      display: "twitter.com/your-profile",
      icon: FaTwitter,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/jakejmayores",
      display: "facebook.com/jakejmayores",
      icon: FaFacebook,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mayoresjake/",
      display: "instagram.com/mayoresjake",
      icon: FaInstagram,
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full h-full font-mono p-0 select-none"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="text-term-cyan mb-1" variants={itemVariants}>
        $ cat socials.txt
      </motion.div>
      <motion.div
        className="text-term-yellow mb-4 font-semibold"
        variants={itemVariants}
      >
        Connect with me across the web:
      </motion.div>

      <ul className="space-y-3">
        {socials.map((s) => {
          const Icon = s.icon;

          return (
            <motion.li
              key={s.name}
              className="flex items-center"
              variants={itemVariants}
            >
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-term-text hover:text-[#00FFFF] hover:underline underline-offset-4 transition-colors duration-150"
              >
                <Icon size={18} className="mr-2 shrink-0" />
                <span>{s.display}</span>
                <FiExternalLink
                  size={14}
                  className="ml-2 shrink-0 opacity-70"
                />
              </a>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default SocialsPage;
