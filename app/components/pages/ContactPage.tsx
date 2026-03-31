import React, { useState, useEffect } from "react";
import { Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="w-full h-full text-[#eaeaea] font-mono p-0 select-none">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2 text-yellow-400">
          <Mail size={16} className="inline-block" />
          <span className="text-[#eaeaea]">jakemayores05@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 text-yellow-400">
          <MapPin size={16} className="inline-block" />
          <span className="text-[#eaeaea]">
            Manila, Philippines{" "}
            <span className="text-gray-400">(Open to Remote)</span>
          </span>
        </div>
      </div>
      <div className="border-t border-[#b294bb] my-4" />
      <div className="text-[#b294bb] text-sm mb-2">
        --- Send a direct message ---
      </div>
      <form className="pl-2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2 max-w-md">
          <label className="text-[#61afef] text-xs mb-1" htmlFor="name">
            name:
          </label>
          <div className="flex items-center">
            <input
              id="name"
              type="text"
              className="bg-transparent border-none outline-none text-[#eaeaea] placeholder-gray-500 text-sm font-mono mb-2"
              placeholder="Press Enter to submit each field."
              autoComplete="off"
            />
          </div>
          {/* You can add more fields here if you want to expand the form */}
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
