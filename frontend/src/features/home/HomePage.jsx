import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection.jsx";
import IntroSection from "./sections/IntroSection.jsx";
import ProgrammePreview from "./sections/ProgrammePreview.jsx";
import ApproachSection from "./sections/ApproachSection.jsx";
import TestimonialsSection from "./sections/TestimonialsSection.jsx";
import InsightsSection from "./sections/InsightsSection.jsx";
import { apiRequest } from "../../services/api.js";

export default function HomePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      apiRequest("/content/testimonials").catch(() => ({ items: [] })),
      apiRequest("/content/insights").catch(() => ({ items: [] })),
    ]).then(([testimonialResult, insightResult]) => {
      if (!active) return;
      setTestimonials(testimonialResult.items || []);
      setInsights(insightResult.items || []);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <HeroSection />
      <IntroSection />
      <ProgrammePreview />
      <ApproachSection />
      <TestimonialsSection testimonials={testimonials} />
      <InsightsSection insights={insights} />
    </main>
  );
}
