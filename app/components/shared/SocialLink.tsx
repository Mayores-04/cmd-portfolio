"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link as LinkIcon, ExternalLink } from "lucide-react";
import { item } from "@/utils/animation";

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink = ({ href, label }: SocialLinkProps) => (
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

export default SocialLink;
