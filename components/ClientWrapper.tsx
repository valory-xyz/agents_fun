"use client";

import { useState } from "react";
import HowItWorksModal from "./HowItWorksModal";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <>
      {children}
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </>
  );
}
