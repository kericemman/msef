import ProgrammesHeroSection from "./sections/ProgrammesHeroSection.jsx";
import ProgrammeCardsSection from "./sections/ProgrammeCardsSection.jsx";
import ProgrammesFinalCtaSection from "./sections/ProgrammesFinalCtaSection.jsx";
import { useEffect } from "react";

export default function ProgrammesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-[#f7f5ef]">
      <ProgrammesHeroSection />
      <ProgrammeCardsSection />
      <ProgrammesFinalCtaSection />
    </main>
  );
}
