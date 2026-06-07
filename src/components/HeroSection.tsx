import Image from "next/image";
import Link from "next/link";
import {
  QNBLogo,
  BMWLogo,
  DeliveryHeroLogo,
  MediaMarktLogo,
  BayerLogo,
  AmazonLogo,
} from "@/components/icons";

// Hardcoded star positions to avoid SSR/client mismatch
const STARS: Array<{
  top: string;
  left: string;
  width: string;
  height: string;
  duration: string;
  delay: string;
}> = [
  { top: "3%",  left: "7%",  width: "2px", height: "2px", duration: "3.2s", delay: "0.1s"  },
  { top: "8%",  left: "23%", width: "3px", height: "3px", duration: "4.5s", delay: "0.7s"  },
  { top: "5%",  left: "41%", width: "2px", height: "2px", duration: "2.8s", delay: "1.2s"  },
  { top: "11%", left: "58%", width: "3px", height: "3px", duration: "3.9s", delay: "0.4s"  },
  { top: "2%",  left: "76%", width: "2px", height: "2px", duration: "4.1s", delay: "1.8s"  },
  { top: "14%", left: "89%", width: "3px", height: "3px", duration: "2.6s", delay: "0.9s"  },
  { top: "20%", left: "4%",  width: "2px", height: "2px", duration: "3.7s", delay: "0.3s"  },
  { top: "18%", left: "17%", width: "2px", height: "2px", duration: "4.8s", delay: "1.5s"  },
  { top: "25%", left: "33%", width: "3px", height: "3px", duration: "3.1s", delay: "0.6s"  },
  { top: "22%", left: "51%", width: "2px", height: "2px", duration: "4.3s", delay: "2.1s"  },
  { top: "30%", left: "67%", width: "3px", height: "3px", duration: "2.9s", delay: "0.2s"  },
  { top: "27%", left: "82%", width: "2px", height: "2px", duration: "3.5s", delay: "1.1s"  },
  { top: "35%", left: "11%", width: "3px", height: "3px", duration: "4.7s", delay: "0.8s"  },
  { top: "38%", left: "28%", width: "2px", height: "2px", duration: "3.3s", delay: "1.7s"  },
  { top: "42%", left: "45%", width: "2px", height: "2px", duration: "2.7s", delay: "0.5s"  },
  { top: "39%", left: "63%", width: "3px", height: "3px", duration: "4.0s", delay: "2.3s"  },
  { top: "45%", left: "79%", width: "2px", height: "2px", duration: "3.6s", delay: "1.0s"  },
  { top: "50%", left: "2%",  width: "3px", height: "3px", duration: "4.4s", delay: "0.15s" },
  { top: "53%", left: "19%", width: "2px", height: "2px", duration: "3.0s", delay: "1.4s"  },
  { top: "48%", left: "36%", width: "2px", height: "2px", duration: "4.9s", delay: "0.65s" },
  { top: "56%", left: "54%", width: "3px", height: "3px", duration: "2.5s", delay: "1.9s"  },
  { top: "60%", left: "71%", width: "2px", height: "2px", duration: "3.8s", delay: "0.35s" },
  { top: "57%", left: "87%", width: "3px", height: "3px", duration: "4.2s", delay: "1.3s"  },
  { top: "65%", left: "9%",  width: "2px", height: "2px", duration: "3.4s", delay: "2.0s"  },
  { top: "68%", left: "26%", width: "2px", height: "2px", duration: "4.6s", delay: "0.55s" },
  { top: "72%", left: "43%", width: "3px", height: "3px", duration: "2.4s", delay: "1.6s"  },
  { top: "75%", left: "60%", width: "2px", height: "2px", duration: "3.9s", delay: "0.25s" },
  { top: "70%", left: "77%", width: "2px", height: "2px", duration: "4.1s", delay: "2.2s"  },
  { top: "80%", left: "14%", width: "3px", height: "3px", duration: "3.2s", delay: "1.05s" },
  { top: "85%", left: "92%", width: "2px", height: "2px", duration: "4.3s", delay: "0.45s" },
];

const TOP_GRADIENT =
  "linear-gradient(to bottom, rgba(183,164,251,0) 0%, rgb(183,164,251) 50%, rgb(133,98,255) 50%, rgba(133,98,255,0) 100%)";
const LINE_GRADIENT =
  "linear-gradient(to bottom, rgba(183,164,251,0) 0%, rgba(183,164,251,0.5) 50%, rgba(133,98,255,0.5) 50%, rgba(133,98,255,0) 100%)";
const RAY_GRADIENT =
  "linear-gradient(to bottom, rgba(183,164,251,0) 0%, rgb(183,164,251) 50%, rgb(133,98,255) 50%, rgba(133,98,255,0) 100%)";

function maskStyle(filename: string, size: "cover" | "contain" = "contain") {
  const url = `url('/images/hero/${filename}')`;
  return {
    maskImage: url,
    WebkitMaskImage: url,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: size,
    WebkitMaskSize: size,
  } as React.CSSProperties;
}

function HeroBackground() {
  const LINES = [
    { file: "hero-background-bottom-line-1.png", delay: "0s" },
    { file: "hero-background-bottom-line-2.png", delay: "2s" },
    { file: "hero-background-bottom-line-3.png", delay: "3s" },
    { file: "hero-background-bottom-line-4.png", delay: "1s" },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "calc(50% - 624px)",
        top: "96px",
        width: "1248px",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* TOP — horizontal scanning beam */}
      <div
        style={{
          backgroundImage: "url('/images/hero/hero-background-top.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          position: "relative",
          width: "100%",
          height: "202px",
          marginBottom: "85px",
        }}
      >
        <div
          style={{
            ...maskStyle("hero-background-top-mask.png", "cover"),
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 9,
          }}
        >
          <div
            style={{
              backgroundImage: TOP_GRADIENT,
              width: "100%",
              height: "100px",
              animation: "hero-top-anim 6s cubic-bezier(0.62,0.62,0.28,0.67) infinite",
            }}
          />
        </div>
      </div>

      {/* Glow/lights layer — sibling of top beam, at top: 230px from HeroBackground (same as wope.com) */}
      <div
        style={{
          backgroundImage: "url('/images/hero/hero-background-lights.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          height: "725px",
          width: "1680px",
          position: "absolute",
          top: "230px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* BOTTOM — grid with scanning lines and ray */}
      <div style={{ height: "530px", position: "relative" }}>

        {/* 4 vertical scanning line animations */}
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              ...maskStyle(line.file),
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              zIndex: 9,
            }}
          >
            <div
              style={{
                backgroundImage: LINE_GRADIENT,
                width: "100%",
                height: "100px",
                animation: `hero-line-anim 4s cubic-bezier(0.62,0.62,0.14,1) ${line.delay} infinite`,
              }}
            />
          </div>
        ))}

        {/* Ray — the bright flash that sweeps through */}
        <div
          style={{
            ...maskStyle("hero-background-bottom-ray.png"),
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 9,
          }}
        >
          <div
            style={{
              backgroundImage: RAY_GRADIENT,
              width: "100%",
              height: "100px",
              animation: "hero-ray-anim 8s cubic-bezier(0.62,0.62,0.28,0.67) 1s infinite",
            }}
          />
        </div>

        {/* Grid overlay image (mix-blend-mode: overlay adds depth) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/hero-background-bottom.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            mixBlendMode: "overlay",
            zIndex: 12,
          }}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 100,
        paddingTop: "196px",
        textAlign: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Animated grid background */}
      <HeroBackground />

      {/* Star particles overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {STARS.map((star, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              background: "white",
              borderRadius: "50%",
              animation: `twinkle ${star.duration} infinite alternate`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>


      <style>{`
        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          letter-spacing: -0.14px;
          color: white;
          background: radial-gradient(107.5% 107.5% at 50% 215%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          padding: 8px 24px;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          white-space: nowrap;
        }
        .hero-cta-btn:hover {
          background: radial-gradient(107.5% 107.5% at 50% 215%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 100%);
        }
      `}</style>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          className="hero-h1-gradient"
          style={{
            fontFamily: "var(--font-rebond, var(--font-geist-sans, system-ui, sans-serif))",
            fontWeight: 700,
            fontSize: "72px",
            lineHeight: "80px",
            letterSpacing: "-1.44px",
            textAlign: "center",
            marginBottom: "12px",
            padding: "0 24px",
          }}
        >
          New Era of SEO Research
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter, var(--font-geist-sans, system-ui, sans-serif))",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "28px",
            letterSpacing: "-0.2px",
            color: "rgb(155, 150, 176)",
            textAlign: "center",
            maxWidth: "862px",
            margin: "0 auto 24px",
            padding: "0 24px",
          }}
        >
          Let our AI do the heavy lifting. Make your competitor research, find hidden keyword
          opportunities and get clear &amp; actionable insights
        </p>

        <div className="glow-wrap">
          <div className="glow-animations">
            <div className="glow-glow" />
            <div className="glow-stars-masker">
              <div className="glow-stars" />
            </div>
          </div>
          <div className="glow-content">
            <Link href="/signup" className="hero-cta-btn">
              Unlimited trial for 14 days
            </Link>
          </div>
        </div>

        {/* Hero app screenshot — marginTop 154px matches wope.com's hero-video-content marginTop: 150px + ~4px line-box */}
        <Image
          src="/images/research/hero-video-desktop-preview.png"
          alt="Wope SEO Research App"
          width={1198}
          height={663}
          priority
          style={{
            width: "100%",
            maxWidth: "1198px",
            display: "block",
            marginTop: "154px",
          }}
        />
      </div>

      {/* Logo bar — marginTop: 80px matches wope.com's floatingCustomers */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "48px",
          flexWrap: "wrap",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <QNBLogo />
        <BMWLogo />
        <DeliveryHeroLogo />
        <MediaMarktLogo />
        <BayerLogo />
        <AmazonLogo />
      </div>
    </section>
  );
}
