import { useEffect, useMemo, useState } from "react";

/* =====================================================================
   Single source of truth: Résumé (October 2026, SMU postdoc version).
   Every figure below is copied from the résumé. Edit here, not in the JSX.
   ===================================================================== */

const PROFILE = {
  name: "Isaiah Thompson Ocansey, Ph.D.",
  title: "Postdoctoral Fellow, Machine Learning and Applied Research",
  org: "O'Donnell Data Science and Research Computing Institute, Southern Methodist University",
  location: "Dallas, TX",
  email: "ocanthom@gmail.com",
  resume: "Isaiah_Thompson_Ocansey_Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/itor/",
    github: "https://github.com/ocansey",
    scholar: "https://scholar.google.com/citations?user=pen_i60AAAAJ&hl=en",
    researchgate: "https://www.researchgate.net/profile/Isaiah-Thompson-Ocansey-3",
    arxiv: "https://arxiv.org/abs/2507.11071",
    arxivDp: "https://arxiv.org/abs/2604.19118"
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
  ["7+ years", "building predictive models, anomaly detection and analytics"],
  ["98.83%", "LogTinyLLM accuracy, updating fewer than 0.05% of parameters"],
  ["98.76%", "DP-FLogTinyLLM accuracy without centralizing client data"],
  ["$1.2M", "annual revenue retention supported at AT&T"]
];

const EXPERIENCE = [
  {
    id: "smu",
    title: "Postdoctoral Fellow",
    focus: "Artificial Intelligence and Machine Learning",
    org: "O'Donnell Data Science and Research Computing Institute (ODSRCI), Southern Methodist University",
    short: "Southern Methodist University",
    place: "Dallas, TX",
    dates: "Oct 2026 – Present",
    bullets: [
      "Conduct applied research at the intersection of AI/ML and high-performance computing, focusing on resource-efficient AI, scalable distributed computing, and edge systems.",
      "Design and evaluate machine learning approaches to estimate and optimize resource-efficiency parameters under complex, real-world conditions.",
      "Collaborate with interdisciplinary researchers on institute initiatives using NVIDIA SuperPOD and campus HPC infrastructure, and mentor students."
    ],
    tools: ["Resource-efficient AI", "Distributed computing", "Edge systems", "NVIDIA SuperPOD", "HPC"]
  },
  {
    id: "gra",
    title: "Graduate Research Assistant",
    focus: "Machine Learning and Quantitative Modeling",
    org: "University of Texas at El Paso, Department of Mathematical Sciences",
    short: "University of Texas at El Paso",
    place: "El Paso, TX",
    dates: "Jan 2022 – Dec 2025",
    bullets: [
      "Developed LogTinyLLM using LoRA fine-tuning of compact language models for contextual log anomaly detection; reported 98.83% accuracy versus 79.37% for a fully fine-tuned LogBERT baseline while updating fewer than 0.05% of parameters. First-author paper under review at IEEE Transactions on Neural Networks and Learning Systems (TNNLS).",
      "Developed DP-FLogTinyLLM, a cross-silo federated learning framework with differential privacy that achieved 98.76% accuracy without centralizing client data. First-author paper under review.",
      "Implemented distributed PyTorch training with mixed precision and FSDP on TACC supercomputers; mentored three undergraduate researchers whose work was presented publicly."
    ],
    tools: ["PyTorch", "LoRA", "Federated learning", "Differential privacy", "FSDP", "TACC"]
  },
  {
    id: "uts",
    title: "Information Technology Intern",
    focus: "Machine Learning and Data Engineering",
    org: "University of Texas System",
    short: "University of Texas System",
    place: "Austin, TX",
    dates: "Jun 2025 – Aug 2025",
    bullets: [
      "Integrated 15+ IT service management (ITSM) sources across 14 institutions through REST APIs and Power Automate into Power BI reporting, improving operational-risk visibility and reducing project risk exposure by 30%.",
      "Automated compliance reporting pipelines, saving 15+ hours of manual reporting each week and improving audit readiness by 25%.",
      "Researched federal AI funding opportunities and identified more than $2M in potential grant opportunities."
    ],
    tools: ["REST APIs", "Power Automate", "Power BI", "Compliance automation"]
  },
  {
    id: "dac",
    title: "Data Analytics Consultant",
    focus: "Strategic Decision Support",
    org: "University of Texas at El Paso, Graduate School",
    short: "UTEP Graduate School",
    place: "El Paso, TX",
    dates: "May 2023 – Aug 2024",
    bullets: [
      "Built student-success forecasting models with 94% accuracy and provided analysis for Board of Regents enrollment-policy discussions, contributing to a reported 15% institutional enrollment increase.",
      "Created self-service Power BI dashboards consolidating 10+ institutional KPIs, reducing ad hoc reporting by 40%."
    ],
    tools: ["Forecasting", "Power BI", "Executive advisory"]
  },
  {
    id: "att",
    title: "Technical Specialist",
    focus: "Quantitative Risk and Data Analytics",
    org: "AT&T Inc.",
    short: "AT&T Inc.",
    place: "Prague, Czech Republic",
    dates: "Aug 2018 – Dec 2021",
    bullets: [
      "Led customer-experience analytics that identified systemic service failures, supporting $1.2M in annual revenue retention and a 20% increase in Net Promoter Score.",
      "Led a team of eight analysts applying statistical process control across 500+ cell sites; reduced service disruptions by 15% and improved uptime/latency metrics by 18%."
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
      "A champion/challenger fraud-model monitoring workflow using Population Stability Index (PSI) drift detection and McNemar-test-gated promotion.",
    result: "Reproduces recall degradation from 97% to 25% under an unseen attack profile, then shows the monitoring that catches it.",
    tags: ["Model monitoring", "Drift detection", "Fraud detection"],
    pageLabel: "Open the live demo",
    code: "https://github.com/ocansey/drift-arena"
  },
  {
    slug: "label-budget",
    title: "The Label Budget",
    kind: "Live demo",
    summary:
      "Isolation Forest, HistGradientBoosting and RBF-SVM approaches implemented from scratch to study unsupervised-guided sampling.",
    result: "Demonstrates a path to cut labeled-data requirements by half. Runs entirely in your browser.",
    tags: ["Anomaly detection", "Active learning", "From scratch"],
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
    status: "review",
    link: PROFILE.links.arxivDp,
    linkLabel: "arXiv:2604.19118"
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
    title: "LogTinyLLM: Tiny Large Language Models Based Contextual Log Anomaly Detection",
    authors: "Ocansey, I.T., Bhattacharya, R., & Sen, T.",
    venue: "IEEE Transactions on Neural Networks and Learning Systems (under review)",
    status: "review",
    link: PROFILE.links.arxiv,
    linkLabel: "arXiv:2507.11071"
  },
  {
    year: 2025,
    title: "Comparative Analysis of Hierarchical and K-Means Clustering Algorithms on Home Equity Loan Data",
    authors: "Ocansey, I.T.",
    venue: "Journal of Statistical Computation and Simulation (under review)",
    status: "review"
  }
];

const SKILLS = [
  {
    group: "Machine learning and AI",
    items: ["Predictive modeling", "Classification", "Deep learning", "Compact LLMs", "Transformers", "NLP", "Anomaly detection", "Feature engineering", "LoRA/parameter-efficient fine-tuning", "Federated learning", "Differential privacy", "Model compression"]
  },
  {
    group: "Programming and data",
    items: ["Python", "SQL", "R", "Bash", "Data mining", "Data cleaning", "pandas", "NumPy", "scikit-learn", "XGBoost", "PyTorch", "TensorFlow", "Hugging Face Transformers"]
  },
  {
    group: "Statistics and experimentation",
    items: ["Statistical inference", "Hypothesis testing", "A/B testing", "Experimental design", "Survival analysis", "Time series", "Statistical process control"]
  },
  {
    group: "ML engineering and infrastructure",
    items: ["Model monitoring", "Drift detection", "Distributed training", "FSDP", "Mixed precision", "Docker", "Git", "CI/CD", "Linux", "Slurm", "GPU computing", "HPC"]
  },
  {
    group: "Cloud and analytics",
    items: ["AWS", "Microsoft Azure", "Azure ML", "Apache Spark", "REST APIs", "ETL pipelines", "Power BI", "Tableau"]
  }
];

const EDUCATION = [
  {
    date: "May 2026",
    degree: "Ph.D., Data Science",
    school: "University of Texas at El Paso",
    detail: "Dissertation: “Multi-Modal Anomaly Detection Using Deep Learning Techniques.” Advisor: Dr. Ritwik Bhattacharya."
  },
  {
    date: "2017",
    degree: "M.Sc., Mathematics of Finance and Economics",
    school: "University of Silesia, Poland",
    detail: "Thesis: Affine Interest Rate Models."
  },
  {
    date: "2017",
    degree: "M.Sc., Engineering Mathematics",
    school: "University of L’Aquila, Italy",
    detail: ""
  },
  {
    date: "2015",
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
          <p className="org">{PROFILE.org}</p>
          <p className="intro">
            Welcome, and thank you for stopping by. I build machine learning systems that notice when
            something is wrong, explain why, and hold up when the data shifts underneath them.
          </p>
          <p className="intro-2">
            I am a Postdoctoral Fellow in Artificial Intelligence and Machine Learning at Southern Methodist
            University's O'Donnell Data Science and Research Computing Institute in Dallas, working on
            resource-efficient AI, scalable distributed computing and edge systems. My Ph.D. at the University of
            Texas at El Paso produced LogTinyLLM and its privacy-preserving federated successor, and before research
            I spent three years in quantitative risk analytics at AT&amp;T in Prague. Whether you are hiring,
            looking to collaborate or just curious, I would be glad to hear from you.
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
            I am an applied machine learning researcher with 7+ years of experience developing predictive models,
            anomaly-detection methods and analytics workflows across research, business and quantitative-risk
            settings. My training is in data science, financial mathematics and engineering mathematics, earned in
            Ghana, Poland, Italy and Texas. The thread through my work is simple: find the signal that matters,
            measure it honestly, and put it in front of the people who decide.
          </p>
          <p>
            In research that has meant LogTinyLLM, which reported 98.83% accuracy on log anomaly detection while
            updating fewer than 0.05% of model parameters, and DP-FLogTinyLLM, which reached 98.76% without
            centralizing client data. In practice it has meant forecasting models with 94% accuracy, dashboards that
            reduced ad hoc reporting by 40%, and analytics that supported $1.2M in annual revenue retention.
          </p>
          <p>
            I care about work that is reproducible and explained, from the test suite to the limitations section.
          </p>
        </div>
        <ul className="places" aria-label="At a glance">
          <li><span>Now</span><span>Postdoctoral Fellow, SMU O'Donnell Institute</span></li>
          <li><span>Based in</span><span>Dallas, Texas</span></li>
          <li><span>Focus</span><span>Resource-efficient AI, anomaly detection, compact LLMs, federated learning</span></li>
          <li><span>Ph.D.</span><span>Data Science, UTEP, May 2026</span></li>
          <li><span>Industry</span><span>AT&amp;T, University of Texas System</span></li>
          <li><span>Compute</span><span>NVIDIA SuperPOD, TACC supercomputers</span></li>
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
                  <span className="o">{r.short}</span>
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
          <p>Selected work on anomaly detection, private learning and AI in healthcare. The complete record is on Google Scholar.</p>
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
          I welcome conversations about data science and machine learning roles, applied research and collaborations.
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
