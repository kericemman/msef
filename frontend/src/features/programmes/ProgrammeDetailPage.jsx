import { Link, Navigate, useParams } from "react-router-dom";
import { programmes } from "../../content/programmes.js";
import AgricultureProgrammePage from "./AgricultureProgrammePage.jsx";
import EducationSkillsProgrammePage from "./EducationSkillsProgrammePage.jsx";
import EnvironmentProgrammePage from "./EnvironmentProgrammePage.jsx";
import EconomicEmpowermentProgrammePage from "./EconomicEmpowermentProgrammePage.jsx";
import OtherServicesProgrammePage from "./OtherServicesProgrammePage.jsx";
import YouthRecoveryProgrammePage from "./YouthRecoveryProgrammePage.jsx";
import "../../styles/programme-detail.css";
import { useEffect } from "react";

export default function ProgrammeDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const programme = programmes.find((item) => item.slug === slug);
  if (!programme) return <Navigate to="/programmes" replace />;
  if (programme.slug === "agriculture") return <AgricultureProgrammePage />;
  if (programme.slug === "youth-and-recovery")
    return <YouthRecoveryProgrammePage />;
  if (programme.slug === "education-and-skills")
    return <EducationSkillsProgrammePage />;
  if (programme.slug === "environment") return <EnvironmentProgrammePage />;
  if (programme.slug === "economic-empowerment")
    return <EconomicEmpowermentProgrammePage />;
  if (programme.slug === "other-services")
    return <OtherServicesProgrammePage />;

  return (
    <main className="inner-page programme-detail">
      <section className="page-hero section-wrap">
        <div className="programme-breadcrumb">
          <Link to="/programmes">Programmes</Link>
          <span aria-hidden="true">/</span>
          <span>{programme.title}</span>
        </div>
        <p className="eyebrow">PROGRAMME AREA {programme.number}</p>
        <h1 className="!text-2xl md:!text-2xl lg:!text-3xl">
          {programme.title}
        </h1>
        <p className="!text-sm md:!text-xl">{programme.intro}</p>
        <div className="programme-status-note">
          <span className="status-dot" />
          Area of focus · current activities are being confirmed
        </div>
      </section>
      <section
        className={
          programme.image
            ? "programme-detail-body section-wrap has-image"
            : "programme-detail-body section-wrap"
        }
      >
        {programme.image && (
          <figure className="programme-detail-image">
            <img
              src={programme.image.optimizedUrl}
              alt={programme.image.alt}
              loading="lazy"
            />
            <figcaption>{programme.imageCaption}</figcaption>
          </figure>
        )}
        <div className="programme-detail-copy">
          <p className="eyebrow">AREAS OF FOCUS</p>
          <h2 className="!text-2xl md:!text-2xl lg:!text-3xl">
            Practical steps.
            <br />
            <em>Shared opportunity.</em>
          </h2>
          <ul>
            {programme.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="programme-note">{programme.note}</div>
          <Link className="button button-gold" to="/contact">
            Ask about this area{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
      <section className="programme-next">
        <div className="section-wrap">
          <Link to="/programmes">← Back to all programmes</Link>
          <Link to="/get-involved">
            Explore ways to get involved{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
