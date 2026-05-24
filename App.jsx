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

const experience = [
  {
    title: "Information Technology Intern",
    org: "University of Texas System",
    location: "Austin, Texas",
    dates: "Jun 2025 – Aug 2025",
    bullets: [
      "Designed enterprise Power BI dashboards integrating 15+ ITSM data sources via REST APIs across 14 UT institutions",
      "Built Azure-based predictive analytics models reducing delivery delays by 30%, saving ~$200K in project overruns",
      "Automated compliance tracking workflows, eliminating 15+ hours of manual work weekly",
      "Conducted federal AI funding landscape analysis, mapping $2M+ in grant opportunities",
    ],
  },
  {
    title: "Technical Specialist – Data Analytics",
    org: "AT&T Inc.",
    location: "Prague, Czech Republic",
    dates: "Aug 2018 – Dec 2021",
    bullets: [
      "Spearheaded statistical optimization of RF network performance across 500+ cell sites, improving signal quality by 18%",
      "Developed quantitative risk models reducing vulnerability exposure by 40%",
      "Led customer experience initiatives driving 20% improvement in NPS and $1.2M in retained revenue",
      "Managed cross-functional team of 8 analysts implementing statistical process control",
    ],
  },
  {
    title: "Data Analytics Consultant",
    org: "UTEP Graduate School",
    location: "El Paso, Texas",
    dates: "May 2023 – Aug 2024",
    bullets: [
      "Delivered statistical analyses informing $500K+ in graduate program funding allocations",
      "Built student success prediction models achieving 94% accuracy for 200+ at-risk students",
      "Presented data-driven recommendations to Board of Directors and executive leadership",
      "Created self-service Power BI dashboards reducing ad-hoc reporting requests by 60%",
    ],
  },
  {
    title: "Graduate Research Assistant",
    org: "UTEP, Dept. of Mathematical Sciences",
    location: "El Paso, Texas",
    dates: "Jan 2022 – Present",
    bullets: [
      "Leading research on multi-modal anomaly detection using generative AI (IEEE submissions)",
      "Secured $450,000 in competitive NSF funding through collaborative grant writing",
      "Mentored 3 undergraduate researchers — 2 presented at regional conferences, 1 received departmental honors",
      "Instructed 40+ students in Statistical Inference and Probability (4.7/5.0 evaluations)",
    ],
  },
];

const education = [
  { degree: "Ph.D. in Data Science", school: "University of Texas at El Paso", date: "Expected May 2026", detail: 'Dissertation: "Multi-modal Anomaly Detection Using Deep Learning Techniques" — Advisor: Dr. Ritwik Bhattacharya' },
  { degree: "M.S. in Mathematics of Finance & Economics", school: "University of Silesia, Poland", date: "September 2017", detail: "" },
  { degree: "M.S. in Engineering Mathematics", school: "University of L'Aquila, Italy", date: "September 2017", detail: "" },
  { degree: "B.S. in Financial Mathematics", school: "University for Development Studies, Ghana", date: "April 2015", detail: "" },
];

const publications = [
  { authors: 'Ocansey, I.T., Bhattacharya, R., Sen, T.', title: '"LogTinyLLM: Contextual Log Anomaly Detection Using Tiny LLMs"', venue: "IEEE TNNLS, 2025" },
  { authors: 'Ocansey, I.T.', title: '"Deep Learning for Financial Anomaly Detection"', venue: "ICMLA 2024, Miami, FL" },
  { authors: 'Ocansey, I.T.', title: '"Generative AI in Statistical Anomaly Detection"', venue: "UT Austin Dept. of Statistics, March 2024" },
];

const skillCategories = [
  { label: "Languages", items: ["Python", "R", "SQL", "MATLAB", "LaTeX"] },
  { label: "ML / AI", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "XGBoost", "Hugging Face", "LangChain"] },
  { label: "Platforms & Cloud", items: ["Power BI", "Tableau", "Apache Spark", "Databricks", "Azure", "AWS", "Docker", "Git"] },
  { label: "Specializations", items: ["Deep Learning", "NLP", "LLMs", "Generative AI", "Bayesian Methods", "Time Series", "A/B Testing"] },
];

const awards = [
  "UTEP Graduate Research Fellowship — $75,000 (2022–2026)",
  "Research Enhancement Grant — $3,000 (2025)",
  "IEEE Student Travel Award (2024)",
  "ICML 2024 Peer Reviewer",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(15,43,70,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.4s ease", borderBottom: scrolled ? `1px solid rgba(200,164,90,0.15)` : "none" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: scrolled ? GOLD : "#fff", letterSpacing: 1, cursor: "pointer", transition: "color 0.3s" }} onClick={() => onNav("About")}>ITO</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4 }} className="desktop-nav">
            {sections.map(s => (
              <button key={s} onClick={() => onNav(s)} style={{ background: active === s ? "rgba(200,164,90,0.15)" : "transparent", border: "none", color: active === s ? GOLD : (scrolled ? "#ccc" : "rgba(255,255,255,0.8)"), fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 6, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.3s" }}>{s}</button>
            ))}
          </div>
          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: scrolled ? GOLD : "#fff", fontSize: 24, cursor: "pointer", padding: 4 }}>☰</button>
        </div>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: "rgba(15,43,70,0.98)", padding: "8px 32px 16px", display: "flex", flexDirection: "column", gap: 4 }} className="mobile-dropdown">
          {sections.map(s => (
            <button key={s} onClick={() => { onNav(s); setMenuOpen(false); }} style={{ background: active === s ? "rgba(200,164,90,0.15)" : "transparent", border: "none", color: active === s ? GOLD : "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "10px 14px", borderRadius: 6, cursor: "pointer", textAlign: "left" }}>{s}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ onNav }) {
  return (
    <section id="About" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${ACCENT} 0%, #0A1F33 50%, #061422 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Geometric accents */}
      <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", border: `1px solid rgba(200,164,90,0.08)` }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", border: `1px solid rgba(200,164,90,0.06)` }} />
      <div style={{ position: "absolute", top: "20%", right: "15%", width: 1, height: 200, background: `linear-gradient(to bottom, transparent, rgba(200,164,90,0.15), transparent)` }} />
      <div style={{ position: "absolute", bottom: "25%", left: "10%", width: 150, height: 1, background: `linear-gradient(to right, transparent, rgba(200,164,90,0.12), transparent)` }} />

      <div style={{ textAlign: "center", padding: "120px 32px 80px", maxWidth: 800, position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-block", padding: "6px 20px", border: `1px solid ${GOLD}`, borderRadius: 40, marginBottom: 32, opacity: 0, animation: "fadeSlideUp 0.8s ease 0.2s forwards" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: GOLD, letterSpacing: 2.5, textTransform: "uppercase" }}>Data Scientist &bull; ML Engineer &bull; Researcher</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: "0 0 16px", opacity: 0, animation: "fadeSlideUp 0.8s ease 0.4s forwards" }}>
          Isaiah Thompson<br />
          <span style={{ color: GOLD }}>Ocansey</span>
          <span style={{ fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 400, color: "rgba(255,255,255,0.5)", verticalAlign: "super", marginLeft: 8, fontFamily: "'DM Sans', sans-serif" }}>Ph.D.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px", opacity: 0, animation: "fadeSlideUp 0.8s ease 0.6s forwards" }}>
          Ph.D. Candidate in Data Science at UTEP with 5+ years driving business value through advanced analytics, predictive modeling, and AI-powered solutions. Published in IEEE TNNLS. $450K+ in competitive research funding secured.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeSlideUp 0.8s ease 0.8s forwards" }}>
          <button onClick={() => onNav("Contact")} style={{ background: GOLD, color: ACCENT, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, padding: "12px 32px", borderRadius: 8, cursor: "pointer", letterSpacing: 0.5, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 20px rgba(200,164,90,0.3)" }} onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(200,164,90,0.4)"; }} onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(200,164,90,0.3)"; }}>Get in Touch</button>
          <button onClick={() => onNav("Experience")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "12px 32px", borderRadius: 8, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.3s" }} onMouseOver={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; }} onMouseOut={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "#fff"; }}>View Experience</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56, opacity: 0, animation: "fadeSlideUp 0.8s ease 1s forwards", flexWrap: "wrap" }}>
          {[["5+", "Years Experience"], ["94%", "Model Accuracy"], ["$450K+", "Funding Secured"], ["3", "Publications"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: GOLD }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, subtitle, children, dark = false }) {
  return (
    <section id={id} style={{ padding: "96px 32px", background: dark ? ACCENT : WARM_WHITE, position: "relative" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: dark ? GOLD : ACCENT_LIGHT, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>{subtitle}</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: dark ? "#fff" : TEXT_DARK, margin: 0, lineHeight: 1.2 }}>{title}</h2>
            <div style={{ width: 48, height: 3, background: GOLD, marginTop: 16, borderRadius: 2 }} />
          </div>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}

function ExperienceCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.1}>
      <div style={{ background: "#fff", borderRadius: 12, padding: "28px 32px", marginBottom: 20, border: `1px solid ${SOFT_GRAY}`, cursor: "pointer", transition: "all 0.3s", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }} onClick={() => setExpanded(!expanded)} onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"} onMouseOut={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 600, color: TEXT_DARK, margin: "0 0 4px" }}>{item.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: ACCENT_LIGHT, margin: 0, fontWeight: 500 }}>{item.org}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: TEXT_LIGHT }}>{item.dates}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: TEXT_LIGHT }}>{item.location}</div>
          </div>
        </div>
        <div style={{ maxHeight: expanded ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
          <ul style={{ margin: "16px 0 0", padding: "0 0 0 20px", listStyle: "none" }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_MED, lineHeight: 1.7, marginBottom: 8, position: "relative", paddingLeft: 16 }}>
                <span style={{ position: "absolute", left: 0, top: 8, width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: GOLD, marginTop: expanded ? 8 : 12, fontWeight: 500 }}>{expanded ? "Show less ▲" : "Show details ▼"}</div>
      </div>
    </FadeIn>
  );
}

export default function App() {
  const [active, setActive] = useState("About");

  const onNav = (section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(section);
  };

  useEffect(() => {
    const handler = () => {
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) { setActive(s); break; }
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: WARM_WHITE, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-dropdown { display: none !important; }
        }
      `}</style>

      <Nav active={active} onNav={onNav} />
      <Hero onNav={onNav} />

      {/* EXPERIENCE */}
      <Section id="Experience" title="Professional Experience" subtitle="Career">
        {experience.map((item, i) => <ExperienceCard key={i} item={item} index={i} />)}
      </Section>

      {/* EDUCATION */}
      <Section id="Education" title="Academic Background" subtitle="Education" dark>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {education.map((ed, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 28, border: "1px solid rgba(200,164,90,0.12)", transition: "all 0.3s", height: "100%" }} onMouseOver={e => e.currentTarget.style.borderColor = "rgba(200,164,90,0.35)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(200,164,90,0.12)"}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: GOLD, fontWeight: 500, marginBottom: 8 }}>{ed.date}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>{ed.degree}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0 }}>{ed.school}</p>
                {ed.detail && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 12, lineHeight: 1.6, fontStyle: "italic" }}>{ed.detail}</p>}
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* RESEARCH */}
      <Section id="Research" title="Publications & Awards" subtitle="Research">
        <FadeIn>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT_LIGHT, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Publications</h3>
        </FadeIn>
        {publications.map((pub, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", marginBottom: 12, borderLeft: `3px solid ${GOLD}`, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_DARK, margin: 0, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 500 }}>{pub.authors}</span>{" "}
                <span style={{ fontStyle: "italic" }}>{pub.title}</span>{" "}
                <span style={{ color: TEXT_LIGHT }}>{pub.venue}</span>
              </p>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.3}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT_LIGHT, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 40, marginBottom: 20 }}>Awards & Recognition</h3>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          {awards.map((a, i) => (
            <FadeIn key={i} delay={0.3 + i * 0.08}>
              <div style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", border: `1px solid ${SOFT_GRAY}`, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ minWidth: 8, minHeight: 8, borderRadius: "50%", background: GOLD }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: TEXT_MED }}>{a}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT_LIGHT, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 40, marginBottom: 20 }}>Affiliations</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["American Statistical Association", "Institute for Mathematical Statistics", "IEEE Computer Society"].map(a => (
              <span key={a} style={{ background: "rgba(15,43,70,0.06)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: ACCENT_LIGHT, padding: "8px 16px", borderRadius: 8, fontWeight: 500 }}>{a}</span>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* SKILLS */}
      <Section id="Skills" title="Technical Proficiencies" subtitle="Skills" dark>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {skillCategories.map((cat, ci) => (
            <FadeIn key={ci} delay={ci * 0.1}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 28, border: "1px solid rgba(200,164,90,0.1)" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>{cat.label}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.items.map(item => (
                    <span key={item} style={{ background: "rgba(200,164,90,0.1)", border: "1px solid rgba(200,164,90,0.15)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", padding: "6px 14px", borderRadius: 6, transition: "all 0.3s" }}>{item}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="Contact" title="Let's Connect" subtitle="Contact">
        <FadeIn>
          <div style={{ background: "#fff", borderRadius: 16, padding: "48px 40px", border: `1px solid ${SOFT_GRAY}`, textAlign: "center", maxWidth: 640, margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: TEXT_MED, lineHeight: 1.7, marginBottom: 36 }}>
              I'm actively seeking opportunities in data science, machine learning, and research. Let's discuss how I can contribute to your team.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              {[
                ["✉", "ocanthom@gmail.com", "mailto:ocanthom@gmail.com"],
                ["☎", "(915) 929-3196", "tel:+19159293196"],
                ["in", "linkedin.com/in/itor", "https://linkedin.com/in/itor"],
                ["⟨⟩", "github.com/ocansey", "https://github.com/ocansey"],
              ].map(([icon, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: TEXT_DARK, padding: "10px 24px", borderRadius: 8, border: `1px solid ${SOFT_GRAY}`, width: "100%", maxWidth: 340, transition: "all 0.3s" }} onMouseOver={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = "rgba(200,164,90,0.04)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = SOFT_GRAY; e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ width: 36, height: 36, borderRadius: 8, background: `rgba(15,43,70,0.06)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: ACCENT_LIGHT, flexShrink: 0 }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* FOOTER */}
      <footer style={{ background: ACCENT, padding: "32px", textAlign: "center", borderTop: `1px solid rgba(200,164,90,0.1)` }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>© 2026 Isaiah Thompson Ocansey. All rights reserved.</p>
      </footer>
    </div>
  );
}
