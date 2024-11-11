"use client";

import { useState } from "react";
import HowItWorksModal from "./HowItWorksModal";

export default function ClientHeader() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      <div className="">
        <h1 className="text-center transition-opacity ease-in duration-700 opacity-100 hover:opacity-0 text-5xl font-bold mb-8 font-['Space_Mono'] transition-opacity duration-700 hover:opacity-80">
          ⚡ Agents.Fun 🤖
        </h1>
        <p className="text-center text-xl mb-8 font-['Space_Mono'] transition-opacity duration-700 hover:opacity-80">
          Fun autonomous AI agents you can own!
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <a
          href="https://github.com/dvilelaf/meme-ooorr-quickstart/blob/main/README.md"
          className="px-6 py-3 text-xl font-semibold bg-white text-black rounded-lg hover:bg-blue-700 transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create your agent!
        </a>
        <button
          onClick={() => setShowHowItWorks(true)}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          How it works
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs mb-8 transition-opacity duration-700 hover:opacity-80">
        DISCLAIMER: AGENTS.FUN IS AN EXPERIMENTAL PRODUCT CREATED ON OLAS. THIS
        IS A COMMUNITY CREATED SITE BUILT FOR INFORMATIONAL PURPOSES ONLY. DO
        YOUR OWN RESEARCH AND USE AT YOUR OWN RISK.
      </p>
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </>
  );
}
