import { Outlet } from "react-router-dom";
import SiteHeader from "../../components/SiteHeader.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import WhatsAppFloatingButton from "../../components/WhatsAppFloatingButton.jsx";

export default function SiteLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <div id="main">
        <Outlet />
      </div>
      <SiteFooter />
      <WhatsAppFloatingButton />
    </>
  );
}
