import Link from "next/link";
import {
  WopeLogoIcon,
  InstagramIcon,
  YouTubeIcon,
  LinkedInIcon,
  TwitterIcon,
  LocationPinIcon,
  type IconProps,
} from "@/components/icons";

type SvgIcon = (props: IconProps) => React.ReactElement;

const platformLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Partnership", href: "/partnership" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "Download", href: "/download" },
  { label: "Contact Us", href: "/contact-us" },
];

const legalsLinks = [
  { label: "Terms of Services", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const wopeForLinks = [
  { label: "Agencies", href: "/for-agencies" },
  { label: "Startups", href: "/for-startups" },
];

const socialLinks: { icon: SvgIcon; label: string; href: string }[] = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: YouTubeIcon, label: "YouTube", href: "https://youtube.com" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: TwitterIcon, label: "Twitter / X", href: "https://x.com" },
];

interface LinkColumnProps {
  heading: string;
  links: { label: string; href: string }[];
}

function LinkColumn({ heading, links }: LinkColumnProps) {
  return (
    <div>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: "16px",
        }}
      >
        {heading}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                display: "block",
                fontSize: "14px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 2,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              className="hover:!text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0118",
        color: "white",
        paddingTop: "64px",
      }}
    >
      {/* Main content row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "48px",
          maxWidth: "1248px",
          margin: "0 auto",
          padding: "0 40px",
          marginBottom: "48px",
        }}
      >
        {/* Brand column */}
        <div style={{ minWidth: "220px" }}>
          {/* Logo + wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <WopeLogoIcon width={28} height={28} />
            <span
              style={{
                fontFamily: "var(--font-rebond)",
                fontSize: "18px",
                fontWeight: 700,
                color: "white",
              }}
            >
              wope
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "24px",
              maxWidth: "200px",
              marginBottom: "24px",
              margin: "0 0 24px 0",
            }}
          >
            Experience the next generation of SEO analytics.
          </p>

          {/* Trial CTA */}
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            className="hover:!border-white/40 hover:!text-white"
          >
            Unlimited trial for 14 days
          </Link>
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer navigation"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "48px",
          }}
        >
          <LinkColumn heading="Platform" links={platformLinks} />
          <LinkColumn heading="Legals" links={legalsLinks} />
          <LinkColumn heading="Wope for" links={wopeForLinks} />
        </nav>

        {/* Contact card */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "24px",
            minWidth: "240px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "white",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Get in touch</span>
            <LocationPinIcon
              width={18}
              height={18}
              style={{ color: "rgba(255,255,255,0.4)" }}
            />
          </div>
          <address
            style={{
              fontStyle: "normal",
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: "24px",
            }}
          >
            651 N Broad St
            <br />
            Suite 201
            <br />
            Middletown, Delaware 19709
            <br />
            United States
          </address>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1248px",
          margin: "0 auto 24px",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1248px",
          margin: "0 auto",
          padding: "0 40px 32px",
          fontSize: "13px",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.35)" }}>
          ©2026 Wope. All rights reserved.
        </span>

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.5)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
              }}
              className="hover:!text-white"
            >
              <Icon width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
