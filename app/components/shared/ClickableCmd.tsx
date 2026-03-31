"use client";
import React from "react";

interface ClickableCmdProps {
  cmdText: string;
  label: string;
  runCommand: (cmd: string) => void;
  isActive?: boolean;
}

const ClickableCmd = ({
  cmdText,
  label,
  runCommand,
  isActive,
}: ClickableCmdProps) => (
  <span
    className={`cursor-pointer transition-colors ${isActive ? "text-term-green font-bold underline" : "text-term-cyan hover:text-white hover:underline"}`}
    onClick={() => runCommand(cmdText)}
  >
    {label}
  </span>
);

export default ClickableCmd;
