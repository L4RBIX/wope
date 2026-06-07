import Image from "next/image";
import type React from "react";

const LINE_GRADIENT =
  "linear-gradient(to bottom, rgba(183,164,251,0) 0%, rgba(183,164,251,0.5) 50%, rgba(133,98,255,0.5) 50%, rgba(133,98,255,0) 100%)";
const RAY_GRADIENT =
  "linear-gradient(to bottom, rgba(183,164,251,0) 0%, rgb(183,164,251) 50%, rgb(133,98,255) 50%, rgba(133,98,255,0) 100%)";
const TOP_GRADIENT =
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

const LINES = [
  { file: "hero-background-bottom-line-1.png", delay: "0s" },
  { file: "hero-background-bottom-line-2.png", delay: "2s" },
  { file: "hero-background-bottom-line-3.png", delay: "3s" },
  { file: "hero-background-bottom-line-4.png", delay: "1s" },
];

function CTABackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "96px",
        left: "calc(50% - 624px)",
        width: "1248px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* TOP beam */}
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
              animation:
                "hero-top-anim 6s cubic-bezier(0.62,0.62,0.28,0.67) infinite",
            }}
          />
        </div>
      </div>

      {/* Glow/lights layer — sibling of top beam, at top: 230px from CTABackground */}
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

      {/* BOTTOM grid */}
      <div style={{ height: "530px", position: "relative" }}>

        {/* Scanning lines */}
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

        {/* Ray flash */}
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
              animation:
                "hero-ray-anim 8s cubic-bezier(0.62,0.62,0.28,0.67) 1s infinite",
            }}
          />
        </div>

        {/* Grid overlay */}
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

export default function CTASection() {
  return (
    <div
      style={{
        padding: "0 80px",
        marginBottom: "80px",
      }}
    >
      <style>{`
        .cta-try-demo-btn {
          background: rgb(139, 92, 246);
          color: white;
          font-size: 14px;
          font-weight: 600;
          border-radius: 9999px;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .cta-try-demo-btn:hover {
          background: rgb(109, 40, 217);
        }
        .cta-domain-input::placeholder {
          color: rgba(255,255,255,0.4);
        }
      `}</style>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundImage: "url('/images/cta/cta-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "left top",
          borderRadius: "24px",
          padding: "80px 40px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "500px",
          justifyContent: "center",
        }}
      >
        {/* Scanning animation — same as hero section */}
        <CTABackground />

        {/* Content layer above the animation */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* App icon */}
          <Image
            src="/images/cta/cta-icon.png"
            alt="Wope app icon"
            width={80}
            height={80}
            style={{
              borderRadius: "18px",
              marginBottom: "24px",
            }}
          />

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-rebond)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: "64px",
              color: "white",
              letterSpacing: "-0.5px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Outrank Everyone. Starting Now.
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "28px",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Wope analyzes millions of data points to deliver predictive insights.
          </p>

          {/* Input group with glowing Try Demo button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "9999px",
              padding: "4px 4px 4px 20px",
              gap: 0,
            }}
          >
            <input
              type="text"
              placeholder="Enter your domain"
              className="cta-domain-input"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "15px",
                width: "220px",
              }}
            />
            <div className="glow-wrap">
              <div className="glow-animations">
                <div className="glow-glow" />
                <div className="glow-stars-masker">
                  <div className="glow-stars" />
                </div>
              </div>
              <div className="glow-content">
                <button className="cta-try-demo-btn">Try Demo</button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>No credit card required</span>
            <span>✦</span>
            <span>14-days free trial</span>
          </p>
        </div>
      </div>
    </div>
  );
}
