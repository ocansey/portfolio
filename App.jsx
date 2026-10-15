import { useEffect, useMemo, useState } from "react";

/* =====================================================================
   Single source of truth: Résumé (September 2026).
   Every figure below is copied from the résumé. Edit here, not in the JSX.
   ===================================================================== */

const PROFILE = {
  name: "Isaiah Thompson Ocansey, Ph.D.",
  title: "Data Scientist and Machine Learning Engineer",
  location: "El Paso, TX",
  email: "ocanthom@gmail.com",
  resume: "Isaiah_Thompson_Ocansey_Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/itor/",
    github: "https://github.com/ocansey",
    scholar: "https://scholar.google.com/citations?user=pen_i60AAAAJ&hl=en",
    researchgate: "https://www.researchgate.net/profile/Isaiah-Thompson-Ocansey-3",
    arxiv: "https://arxiv.org/abs/2507.11071"
  }
};

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["research", "Research"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["contact", "Contact"]
];

const FACTS = [
  ["98.83%", "anomaly-detection accuracy from LogTinyLLM, at 70% lower compute"],
  ["14", "UT System institutions given real-time risk visibility"],
  ["$1.2M", "annual revenue retained through analytics at AT&T"],
  ["10", "publications on Google Scholar"]
];

const EXPERIENCE = [
  {
    id: "gra",
    title: "Graduate Research Assistant",
    focus: "Machine Learning and Quantitative Modeling",
    org: "University of Texas at El Paso, Department of Mathematical Sciences",
    place: "El Paso, TX",
    dates: "01/2022 – 12/2025",
    bullets: [
      "Engineered LogTinyLLM, a compact transformer delivering 98.83% anomaly-detection accuracy at 70% lower compute cost than large-LLM baselines through LoRA fine-tuning; first-author paper under review (arXiv:2507.11071).",
      "Designed a cross-silo federated learning pipeline with differential privacy, enabling institutions to train shared models on protected records without centralizing data; second paper under review.",
      "Segmented 5,960 home equity borrowers across 13 risk variables using K-Means and hierarchical clustering; analysis projected a 35% reduction in credit default rates and a 15% lift in loan approval accuracy.",
      "Accelerated experiment turnaround on multi-modal deep learning workloads by implementing distributed PyTorch training with mixed precision and FSDP sharding on TACC supercomputing infrastructure."
    ],
    tools: ["PyTorch", "LoRA", "Federated learning", "Differential privacy", "FSDP", "TACC"]
  },
  {
    id: "uts",
    title: "Machine Learning and Data Engineering Intern",
    focus: "",
    org: "University of Texas System",
    place: "Austin, TX",
    dates: "06/2025 – 08/2025",
    bullets: [
      "Delivered real-time operational risk visibility to executives across 14 institutions by integrating 15+ ITSM data sources through REST APIs and Power Automate into Power BI.",
      "Eliminated 15+ hours of manual processing weekly and improved audit readiness 25% by automating compliance tracking and audit reporting pipelines.",
      "Identified $2M+ in federal AI grant opportunities by conducting a structured funding landscape analysis across federal grant databases, shaping system-wide AI investment priorities."
    ],
    tools: ["REST APIs", "Power Automate", "Power BI", "Compliance automation"]
  },
  {
    id: "dac",
    title: "Data Analytics Consultant",
    focus: "Strategic Decision Support",
    org: "University of Texas at El Paso, Graduate School",
    place: "El Paso, TX",
    dates: "05/2023 – 08/2024",
    bullets: [
      "Deployed student success forecasting models at 94% accuracy using ensemble and deep learning methods, equipping advisers with ranked at-risk cohorts early enough to intervene.",
      "Advised the Board of Regents and senior leadership on enrollment policy and multimillion-dollar capital decisions; institutional enrollment rose 15%.",
      "Cut ad-hoc reporting requests 40% by building self-service Power BI dashboards consolidating 10+ institutional KPIs."
    ],
    tools: ["Ensemble models", "Deep learning", "Power BI", "Executive advisory"]
  },
  {
    id: "att",
    title: "Technical Specialist",
    focus: "Quantitative Risk and Data Analytics",
    org: "AT&T Inc.",
    place: "Prague, Czech Republic",
    dates: "08/2018 – 12/2021",
    bullets: [
      "Lifted Net Promoter Score 20% and retained $1.2M in annual revenue by leading customer experience analytics that isolated and resolved systemic service failures.",
      "Directed a cross-functional team of 8 analysts deploying statistical process control across network operations, reducing service disruptions 15%.",
      "Built large-scale SQL extraction and transformation pipelines powering enterprise KPI tracking and executive reporting."
    ],
    tools: ["SQL", "Statistical process control", "Customer analytics", "Team leadership"]
  }
];

const PROJECTS = [
  {
    slug: "pharos-rx",
    title: "PHAROS-Rx",
    kind: "Case study",
    summary:
      "Retrieval-augmented synthesis over 215,063 patient drug reviews. Standard RAG skews toward whichever opinions retrieve best; PHAROS-Rx corrects that skew so summaries reflect what patients actually reported.",
    result: "Cuts retrieval-induced valence skew by 75% against plain RAG and passes all 42 safety probes.",
    figures: [
      ["215,063", "patient reviews indexed"],
      ["−75%", "valence skew vs RAG"],
      ["−43%", "cohort rating error"],
      ["42 / 42", "safety probes passed"]
    ],
    tags: ["LangGraph", "LangChain", "Hybrid retrieval", "Python"],
    pageLabel: "Read the case study",
    code: "https://github.com/ocansey/pharos-rx"
  },
  {
    slug: "drift-arena",
    title: "Drift Arena",
    kind: "Live demo",
    summary:
      "A live champion/challenger console for card-fraud detection: shadow scoring across 100% of traffic, PSI drift monitoring, adaptive traffic reallocation and McNemar-gated promotion.",
    result: "Reproduces a fraud model whose recall collapses from 97% to 25%, then shows the monitoring that catches and corrects it.",
    tags: ["MLOps", "Model monitoring", "Fraud detection"],
    pageLabel: "Open the live demo",
    code: "https://github.com/ocansey/drift-arena"
  },
  {
    slug: "label-budget",
    title: "The Label Budget",
    kind: "Live demo",
    summary:
      "How many labels must be bought before a supervised detector beats an unsupervised one? Isolation Forest, gradient boosting and RBF-SVM built from first principles in about 500 lines.",
    result: "Letting the unsupervised model choose which flows reach an analyst halves the label budget. 36 tests; runs entirely client-side.",
    tags: ["Anomaly detection", "Active learning", "No libraries"],
    pageLabel: "Open the live demo",
    code: "https://github.com/ocansey/label-budget"
  }
];

const PUBLICATIONS = [
  {
    year: 2026,
    title: "DP-FLogTinyLLM: Differentially Private Federated Log Anomaly Detection Using Tiny LLMs",
    authors: "Ocansey, I.T., Sen, T., & Bhattacharya, R.",
    venue: "Under review",
    status: "review"
  },
  {
    year: 2026,
    title: "AI-Driven Privacy-Preserving Techniques in US Healthcare Cybersecurity",
    authors: "Ocansey, I.T., & Yeboah, M.M.",
    venue: "Magna Scientia Advanced Research and Reviews",
    status: "published"
  },
  {
    year: 2026,
    title: "The Role of Artificial Intelligence in Reducing Financial Fraud in U.S. Healthcare Systems",
    authors: "Ntiakoh, A., Ocansey, I.T., & Amoakoh, C.",
    venue: "Magna Scientia Advanced Research and Reviews",
    status: "published"
  },
  {
    year: 2025,
    title: "LogTinyLLM: Contextual Log Anomaly Detection Using Tiny Large Language Models",
    authors: "Ocansey, I.T., Bhattacharya, R., & Sen, T.",
    venue: "Under review, IEEE Transactions on Neural Networks and Learning Systems",
    status: "review",
    link: PROFILE.links.arxiv,
    linkLabel: "arXiv:2507.11071"
  },
  {
    year: 2025,
    title: "Comparative Analysis of Hierarchical and K-Means Clustering Algorithms on Home Equity Loan Data",
    authors: "Ocansey, I.T.",
    venue: "Under review, Journal of Statistical Computation and Simulation",
    status: "review"
  }
];

const SKILLS = [
  {
    group: "Machine learning and AI",
    items: ["Machine Learning", "Deep Learning", "Large Language Models (LLMs)", "Natural Language Processing (NLP)", "Generative AI", "Anomaly Detection", "Predictive Modeling", "Federated Learning", "Model Compression", "LoRA Fine-Tuning", "Instruction Tuning", "Retrieval-Augmented Generation (RAG)"]
  },
  {
    group: "Statistics and quantitative methods",
    items: ["Statistical Inference", "Survival Analysis", "Time Series", "Hypothesis Testing", "Experimental Design", "Credit Risk Modeling", "Statistical Process Control"]
  },
  {
    group: "Programming and data engineering",
    items: ["Python", "SQL", "R", "Bash", "LaTeX", "PyTorch", "TensorFlow", "Keras", "Hugging Face Transformers", "Power BI", "Power Automate", "REST APIs"]
  },
  {
    group: "MLOps and infrastructure",
    items: ["MLOps", "Model Monitoring", "Distributed Training", "FSDP", "Mixed Precision", "Gradient Checkpointing", "AWS", "Microsoft Azure", "Azure ML", "Apache Spark", "Docker", "Git", "Linux", "Slurm/HPC (TACC)"]
  }
];

const EDUCATION = [
  {
    date: "05/2026",
    degree: "Ph.D., Data Science",
    school: "University of Texas at El Paso",
    detail: "Dissertation: Multi-Modal Anomaly Detection Using Deep Learning Techniques. Advisor: Dr. Ritwik Bhattacharya."
  },
  {
    date: "09/2017",
    degree: "M.S., Mathematics of Finance and Economics",
    school: "University of Silesia, Poland",
    detail: "Thesis: Affine Interest Rate Models: term structure, no-arbitrage bond pricing, yield curve dynamics."
  },
  {
    date: "09/2017",
    degree: "M.S., Engineering Mathematics",
    school: "University of L'Aquila, Italy",
    detail: ""
  },
  {
    date: "04/2015",
    degree: "B.S., Financial Mathematics",
    school: "University for Development Studies, Ghana",
    detail: ""
  }
];

const HONOURS = [
  "UTEP Graduate Research Fellowship: $75,000 total award, 2022–2026",
  "Member, American Statistical Association",
  "Affiliate, Texas Advanced Computing Center (TACC)",
  "AWS Certified Machine Learning Engineer (in progress)"
];

/* ===================================================================== */

/** A quiet log-like signal with one anomaly. Deterministic so it never jumps between renders. */
function useSignalPath(width = 1200, height = 120, spikeAt = 0.71) {
  return useMemo(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const n = 160;
    const mid = height * 0.62;
    const spikeIdx = Math.round(n * spikeAt);
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * width;
      let y = mid + Math.sin(i / 6) * 6 + (rnd() - 0.5) * 12;
      if (i === spikeIdx) y = 16;
      if (i === spikeIdx + 1) y = mid + 18;
      pts.push([x, y]);
    }
    const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    return { d, spike: pts[spikeIdx] };
  }, [width, height, spikeAt]);
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

function Nav() {
  const ids = useMemo(() => NAV.map(([id]) => id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav" aria-label="Main">
      <div className="wrap">
        <a className="brand" href="#top">Isaiah T. Ocansey<span>, Ph.D.</span></a>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <ul id="nav-links" className={`nav-links${open ? " open" : ""}`}>
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
        <a className="btn btn-brass" href={PROFILE.resume} download>Download résumé</a>
      </div>
    </nav>
  );
}

function Hero() {
  const { d, spike } = useSignalPath();
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div>
          <h1>{PROFILE.name}</h1>
          <p className="role">{PROFILE.title}</p>
          <p className="intro">
            Welcome, and thank you for stopping by. I build machine learning systems that notice when
            something is wrong, explain why, and hold up when the data shifts underneath them.
          </p>
          <p className="intro-2">
            My Ph.D. at the University of Texas at El Paso focused on anomaly detection with compact language
            models and privacy-preserving federated learning. Before research, I spent three years turning
            network data into decisions at AT&amp;T in Prague, and I have since advised university leadership
            and built executive risk reporting for the University of Texas System. If you are hiring, collaborating
            or just curious, I would be glad to hear from you.
          </p>
          <div className="hero-actions">
            <a className="btn btn-brass" href="#experience">See my experience</a>
            <a className="btn btn-line" href={PROFILE.resume} download>Download résumé (PDF)</a>
          </div>
          <ul className="profiles" aria-label="Profiles">
            <li><a href={PROFILE.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href={PROFILE.links.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
            <li><a href={PROFILE.links.researchgate} target="_blank" rel="noopener noreferrer">ResearchGate</a></li>
            <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
          </ul>
        </div>
        <figure className="portrait">
          <img src="Photo.png" alt="Portrait of Isaiah Thompson Ocansey" width="320" height="320" />
          <figcaption>{PROFILE.location}</figcaption>
        </figure>
      </div>
      <div className="wrap signal-wrap" aria-hidden="true">
        <svg className="signal" viewBox="0 0 1200 120">
          <path className="trace" d={d} />
          <g className="flag">
            <circle cx={spike[0]} cy={spike[1]} r="9" />
            <text x={spike[0] + 16} y={spike[1] + 5}>anomaly flagged</text>
          </g>
        </svg>
      </div>
    </header>
  );
}

function Facts() {
  return (
    <div className="facts">
      <div className="wrap">
        <ul>
          {FACTS.map(([n, l]) => (
            <li key={n}><b className="num">{n}</b><span>{l}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="block" id="about" aria-labelledby="about-h">
      <div className="wrap about">
        <div>
          <div className="head"><h2 id="about-h">About me</h2></div>
          <p>
            I am a data scientist with a Ph.D. in Data Science and a background in mathematics, finance and
            engineering mathematics from Ghana, Poland and Italy. The thread through my work is simple: find the
            signal that matters, measure it honestly, and put it in front of the people who decide.
          </p>
          <p>
            In research that has meant LogTinyLLM, a compact transformer that reaches 98.83% anomaly-detection
            accuracy at 70% lower compute than large-LLM baselines, and a federated pipeline that lets institutions
            learn from protected records without pooling them. In practice it has meant forecasting models advisers
            actually used, dashboards that cut reporting requests by 40%, and analytics that retained $1.2M in
            annual revenue.
          </p>
          <p>
            I care about work that is reproducible and explained, from the test suite to the limitations section.
          </p>
        </div>
        <ul className="places" aria-label="At a glance">
          <li><span>Based in</span><span>El Paso, Texas</span></li>
          <li><span>Focus</span><span>Anomaly detection, LLMs, federated learning, risk analytics</span></li>
          <li><span>Ph.D.</span><span>Data Science, UTEP, 05/2026</span></li>
          <li><span>Industry</span><span>AT&amp;T, University of Texas System</span></li>
          <li><span>Compute</span><span>Affiliate, Texas Advanced Computing Center</span></li>
          <li><span>Worked in</span><span>United States, Czech Republic, Poland, Italy, Ghana</span></li>
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  const [sel, setSel] = useState(EXPERIENCE[0].id);
  const role = EXPERIENCE.find((r) => r.id === sel);
  const onKey = (e, i) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = EXPERIENCE[(i + dir + EXPERIENCE.length) % EXPERIENCE.length];
    setSel(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };
  return (
    <section className="block alt" id="experience" aria-labelledby="xp-h">
      <div className="wrap">
        <div className="head">
          <h2 id="xp-h">Experience</h2>
          <p>Choose a role to see what I delivered there.</p>
        </div>
        <div className="xp">
          <ul className="xp-list" role="tablist" aria-orientation="vertical">
            {EXPERIENCE.map((r, i) => (
              <li key={r.id} role="presentation">
                <button
                  id={`tab-${r.id}`}
                  role="tab"
                  aria-selected={sel === r.id}
                  aria-controls="xp-panel"
                  tabIndex={sel === r.id ? 0 : -1}
                  onClick={() => setSel(r.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="t">{r.title}</span>
                  <span className="o">{r.org.split(",")[0]}</span>
                  <span className="d num">{r.dates}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="xp-panel" id="xp-panel" role="tabpanel" aria-labelledby={`tab-${role.id}`}>
            <h3>{role.title}{role.focus ? `, ${role.focus}` : ""}</h3>
            <p className="meta">{role.org} <br />{role.place}, <span className="num">{role.dates}</span></p>
            <ul>
              {role.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="tags"><Tags items={role.tools} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [lead, ...rest] = PROJECTS;
  return (
    <section className="block" id="projects" aria-labelledby="pr-h">
      <div className="wrap">
        <div className="head">
          <h2 id="pr-h">Projects</h2>
          <p>Each one runs on this site. Open the demo, read the method, or check the code on GitHub.</p>
        </div>
        <div className="projects">
          <article className="project lead">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="kind">{lead.kind}</span>
              <h3>{lead.title}</h3>
              <p>{lead.summary}</p>
              <p className="result">{lead.result}</p>
              <Tags items={lead.tags} />
              <div className="links">
                <a className="btn btn-brass" href={`projects/${lead.slug}/`}>{lead.pageLabel}</a>
                <a className="btn btn-ink" href={lead.code} target="_blank" rel="noopener noreferrer">View code on GitHub</a>
              </div>
            </div>
            <div className="lead-figures">
              {lead.figures.map(([n, l]) => (
                <div key={l}><b className="num">{n}</b><span>{l}</span></div>
              ))}
            </div>
          </article>
          {rest.map((p) => (
            <article className="project" key={p.slug} style={{ gridColumn: "span 1" }}>
              <span className="kind">{p.kind}</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <p className="result">{p.result}</p>
              <Tags items={p.tags} />
              <div className="links">
                <a className="btn btn-brass" href={`projects/${p.slug}/`}>{p.pageLabel}</a>
                <a className="btn btn-ink" href={p.code} target="_blank" rel="noopener noreferrer">Code</a>
              </div>
            </article>
          ))}
          <article className="project" style={{ justifyContent: "center", background: "transparent", borderStyle: "dashed" }}>
            <h3>More on GitHub</h3>
            <p>Research code, experiments and smaller tools live on my GitHub profile.</p>
            <div className="links">
              <a className="btn btn-ink" href={PROFILE.links.github} target="_blank" rel="noopener noreferrer">github.com/ocansey</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Research() {
  const [filter, setFilter] = useState("all");
  const shown = PUBLICATIONS.filter((p) => filter === "all" || p.status === filter);
  const count = (s) => PUBLICATIONS.filter((p) => s === "all" || p.status === s).length;
  const opts = [["all", "All"], ["published", "Published"], ["review", "Under review"]];
  return (
    <section className="block alt" id="research" aria-labelledby="rs-h">
      <div className="wrap">
        <div className="head">
          <h2 id="rs-h">Research and publications</h2>
          <p>Selected work on anomaly detection, private learning and AI in healthcare. The complete record of 10 publications is on Google Scholar.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter publications">
          {opts.map(([k, l]) => (
            <button key={k} aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {l} <span className="num">({count(k)})</span>
            </button>
          ))}
        </div>
        <ul className="pubs" aria-live="polite">
          {shown.map((p) => (
            <li className="pub" key={p.title}>
              <span className="yr num">{p.year}</span>
              <div>
                <p className="ti">{p.title}</p>
                <p className="au">{p.authors}</p>
                <p className="ve">
                  {p.venue}
                  {p.link && <>. <a href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel}</a></>}
                </p>
              </div>
              <span className={`status ${p.status === "review" ? "review" : "pub-ok"}`}>
                {p.status === "review" ? "Under review" : "Published"}
              </span>
            </li>
          ))}
        </ul>
        <p className="scholar">
          Full list: <a href={PROFILE.links.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a> and{" "}
          <a href={PROFILE.links.researchgate} target="_blank" rel="noopener noreferrer">ResearchGate</a>.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="block" id="skills" aria-labelledby="sk-h">
      <div className="wrap">
        <div className="head">
          <h2 id="sk-h">Skills</h2>
          <p>Grouped the same way as on my résumé.</p>
        </div>
        <div className="skills">
          {SKILLS.map((s) => (
            <div className="skill" key={s.group}>
              <h3>{s.group}</h3>
              <Tags items={s.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="block alt" id="education" aria-labelledby="ed-h">
      <div className="wrap edu">
        <div>
          <div className="head"><h2 id="ed-h">Education</h2></div>
          <ol className="degrees">
            {EDUCATION.map((e) => (
              <li key={e.degree}>
                <span className="yr num">{e.date}</span>
                <div>
                  <h3>{e.degree}</h3>
                  <p>{e.school}</p>
                  {e.detail && <p>{e.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="honours" aria-labelledby="ho-h">
          <h3 id="ho-h">Awards and honors</h3>
          <ul>
            {HONOURS.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    ["Email", PROFILE.email, `mailto:${PROFILE.email}`],
    ["LinkedIn", "linkedin.com/in/itor", PROFILE.links.linkedin],
    ["GitHub", "github.com/ocansey", PROFILE.links.github],
    ["ResearchGate", "Isaiah Thompson Ocansey", PROFILE.links.researchgate]
  ];
  return (
    <section className="contact" id="contact" aria-labelledby="ct-h">
      <div className="wrap">
        <h2 id="ct-h">Let's talk</h2>
        <p>
          I am open to data scientist and machine learning engineer roles, and to research collaborations.
          Email is the fastest way to reach me.
        </p>
        <div className="contact-grid">
          {items.map(([k, v, href]) => (
            <a key={k} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              <small>{k}</small>{v}
            </a>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 28, marginBottom: 0 }}>
          <a className="btn btn-brass" href={PROFILE.resume} download>Download résumé (PDF)</a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav />
      <Hero />
      <Facts />
      <main>
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Education />
      </main>
      <Contact />
      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Isaiah Thompson Ocansey</span>
          <span>{PROFILE.location}</span>
        </div>
      </footer>
    </>
  );
}
