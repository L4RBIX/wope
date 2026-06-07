"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  WopeLogoIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";

const resourcesDropdownItems = [
  {
    title: "Wope for Agencies",
    subtitle: "Grow your startup with wope.",
    href: "/for-agencies",
  },
  {
    title: "Wope for Startups",
    subtitle: "Seamless Agency Solutions.",
    href: "/for-startups",
  },
  {
    title: "Partnership",
    subtitle: "Grow together with Wope!",
    href: "/partnership",
  },
  {
    title: "Affiliate",
    subtitle: "Start, share and earn with Wope.",
    href: "/affiliate",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(e.target as Node)
      ) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        fontFamily: "var(--font-inter, Inter, sans-serif)",
        fontSize: "16px",
        fontWeight: 400,
        color: "white",
        backgroundColor: scrolled ? "rgba(10,1,24,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        height: "78px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1248px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
        className="px-4 md:px-[111px]"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <WopeLogoIcon width={32} height={32} />
          <span
            style={{
              fontFamily: "var(--font-rebond, sans-serif)",
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            wope
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* Resources with dropdown */}
          <div
            ref={resourcesRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "rgba(255,255,255,0.8)",
                fontSize: "16px",
                fontWeight: 400,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.8)";
              }}
            >
              Resources
              <ChevronDownIcon
                style={{
                  transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {/* Dropdown */}
            {resourcesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(10,1,24,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "8px",
                  minWidth: "220px",
                  zIndex: 100,
                }}
              >
                {resourcesDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "transparent";
                    }}
                    onClick={() => setResourcesOpen(false)}
                  >
                    <div
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "2px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        color: "rgb(155,150,176)",
                        fontSize: "12px",
                      }}
                    >
                      {item.subtitle}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/download">Download</NavLink>
          <NavLink href="/contact-us">Contact Us</NavLink>
        </nav>

        {/* Desktop Auth */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Link
            href="/login"
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.14px",
              color: "white",
              background:
                "radial-gradient(107.5% 107.5% at 50% 215%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
              padding: "4px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.1)";
            }}
          >
            Sign up
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex md:hidden"
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "4px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <CloseIcon width={24} height={24} />
          ) : (
            <MenuIcon width={24} height={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: "78px",
            left: 0,
            right: 0,
            background: "rgba(10,1,24,0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            padding: "16px 24px 24px",
            zIndex: 1999,
          }}
        >
          {/* Resources accordion */}
          <div style={{ marginBottom: "4px" }}>
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "16px",
                fontWeight: 400,
                cursor: "pointer",
                padding: "12px 0",
              }}
            >
              Resources
              <ChevronDownIcon
                style={{
                  transform: resourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {resourcesOpen && (
              <div style={{ paddingLeft: "12px" }}>
                {resourcesDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{ color: "rgb(155,150,176)", fontSize: "12px" }}
                    >
                      {item.subtitle}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { label: "Pricing", href: "/pricing" },
            { label: "Download", href: "/download" },
            { label: "Contact Us", href: "/contact-us" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.8)",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "none",
                padding: "12px 0",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Link
              href="/login"
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "16px",
                textDecoration: "none",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "-0.14px",
                color: "white",
                background:
                  "radial-gradient(107.5% 107.5% at 50% 215%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
                padding: "4px 16px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
                display: "inline-block",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "rgba(255,255,255,0.8)",
        fontSize: "16px",
        fontWeight: 400,
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "white";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color =
          "rgba(255,255,255,0.8)";
      }}
    >
      {children}
    </Link>
  );
}
