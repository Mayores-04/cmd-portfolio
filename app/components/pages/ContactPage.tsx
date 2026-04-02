"use client";

import React, { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage: React.FC<{ executeCommand?: (cmd: string) => void }> = ({
  executeCommand,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="w-full h-full text-term-text font-mono p-0 select-none overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.p className="text-term-cyan mb-3" variants={itemVariants}>
        $ cat contact.txt
      </motion.p>

      <motion.div className="flex flex-col gap-2 mb-3" variants={itemVariants}>
        <div className="flex items-center gap-2 text-term-yellow">
          <Phone size={16} className="inline-block" />
          <span className="text-term-text">0970-127-5112</span>
        </div>
      </motion.div>

      <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
        <div className="flex items-center gap-2 text-term-yellow">
          <Mail size={16} className="inline-block" />
          <a
            href="mailto:jakemayores05@gmail.com"
            className="text-term-text hover:text-term-cyan underline-offset-4 hover:underline"
          >
            jakemayores05@gmail.com
          </a>
        </div>
      </motion.div>

      <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
        <div className="flex items-center gap-2 text-term-yellow">
          <MapPin size={16} className="inline-block" />
          <span className="text-term-text">
            Cainta, Rizal, Philippines{" "}
            <span className="text-term-gray">(Open to Remote)</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        className="border-t border-[#2b2b2b] my-4"
        variants={itemVariants}
      />

      <motion.div
        className="text-term-blue text-sm mb-2"
        variants={itemVariants}
      >
        --- quick links ---
      </motion.div>

      <motion.div className="text-sm mb-4 space-y-1" variants={itemVariants}>
        <p>
          <span className="text-term-yellow">LinkedIn:</span>{" "}
          <a
            className="text-term-cyan hover:underline"
            href="https://www.linkedin.com/in/jake-mayores-81677530a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            connect here
          </a>
        </p>
        <p>
          <span className="text-term-yellow">Instagram:</span>{" "}
          <a
            className="text-term-cyan hover:underline"
            href="https://www.instagram.com/mayoresjake/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mayoresjake
          </a>
        </p>
        <p>
          <span className="text-term-yellow">Facebook:</span>{" "}
          <a
            className="text-term-cyan hover:underline"
            href="https://www.facebook.com/jakejmayores"
            target="_blank"
            rel="noopener noreferrer"
          >
            /jakejmayores
          </a>
        </p>
      </motion.div>

      <motion.div
        className="border-t border-[#2b2b2b] my-4"
        variants={itemVariants}
      />

      <motion.div
        className="text-term-blue text-sm mb-2"
        variants={itemVariants}
      >
        --- send message ---
      </motion.div>

      <motion.form
        className="pl-2 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 max-w-md"
        onSubmit={handleSubmit}
        variants={itemVariants}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-term-blue text-xs mb-1 block" htmlFor="name">
              name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-transparent border-none outline-none text-term-text placeholder-[#6d6d6d] text-sm font-mono"
              placeholder="your name"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              className="text-term-blue text-xs mb-1 block"
              htmlFor="email"
            >
              email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-transparent border-none outline-none text-term-text placeholder-[#6d6d6d] text-sm font-mono"
              placeholder="your@email.com"
              autoComplete="off"
            />
          </div>

          <div>
            <label
              className="text-term-blue text-xs mb-1 block"
              htmlFor="message"
            >
              message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-transparent border-none outline-none text-term-text placeholder-[#6d6d6d] text-sm font-mono resize-none"
              placeholder="your message here..."
              rows={4}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-term-cyan hover:text-term-green disabled:text-term-gray transition-colors mt-2 cursor-pointer font-mono text-sm"
          >
            {loading ? "sending..." : "$ send"}
          </button>

          {status === "success" && (
            <p className="text-term-green text-xs">
              ✓ message sent successfully
            </p>
          )}
          {status === "error" && (
            <p className="text-term-red text-xs">✗ {errorMsg}</p>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ContactPage;
