import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <Link
        className="wordmark"
        to="/"
        aria-label="Morning Star Empowerment Foundation home"
        onClick={closeMenu}
      >
        <span>
          <strong>MORNING STAR</strong>
          <small>EMPOWERMENT FOUNDATION</small>
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">
          {open ? "Close" : "Open"} navigation menu
        </span>
        <Icon name={open ? "close" : "menu"} size={20} />
      </button>
      <nav
        id="main-nav"
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/programmes" onClick={closeMenu}>
          Programmes
        </NavLink>
        <NavLink to="/get-involved" onClick={closeMenu}>
          Get involved
        </NavLink>
        <NavLink className="nav-contact" to="/contact" onClick={closeMenu}>
          Contact us <Icon name="arrow-up-right" size={16} />
        </NavLink>
      </nav>
    </header>
  );
}
