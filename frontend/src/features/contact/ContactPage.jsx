import ContactHeroSection from "./sections/ContactHeroSection.jsx";
import ContactDetailsSection from "./sections/ContactDetailsSection.jsx";
import ContactFormSection from "./sections/ContactFormSection.jsx";
import { useEffect } from "react";


export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-[#F5F5F5] text-[#001F3F]">
      <ContactHeroSection />
      <ContactDetailsSection />
      <ContactFormSection />
    </main>
  );
}
