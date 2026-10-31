import AboutHeroSection from "./sections/AboutHeroSection.jsx";
import MissionVisionSection from "./sections/MissionVisionSection.jsx";
import PurposeSection from "./sections/PurposeSection.jsx";
import ApproachSection from "./sections/ApproachSection.jsx";
import DirectorMessageSection from "./sections/DirectorMessageSection.jsx";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="text-[#001F3F]">
      <AboutHeroSection />
      <MissionVisionSection />
      <PurposeSection />
      <ApproachSection />
      <DirectorMessageSection />
    </main>
  );
}
