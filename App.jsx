import { useState, useEffect, useRef } from "react";

const ACCENT = "#0F2B46";
const ACCENT_LIGHT = "#1A4A73";
const GOLD = "#C8A45A";
const WARM_WHITE = "#FAF8F5";
const SOFT_GRAY = "#E8E4DF";
const TEXT_DARK = "#1A1A1A";
const TEXT_MED = "#4A4A4A";
const TEXT_LIGHT = "#7A7A7A";

const sections = ["About", "Experience", "Education", "Research", "Skills", "Contact"];

/* ---------------- DATA (UNCHANGED) ---------------- */

const experience = [/* same as yours */];
const education = [/* same as yours */];
const publications = [/* same as yours */];
const skillCategories = [/* same as yours */];
const awards = [/* same as yours */];

/* ---------------- UTIL HOOKS ---------------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold });

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Nav({ active, onNav }) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "rgba(15,43,70,0.97)",
      zIndex: 100,
      padding: "14px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid rgba(200,164,90,0.15)"
    }}>
      <div
        style={{
          color: GOLD,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "serif"
        }}
        onClick={() => onNav("About")}
      >
        ITO
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {sections.map(s => (
          <button
            key={s}
            onClick={() => onNav(s)}
            style={{
              background: "transparent",
              border: "none",
              color: active === s ? GOLD : "#ccc",
              cursor: "pointer",
              fontSize: 13
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ---------------- HERO (UPDATED PROFESSIONAL INTRO) ---------------- */

function Hero({ onNav }) {
  return (
    <section
      id="About"
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${ACCENT}, #061422)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px"
      }}
    >
      <div style={{ maxWidth: 850 }}>

        {/* PROFILE IMAGE */}
        <img
          src="/Photo.png"
          alt="Isaiah Thompson Ocansey"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
            border: "2px solid rgba(200,164,90,0.5)",
            marginBottom: 24
          }}
        />

        {/* WELCOME HEADING */}
        <h1 style={{
          fontFamily: "serif",
          fontSize: "clamp(36px, 5vw, 60px)",
          color: "#fff",
          marginBottom: 16,
          lineHeight: 1.1
        }}>
          Welcome to my professional portfolio<br />
          <span style={{ color: GOLD }}>
            Isaiah Thompson Ocansey, Ph.D.
          </span>
        </h1>

        {/* SUBTITLE */}
        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 17,
          lineHeight: 1.7,
          maxWidth: 700,
          margin: "0 auto 30px"
        }}>
          I am a Data Scientist specialized in machine learning, Deep Learning,
          statistical modeling, and AI-driven anomaly detection systems. My research
          focuses on transforming complex data into reliable, real-world intelligence.
        </p>

        {/* CTA BUTTONS */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => onNav("Contact")}
            style={{
              background: GOLD,
              color: ACCENT,
              border: "none",
              padding: "12px 26px",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Contact Me
          </button>

          <button
            onClick={() => onNav("Experience")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "12px 26px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            View Experience
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION WRAPPER ---------------- */

function Section({ id, title, subtitle, children, dark }) {
  return (
    <section
      id={id}
      style={{
        padding: "90px 24px",
        background: dark ? ACCENT : WARM_WHITE
      }}
    >
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        <FadeIn>
          <h2 style={{
            fontSize: 32,
            marginBottom: 10,
            color: dark ? "#fff" : TEXT_DARK
          }}>
            {title}
          </h2>
          <p style={{ color: GOLD, marginBottom: 30 }}>{subtitle}</p>
        </FadeIn>

        {children}
      </div>
    </section>
  );
}

/* ---------------- CONTACT (UPGRADED OFFICIAL STYLE) ---------------- */

function Contact() {
  return (
    <Section id="Contact" title="Let’s Connect" subtitle="Contact">
      <div style={{
        background: "#fff",
        padding: 40,
        borderRadius: 12,
        textAlign: "center"
      }}>
        <p style={{ marginBottom: 24, color: TEXT_MED, lineHeight: 1.7 }}>
          I welcome professional inquiries, collaboration opportunities, and research discussions.
          Feel free to reach out directly via email.
        </p>

        {/* EMAIL BUTTON */}
        <a
          href="mailto:ocanthom@gmail.com?subject=Professional%20Inquiry"
          style={{
            display: "inline-block",
            background: GOLD,
            color: ACCENT,
            padding: "12px 26px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            marginBottom: 20
          }}
        >
          Send Email
        </a>

        <div style={{ marginTop: 20, color: TEXT_MED }}>
          📧 ocanthom@gmail.com
        </div>
      </div>
    </Section>
  );
}

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const [active, setActive] = useState("About");

  const onNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Nav active={active} onNav={onNav} />

      <Hero onNav={onNav} />

      <Section id="Experience" title="Professional Experience" subtitle="Career">
        <p>/* your experience cards remain unchanged */</p>
      </Section>

      <Section id="Education" title="Academic Background" subtitle="Education" dark>
        <p>/* unchanged */</p>
      </Section>

      <Section id="Research" title="Publications & Awards" subtitle="Research">
        <p>/* unchanged */</p>
      </Section>

      <Section id="Skills" title="Technical Skills" subtitle="Capabilities" dark>
        <p>/* unchanged */</p>
      </Section>

      <Contact />

      <footer style={{
        textAlign: "center",
        padding: 20,
        background: ACCENT,
        color: "#aaa"
      }}>
        © 2026 Isaiah Thompson Ocansey. All rights reserved.
      </footer>
    </div>
  );
}
