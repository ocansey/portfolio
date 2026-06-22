import { useState, useEffect, useRef } from "react";

/* ---------------- EXECUTIVE THEME ---------------- */
const NAVY = "#0B1F33";
const NAVY_2 = "#102A43";
const GOLD = "#C8A45A";
const IVORY = "#FAF8F5";
const CARD = "#FFFFFF";
const TEXT = "#1A1A1A";
const MUTED = "#5B6770";

const sections = ["About", "Experience", "Education", "Research", "Skills", "Contact"];

/* ---------------- EXPERIENCE ---------------- */
const experience = [
  {
    title: "Graduate Research Assistant",
    org: "University of Texas at El Paso – Department of Mathematical Sciences",
    location: "El Paso, TX",
    dates: "Jan 2022 – Present",
    bullets: [
      "Developed LogTinyLLM for real-time anomaly detection achieving 98%+ accuracy with reduced computational cost",
      "Built federated learning frameworks for privacy-preserving machine learning in distributed environments",
      "Designed clustering-based models (K-Means, Hierarchical) for financial and operational risk segmentation"
    ],
  },
  {
    title: "Data Analytics Consultant",
    org: "University of Texas at El Paso – Graduate School",
    location: "El Paso, TX",
    dates: "May 2023 – Aug 2024",
    bullets: [
      "Improved institutional enrollment strategy resulting in a 15% increase in graduate admissions",
      "Developed executive-level Power BI dashboards reducing reporting workload by 40%",
      "Provided data-driven insights to senior leadership for strategic decision-making"
    ],
  },
  {
    title: "Technical Specialist – Data Analytics",
    org: "AT&T Inc.",
    location: "Prague, Czech Republic",
    dates: "Aug 2018 – Dec 2021",
    bullets: [
      "Improved customer satisfaction (NPS +20%) using predictive analytics models",
      "Optimized performance across 500+ network sites improving operational efficiency by 18%",
      "Led analytics team of 8 supporting enterprise-wide statistical process control systems"
    ],
  }
];

/* ---------------- EDUCATION ---------------- */
const education = [
  {
    degree: "Ph.D. in Data Science",
    school: "University of Texas at El Paso",
    date: "May 2026",
    detail: "Dissertation: Multi-modal Anomaly Detection Using Deep Learning"
  },
  {
    degree: "M.S. Mathematics of Finance & Economics",
    school: "University of Silesia, Poland",
    date: "2017"
  },
  {
    degree: "M.S. Engineering Mathematics",
    school: "University of L’Aquila, Italy",
    date: "2017"
  },
  {
    degree: "B.S. Financial Mathematics",
    school: "University for Development Studies, Ghana",
    date: "2015"
  }
];

/* ---------------- PUBLICATIONS ---------------- */
const publications = [
  {
    authors: "Ocansey, I.T., Bhattacharya, R., Sen, T.",
    title: "DP-FlogTinyLLM: Differentially private federated log anomaly detection using Tiny LLMs",
    venue: "International Journal of Data Science - Under Review"
  },
{
    authors: "Ocansey, I.T., Bhattacharya, R., Sen, T.",
    title: "LogTinyLLM: Contextual Log Anomaly Detection Using Tiny LLMs",
    venue: "Annals of Data Science - Under Review)"
  },



  
  {
    authors: "Ocansey, I.T.",
    title: "Log Anomaly Detection With Parameter-Efficient Tiny Language Models: From Centralized Fine-Tuning to Privacy-Preserving Federated Learning",
    venue: "Proquest 2026"
  },
  {
    authors: "Zeliatu Ahmed, Aisha Mohammed Suleiman, Abimbola Filani, Isaiah Thompson Ocansey, Alice Ama Donkor.",
    title: "The Role of Advanced Machine Learning Algorithms in Detecting and Mitigating Cybersecurity Threats within United States Healthcare Digital Infrastructure: A Comprehensive Vulnerability Analysis",
    venue: "Journal Of Engineering And Computer Sciences"
  }
];

/* ---------------- SKILLS ---------------- */
const skillCategories = [
  {
    label: "Programming",
    items: ["Python", "R", "SQL", "MATLAB", "LaTeX"]
  },
  {
    label: "Machine Learning & AI",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Hugging Face", "LLMs"]
  },
  {
    label: "Cloud & Data Systems",
    items: ["AWS", "Azure", "Spark", "Databricks", "Docker", "Git"]
  },
  {
    label: "Analytics & Modeling",
    items: ["Power BI", "Tableau", "Time Series", "Bayesian Modeling", "A/B Testing"]
  }
];

/* ---------------- UTIL ---------------- */
function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function FadeIn({ children }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(25px)",
        transition: "0.7s ease"
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ onNav }) {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      width: "100%",
      background: NAVY,
      padding: "14px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000,
      borderBottom: "1px solid rgba(200,164,90,0.2)"
    }}>
      <div style={{ color: GOLD, fontWeight: 700, letterSpacing: 1 }}>
        ITO
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {sections.map(s => (
          <button
            key={s}
            onClick={() => onNav(s)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 13,
              cursor: "pointer",
              opacity: 0.85
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onNav }) {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg, ${NAVY}, #061424)`
    }}>
      <div style={{ textAlign: "center", maxWidth: 900 }}>

        {/* EXECUTIVE PHOTO */}
        <img
          src="/Photo.png"
          alt="Profile"
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            objectFit: "cover",
            border: `4px solid ${GOLD}`,
            boxShadow: "0 25px 70px rgba(0,0,0,0.6)"
          }}
        />

        <h1 style={{
          color: "white",
          fontSize: 52,
          marginTop: 24,
          fontWeight: 700
        }}>
          Isaiah Thompson Ocansey, Ph.D.
        </h1>

        <h3 style={{ color: GOLD, marginTop: 8 }}>
          Data Scientist • Machine Learning Engineer • Researcher
        </h3>

        <p style={{
          color: "#C9D6E3",
          maxWidth: 750,
          margin: "20px auto",
          lineHeight: 1.7,
          fontSize: 16
        }}>
          Ph.D. in Data Science  with specialization in machine learning, anomaly detection, and scalable AI systems.
          Experienced in building production-level LLM systems, federated learning architectures, and enterprise analytics
          solutions with measurable academic and industrial impact.
        </p>

        <button
          onClick={() => onNav("Contact")}
          style={{
            marginTop: 18,
            padding: "12px 30px",
            background: GOLD,
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Contact
        </button>
      </div>
    </section>
  );
}

/* ---------------- SECTION ---------------- */
function Section({ id, title, children, dark }) {
  return (
    <section id={id} style={{
      padding: "90px 24px",
      background: dark ? NAVY_2 : IVORY
    }}>
      <div style={{ maxWidth: 1050, margin: "auto" }}>
        <h2 style={{
          color: dark ? "white" : TEXT,
          fontSize: 28,
          marginBottom: 20
        }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE CARD ---------------- */
function ExperienceCard({ item }) {
  return (
    <div style={{
      background: CARD,
      padding: 22,
      borderRadius: 12,
      marginBottom: 14,
      border: "1px solid #E6E6E6"
    }}>
      <h3 style={{ marginBottom: 4 }}>{item.title}</h3>
      <p style={{ color: MUTED }}>{item.org}</p>
      <small>{item.dates} • {item.location}</small>

      <ul style={{ marginTop: 10 }}>
        {item.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 6 }}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  const onNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav onNav={onNav} />

      <Hero onNav={onNav} />

      <Section id="Experience" title="Professional Experience">
        {experience.map((e, i) => (
          <ExperienceCard key={i} item={e} />
        ))}
      </Section>

      <Section id="Education" title="Academic Background" dark>
        {education.map((e, i) => (
          <div key={i} style={{ color: "white", marginBottom: 12 }}>
            <b>{e.degree}</b> — {e.school} ({e.date})
            {e.detail && <div style={{ color: "#B8C7D6" }}>{e.detail}</div>}
          </div>
        ))}
      </Section>

      <Section id="Research" title="Publications">
        {publications.map((p, i) => (
          <div key={i} style={{
            background: CARD,
            padding: 16,
            marginBottom: 10,
            borderRadius: 10
          }}>
            <b>{p.authors}</b>
            <div><i>{p.title}</i></div>
            <div>{p.venue}</div>
          </div>
        ))}
      </Section>

      <Section id="Skills" title="Technical Skills" dark>
        {skillCategories.map((c, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <h4 style={{ color: GOLD }}>{c.label}</h4>
            <p style={{ color: "#D6E2EF" }}>{c.items.join(" • ")}</p>
          </div>
        ))}
      </Section>

      <Section id="Contact" title="Contact">
        <p>Email: <b>ocanthom@gmail.com</b></p>
      </Section>
    </>
  );
}
