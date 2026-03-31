"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { item } from "@/utils/animation";

const ContactForm = () => {
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
};

export default ContactForm;
