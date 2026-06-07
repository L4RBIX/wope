"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Wope?",
    answer:
      "Wope is a new-generation SEO research platform designed to elevate your marketing strategy. It is powered by an advanced artificial intelligence assistant that helps you generate endless ideas for high-ranking content and deep competitive insights.",
  },
  {
    question: "Who is Wope for?",
    answer:
      "Wope is built for a range of users involved in digital marketing and search engine optimization. Its features are powerful enough for specialized SEO agencies and scalable for growing startups looking to establish a strong online presence.",
  },
  {
    question: "What can I do with the Backlink Profile Analysis feature?",
    answer:
      "Wope's Backlink Profile Analysis allows you to dive deep into any website's backlink profile. You can uncover the specific sources of their backlinks, see the exact anchor texts being used, and evaluate authority scores to understand the strength of their link-building strategy.",
  },
  {
    question: 'How does the "Shared SEO Keywords" feature work?',
    answer:
      "This feature is designed for rapid competitive analysis. It allows you to enter two different domains and instantly see which SEO keywords they both rank for. This helps you identify keyword gaps, discover content opportunities, and refine your SEO strategy.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! Wope offers an unlimited 14-day free trial with no credit card required. You get full access to all features during the trial period so you can experience the full power of the platform before committing.",
  },
];

const STAR_POSITIONS: {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}[] = [
  { top: "8%", left: "5%", size: 2, delay: "0s", duration: "3.2s" },
  { top: "15%", left: "12%", size: 3, delay: "0.4s", duration: "2.8s" },
  { top: "5%", left: "28%", size: 2, delay: "1.1s", duration: "3.5s" },
  { top: "22%", left: "45%", size: 2, delay: "0.7s", duration: "2.6s" },
  { top: "10%", left: "62%", size: 3, delay: "1.5s", duration: "3.0s" },
  { top: "18%", left: "78%", size: 2, delay: "0.2s", duration: "3.8s" },
  { top: "7%", left: "90%", size: 2, delay: "0.9s", duration: "2.9s" },
  { top: "30%", left: "3%", size: 3, delay: "1.3s", duration: "3.4s" },
  { top: "35%", left: "96%", size: 2, delay: "0.6s", duration: "2.7s" },
  { top: "50%", left: "1%", size: 2, delay: "1.8s", duration: "3.1s" },
  { top: "55%", left: "98%", size: 3, delay: "0.3s", duration: "3.6s" },
  { top: "68%", left: "6%", size: 2, delay: "1.0s", duration: "2.5s" },
  { top: "72%", left: "92%", size: 2, delay: "1.6s", duration: "3.3s" },
  { top: "80%", left: "18%", size: 3, delay: "0.5s", duration: "2.8s" },
  { top: "85%", left: "35%", size: 2, delay: "1.2s", duration: "3.7s" },
  { top: "90%", left: "55%", size: 2, delay: "0.8s", duration: "3.0s" },
  { top: "88%", left: "72%", size: 3, delay: "1.7s", duration: "2.6s" },
  { top: "75%", left: "85%", size: 2, delay: "0.1s", duration: "3.9s" },
  { top: "42%", left: "50%", size: 2, delay: "1.4s", duration: "2.9s" },
  { top: "60%", left: "40%", size: 3, delay: "0.6s", duration: "3.2s" },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      style={{
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Star particles */}
      {STAR_POSITIONS.map((star, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: "white",
            animation: `twinkle ${star.duration} ${star.delay} infinite ease-in-out`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "840px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            marginBottom: "20px",
          }}
        >
          FAQ
        </span>

        <h2
          style={{
            fontFamily: "var(--font-rebond)",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: "64px",
            color: "white",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Frequently asked questions
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "rgb(155,150,176)",
            textAlign: "center",
            marginBottom: "64px",
          }}
        >
          {"Haven't found what you're looking for? "}
          <a
            href="mailto:support@wope.com"
            style={{
              color: "rgb(139,92,246)",
              textDecoration: "none",
            }}
          >
            Contact us.
          </a>
        </p>
      </div>

      {/* Accordion list */}
      <div
        style={{
          maxWidth: "840px",
          margin: "0 auto",
          width: "100%",
          padding: "0 24px",
        }}
      >
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const isLast = index === FAQ_ITEMS.length - 1;

          return (
            <div
              key={index}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderBottom: isLast
                  ? "1px solid rgba(255,255,255,0.1)"
                  : undefined,
                padding: "24px 0",
              }}
            >
              {/* Question header */}
              <button
                onClick={() => handleToggle(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "white",
                  fontFamily: "var(--font-inter)",
                  gap: "16px",
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                }}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>

                {/* Toggle circle */}
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: isOpen
                      ? "1px solid rgba(139,92,246,0.5)"
                      : "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "white",
                    fontSize: "20px",
                    lineHeight: "1",
                    background: isOpen
                      ? "rgba(139,92,246,0.2)"
                      : "transparent",
                    transition:
                      "transform 0.2s, background 0.2s, border-color 0.2s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "500px" : "0px",
                  transition: "max-height 0.35s ease",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "26px",
                    color: "rgb(155,150,176)",
                    paddingTop: "12px",
                    maxWidth: "680px",
                    margin: 0,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
