import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProgrammeDetailPage from "../features/programmes/ProgrammeDetailPage.jsx";
import ProgrammesPage from "../features/programmes/ProgrammesPage.jsx";
import AboutPage from "../features/about/AboutPage.jsx";
import SiteLayout from "./layouts/SiteLayout.jsx";
import HomePage from "../features/home/HomePage.jsx";
import GetInvolvedPage from "../features/get-involved/GetInvolvedPage.jsx";
import DonationCallbackPage from "../features/get-involved/DonationCallbackPage.jsx";
import ContactPage from "../features/contact/ContactPage.jsx";
import InsightDetailPage from "../features/insights/InsightDetailPage.jsx";
import AdminPage from "../features/admin/AdminPage.jsx";
import TermsPage from "../features/legal/TermsPage.jsx";
import PrivacyPolicyPage from "../features/legal/PrivacyPolicyPage.jsx";
import SeoMetadata from "./SeoMetadata.jsx";

function RoutedSite() {
  return (
    <>
      <SeoMetadata />
      <Routes>
      <Route path="/admin/*" element={<AdminPage />} />
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/programmes/:slug" element={<ProgrammeDetailPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/callback" element={<DonationCallbackPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights/:slug" element={<InsightDetailPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RoutedSite />
    </BrowserRouter>
  );
}
