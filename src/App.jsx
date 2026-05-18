import { useState, useEffect, useRef } from "react";

/* ─── data ─── */
const portfolio = {
  name: "Subrat Tripathi",
  title: "Data Analyst & AI Enthusiast",
  company: "MKT Softwares Pvt. Ltd.",
  location: "India",
  email: "subratcodes9@gmail.com",
  linkedin: "https://www.linkedin.com/in/subrattripathi",
  summary:
    "Data Analyst and Data Scientist enthusiast with experience in Python, SQL, Power BI, and machine learning for data analysis, dashboard reporting, and predictive modeling. Skilled in DAX, ETL pipelines, KPI tracking, data visualization, and RAG-based AI applications using LangChain and Streamlit.",
  skills: [
    "Python",
    "SQL",
    "Power BI",
    "Machine Learning",
    "LangChain",
    "LangGraph",
    "Streamlit",
    "DAX",
    "ETL Pipelines",
    "Data Visualization",
    "TensorFlow",
    "Scikit-learn",
    "FAISS",
    "Tableau",
    "Pandas & NumPy",
  ],
  experience: [
    {
      company: "MKT Softwares Pvt. Ltd.",
      role: "Data Analyst Intern",
      period: "June 2025 – August 2025",
      duration: "3 months",
      location: "India",
    },
  ],
  education: [
    {
      institution: "Chandigarh University, Mohali",
      degree: "Master of Computer Applications (MCA)",
      period: "2022 – 2024",
    },
    {
      institution: "Kanpur University, Kanpur",
      degree: "Bachelor of Science (B.Sc.)",
      period: "2018 – 2021",
    },
  ],
  certifications: [
    {
      title: "PG Diploma in Data Science",
      issuer: "Imarticus Learning",
      date: "Ongoing",
      tags: ["Data Science", "Machine Learning", "Python", "Statistics"],
      description:
        "Comprehensive postgraduate diploma covering the full data science lifecycle — statistical foundations, machine learning algorithms, deep learning, and real-world project workflows using Python and industry tools.",
    },
    {
      title: "Data Analyst Certification",
      issuer: "MKT Softwares, Kanpur",
      date: "2025",
      tags: ["Power BI", "SQL", "DAX", "Data Analysis"],
      description:
        "Industry certification validating hands-on proficiency in data analysis, dashboard reporting with Power BI, SQL-based data pipelines, and KPI tracking for business decision-making.",
    },
  ],
};

/* ─── hooks ─── */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const h = (e) => setMatches(e.matches);
    mql.addEventListener("change", h);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", h);
  }, [query]);
  return matches;
}

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>{children}</div>
  );
}

function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let s = 0; const step = target / 40;
        const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(s)); }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── nav items ─── */
const NAV = [
  { id: "home", icon: "⌂" },
  { id: "about", icon: "◐" },
  { id: "experience", icon: "✦" },
  { id: "education", icon: "◇" },
  { id: "skills", icon: "◈" },
  { id: "certifications", icon: "★" },
  { id: "contact", icon: "✉" },
];

/* ════════════════════ MAIN ════════════════════ */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCert, setExpandedCert] = useState(null);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = !isTablet;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { if (!isMobile) setDrawerOpen(false); }, [isMobile]);

  const navTo = (id) => {
    setActiveNav(id);
    setDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cardPad = isMobile ? "18px 16px" : "24px 28px";

  /* ─── Section Heading ─── */
  const SH = ({ title, centered }) => (
    <RevealSection>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        marginBottom: isMobile ? 28 : 40,
        justifyContent: centered ? "center" : "flex-start",
      }}>
        <div style={{ width: 38, height: 1.5, background: "#c8a96e" }} />
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isMobile ? 26 : isDesktop ? 36 : 30,
          color: "#f0ede8", fontWeight: 700,
        }}>{title}</h2>
        {centered && <div style={{ width: 38, height: 1.5, background: "#c8a96e" }} />}
      </div>
    </RevealSection>
  );

  return (
    <div style={{ background: "#0a0a0f", color: "#e8e6e1", fontFamily: "'Georgia', serif", minHeight: "100vh",minWidth :"100vw", overflowX: "hidden" }}>

      {/* ──── globals ──── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        ::selection{background:#c8a96e33;color:#c8a96e}
        html{scroll-behavior:smooth}
        a{color:inherit;text-decoration:none}
        body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:999;
          background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:.4}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0a0a0f}
        ::-webkit-scrollbar-thumb{background:#c8a96e44;border-radius:2px}
        .cert-card{transition:all .3s ease;cursor:pointer}.cert-card:hover{border-color:#c8a96e88!important;transform:translateY(-3px)}
        .cert-card.expanded{border-color:#c8a96e66!important;background:#c8a96e0a!important}
        .skill-tag{transition:all .3s ease}.skill-tag:hover{background:#c8a96e22!important;border-color:#c8a96e88!important}
        .exp-card{transition:all .35s ease}.exp-card:hover{border-left-color:#c8a96e!important;background:#c8a96e08!important}
        .nav-pill{transition:color .3s ease}.nav-pill:hover{color:#c8a96e!important}
        .bnav-btn{transition:color .25s ease}.bnav-btn:hover{color:#c8a96e!important}
        .sidebar-link{transition:color .25s, padding-left .25s}.sidebar-link:hover{color:#c8a96e!important;padding-left:6px!important}
        .cert-desc{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.22,1,.36,1), opacity .3s ease;opacity:0}
        .cert-desc.open{max-height:200px;opacity:1}
        .cert-toggle{transition:transform .3s ease}
        .cert-toggle.rotated{transform:rotate(180deg)}
        @keyframes pulse{0%,100%{opacity:.25}50%{opacity:1}}
      `}</style>

      {/* ════════ DESKTOP TOP NAV ════════ */}
      {!isMobile && (
        <nav style={{
          position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)", zIndex: 100,
          display: "flex", gap: 3, padding: "5px 10px", borderRadius: 40,
          background: scrolled ? "rgba(10,10,15,0.88)" : "rgba(10,10,15,0.45)",
          backdropFilter: "blur(18px)", border: "1px solid rgba(200,169,110,0.15)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none", transition: "all .4s ease",
        }}>
          {NAV.map(({ id }) => (
            <button key={id} className="nav-pill" onClick={() => navTo(id)} style={{
              background: activeNav === id ? "#c8a96e1a" : "transparent",
              border: activeNav === id ? "1px solid #c8a96e55" : "1px solid transparent",
              color: activeNav === id ? "#c8a96e" : "#777",
              padding: isTablet ? "5px 9px" : "6px 14px", borderRadius: 20, cursor: "pointer",
              fontSize: isTablet ? 10.5 : 12, fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: .5, textTransform: "capitalize",
            }}>{id}</button>
          ))}
        </nav>
      )}

      {/* ════════ MOBILE HAMBURGER + DRAWER ════════ */}
      {isMobile && (
        <>
          <button onClick={() => setDrawerOpen(o => !o)} style={{
            position: "fixed", top: 4, right: 16, zIndex: 200,
            background: "rgba(10,10,15,0.6)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,169,110,0.25)", borderRadius: 12,
            width: 44, height: 44, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: drawerOpen ? 0 : 5, cursor: "pointer", transition: "gap .25s",
          }}>
            <span style={{ display:"block", width:22, height:2, background:"#c8a96e", borderRadius:2, transform: drawerOpen ? "rotate(45deg) translate(3px,3px)" : "none", transition:"transform .3s" }} />
            <span style={{ display:"block", width:22, height:2, background:"#c8a96e", borderRadius:2, opacity: drawerOpen ? 0 : 1, transition:"opacity .2s" }} />
            <span style={{ display:"block", width:22, height:2, background:"#c8a96e", borderRadius:2, transform: drawerOpen ? "rotate(-45deg) translate(3px,-3px)" : "none", transition:"transform .3s" }} />
          </button>
          {drawerOpen && <div onClick={() => setDrawerOpen(false)} style={{ position:"fixed", inset:0, zIndex:150, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)" }} />}
          <div style={{
            position:"fixed", top:0, left:0, right:0, zIndex:160,
            background:"rgba(12,12,18,0.96)", backdropFilter:"blur(20px)",
            borderBottom:"1px solid rgba(200,169,110,0.18)",
            padding:"68px 22px 20px",
            transform: drawerOpen ? "translateY(0)" : "translateY(-100%)",
            opacity: drawerOpen ? 1 : 0,
            transition:"transform .35s cubic-bezier(.22,1,.36,1), opacity .3s ease",
            display:"flex", flexDirection:"column", gap:3,
          }}>
            {NAV.map(({ id, icon }) => (
              <button key={id} onClick={() => navTo(id)} style={{
                background: activeNav === id ? "#c8a96e12" : "transparent",
                border:"none", borderRadius:10, color: activeNav === id ? "#c8a96e" : "#8a8580",
                padding:"13px 16px", cursor:"pointer", textAlign:"left",
                display:"flex", alignItems:"center", gap:14,
                fontFamily:"'JetBrains Mono', monospace", fontSize:14,
                letterSpacing:.6, textTransform:"capitalize", transition:"background .2s, color .2s",
              }}>
                <span style={{ fontSize:17, opacity:.7 }}>{icon}</span>{id}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ════════════════ HERO ════════════════ */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: isMobile ? "100px 20px 100px" : "120px 40px 80px",
        position: "relative", width: "100%",
      }}>
        <div style={{ position:"absolute", top:"28%", left:"50%", transform:"translate(-50%,-50%)", width: isMobile?300:700, height: isMobile?300:700, borderRadius:"50%", background:"radial-gradient(circle,#c8a96e10 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"65%", left: isMobile?"8%":"15%", width: isMobile?160:380, height: isMobile?160:380, borderRadius:"50%", background:"radial-gradient(circle,#4a90d918 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", right: isMobile?"5%":"12%", width: isMobile?120:260, height: isMobile?120:260, borderRadius:"50%", background:"radial-gradient(circle,#c8a96e0c 0%,transparent 70%)", pointerEvents:"none" }} />

        <div style={{
          width: isMobile?76:104, height: isMobile?76:104, borderRadius:"50%", marginBottom:28,
          background:"linear-gradient(135deg,#c8a96e,#a07840)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize: isMobile?25:34, fontWeight:700, color:"#0a0a0f",
          fontFamily:"'Playfair Display', serif", boxShadow:"0 0 44px #c8a96e30",
        }}>ST</div>

        <h1 style={{
          fontFamily:"'Playfair Display', serif",
          fontSize: isMobile ? 27 : isDesktop ? 72 : 44,
          fontWeight:700, letterSpacing: isDesktop ? -1.5 : -.5, lineHeight:1.12,
          color:"#f0ede8", marginBottom:12,
        }}>{portfolio.name}</h1>

        <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize: isMobile?10.5: isDesktop?15:13, color:"#c8a96e", letterSpacing: isMobile?2:3.5, textTransform:"uppercase", marginBottom:6 }}>
          {portfolio.title}
        </p>
        <p style={{ color:"#555", fontSize: isMobile?11: isDesktop?15:13, fontFamily:"'JetBrains Mono', monospace", marginBottom: isMobile?28:44 }}>
          {portfolio.company} · {portfolio.location}
        </p>

        <div style={{ display:"flex", gap: isMobile?24: isDesktop?64:40, marginBottom: isMobile?32: isDesktop?52:40, flexWrap:"wrap", justifyContent:"center" }}>
          {[{label:"Years Experience",value:1},{label:"Projects Built",value:3},{label:"Certifications",value:2}].map(s=>(
            <div key={s.label} style={{ textAlign:"center", minWidth: isMobile?68:100 }}>
              <div style={{ fontSize: isMobile?21: isDesktop?34:26, fontFamily:"'Playfair Display', serif", color:"#c8a96e", fontWeight:700 }}>
                <AnimatedNumber target={s.value} suffix="+" />
              </div>
              <div style={{ fontSize: isMobile?8.5: isDesktop?11:10, color:"#555", fontFamily:"'JetBrains Mono', monospace", letterSpacing:1.2, textTransform:"uppercase", marginTop:5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap: isMobile?10:14, flexWrap:"wrap", justifyContent:"center" }}>
          <a href={portfolio.linkedin} target="_blank" rel="noreferrer" style={{
            padding: isMobile?"9px 20px": isDesktop?"12px 32px":"10px 26px", borderRadius:26,
            border:"1px solid #c8a96e66", color:"#c8a96e",
            fontFamily:"'JetBrains Mono', monospace", fontSize: isMobile?11.5: isDesktop?14:12.5,
            background:"transparent", cursor:"pointer", transition:"all .3s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="#c8a96e18";e.currentTarget.style.borderColor="#c8a96e"}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#c8a96e66"}}
          >LinkedIn ↗</a>
          <button onClick={()=>navTo("contact")} style={{
            padding: isMobile?"9px 20px": isDesktop?"12px 32px":"10px 26px", borderRadius:26, border:"none",
            background:"linear-gradient(135deg,#c8a96e,#a07840)", color:"#0a0a0f",
            fontFamily:"'JetBrains Mono', monospace", fontSize: isMobile?11.5: isDesktop?14:12.5, fontWeight:500, cursor:"pointer",
          }}>Contact Me</button>
        </div>

        <div style={{ position:"absolute", bottom: isMobile?88:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:5, color:"#3d3d3d", fontSize:9, fontFamily:"'JetBrains Mono', monospace", letterSpacing:2, textTransform:"uppercase" }}>
          <span>Scroll</span>
          <div style={{ width:1, height:28, background:"linear-gradient(to bottom,#c8a96e,transparent)", animation:"pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
           DESKTOP: sidebar + main  |  TABLET/MOBILE: single column
         ════════════════════════════════════════════════════════════ */}
      <div style={{ display: isDesktop ? "flex" : "block", width: "100%" }}>

        {/* ─── STICKY SIDEBAR (desktop only) ─── */}
        {isDesktop && (
          <aside style={{
            width: 300, flexShrink: 0,
            position: "sticky", top: 0, height: "100vh",
            padding: "100px 28px 40px 48px",
            display: "flex", flexDirection: "column", gap: 30,
            borderRight: "1px solid rgba(200,169,110,0.08)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{
                width:48, height:48, borderRadius:"50%", flexShrink:0,
                background:"linear-gradient(135deg,#c8a96e,#a07840)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:17, fontWeight:700, color:"#0a0a0f", fontFamily:"'Playfair Display', serif",
                boxShadow:"0 0 18px #c8a96e25",
              }}>ST</div>
              <div>
                <p style={{ fontFamily:"'Playfair Display', serif", fontSize:15, color:"#f0ede8", fontWeight:700, lineHeight:1.3 }}>{portfolio.name}</p>
                <p style={{ fontSize:11, color:"#c8a96e", fontFamily:"'JetBrains Mono', monospace", letterSpacing:1.5, textTransform:"uppercase", marginTop:2 }}>{portfolio.title}</p>
              </div>
            </div>

            <div style={{ width:"100%", height:1, background:"linear-gradient(90deg, #c8a96e30, transparent)" }} />

            <div>
              <p style={{ fontSize:9.5, color:"#444", fontFamily:"'JetBrains Mono', monospace", letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Skills</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {portfolio.skills.map((s,i)=>(
                  <span key={i} className="skill-tag" style={{
                    padding:"5px 11px", borderRadius:14,
                    border:"1px solid #c8a96e25", background:"#c8a96e06",
                    color:"#c8a96e", fontSize:11, fontFamily:"'JetBrains Mono', monospace", cursor:"default",
                  }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={{ width:"100%", height:1, background:"linear-gradient(90deg, #c8a96e30, transparent)" }} />

            <div>
              <p style={{ fontSize:9.5, color:"#444", fontFamily:"'JetBrains Mono', monospace", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>Contact</p>
              <a href={`mailto:${portfolio.email}`} className="sidebar-link" style={{ display:"block", fontSize:12, color:"#9a9590", fontFamily:"'JetBrains Mono', monospace", marginBottom:10, paddingLeft:0, cursor:"pointer" }}>
                ✉ {portfolio.email}
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="sidebar-link" style={{ display:"block", fontSize:12, color:"#9a9590", fontFamily:"'JetBrains Mono', monospace", paddingLeft:0, cursor:"pointer" }}>
                ↗ LinkedIn
              </a>
            </div>

            <div style={{ marginTop:"auto" }}>
              <p style={{ fontSize:10, color:"#2a2a2a", fontFamily:"'JetBrains Mono', monospace" }}>© 2026 Subrat Tripathi</p>
            </div>
          </aside>
        )}

        {/* ─── MAIN CONTENT ─── */}
        <main style={{ flex: 1, minWidth: 0, padding: isDesktop ? "80px 60px 80px 56px" : "0" }}>

          {/* ABOUT */}
          <section id="about" style={{ padding: isMobile ? "64px 18px" : isDesktop ? "0 0 72px" : "80px 28px" }}>
            <SH title="About" />
            <RevealSection delay={120}>
              <p style={{ fontSize: isMobile?15: isDesktop?18:16, lineHeight:1.9, color:"#9a9590", fontFamily:"'Georgia', serif", maxWidth: isDesktop?1600:undefined }}>
                {portfolio.summary}
              </p>
              {!isDesktop && (
                <div style={{ marginTop:26, paddingTop:20, borderTop:"1px solid #c8a96e15", display:"flex", gap: isMobile?20:40, flexWrap:"wrap" }}>
                  <div>
                    <p style={{ fontSize:9.5, color:"#555", fontFamily:"'JetBrains Mono', monospace", letterSpacing:2, textTransform:"uppercase", marginBottom:5 }}>Email</p>
                    <a href={`mailto:${portfolio.email}`} style={{ color:"#c8a96e", fontSize: isMobile?11.5:13, fontFamily:"'JetBrains Mono', monospace", wordBreak:"break-all" }}>{portfolio.email}</a>
                  </div>
                  <div>
                    <p style={{ fontSize:9.5, color:"#555", fontFamily:"'JetBrains Mono', monospace", letterSpacing:2, textTransform:"uppercase", marginBottom:5 }}>Location</p>
                    <p style={{ color:"#9a9590", fontSize: isMobile?11.5:13, fontFamily:"'JetBrains Mono', monospace" }}>{portfolio.location}</p>
                  </div>
                </div>
              )}
            </RevealSection>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ padding: isMobile ? "64px 18px" : isDesktop ? "0 0 72px" : "80px 28px" }}>
            <SH title="Experience" />
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {portfolio.experience.map((exp,i)=>(
                <RevealSection key={i} delay={i*100}>
                  <div className="exp-card" style={{ padding:cardPad, borderRadius:14, border:"1px solid #c8a96e15", borderLeft:"3px solid #c8a96e33", background:"#c8a96e04", cursor:"default" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile?17: isDesktop?22:19, color:"#f0ede8", marginBottom:4 }}>{exp.role}</h3>
                        <p style={{ color:"#c8a96e", fontSize: isMobile?12: isDesktop?15:13, fontFamily:"'JetBrains Mono', monospace", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{exp.company}</p>
                      </div>
                      <span style={{ fontSize:11.5, color:"#555", fontFamily:"'JetBrains Mono', monospace", background:"#c8a96e0a", padding:"4px 12px", borderRadius:12, flexShrink:0 }}>{exp.duration}</span>
                    </div>
                    <div style={{ marginTop:12, display:"flex", gap: isMobile?8: isDesktop?24:16, flexWrap:"wrap" }}>
                      <p style={{ fontSize: isDesktop?12.5:11, color:"#555", fontFamily:"'JetBrains Mono', monospace" }}>📅 {exp.period}</p>
                      <p style={{ fontSize: isDesktop?12.5:11, color:"#555", fontFamily:"'JetBrains Mono', monospace" }}>📍 {exp.location}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" style={{ padding: isMobile ? "64px 18px" : isDesktop ? "0 0 72px" : "80px 28px" }}>
            <SH title="Education" />
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {portfolio.education.map((edu,i)=>(
                <RevealSection key={i} delay={i*100}>
                  <div style={{ padding:cardPad, borderRadius:14, border:"1px solid #c8a96e15", background:"#0f0f14", display:"flex", justifyContent:"space-between", alignItems: isMobile?"flex-start":"center", flexWrap:"wrap", gap:12 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize: isMobile?16: isDesktop?21:18, color:"#f0ede8", marginBottom:5 }}>{edu.institution}</h3>
                      <p style={{ color:"#9a9590", fontSize: isMobile?13: isDesktop?15:14, fontFamily:"'Georgia', serif" }}>{edu.degree}</p>
                    </div>
                    <span style={{ fontSize:11.5, color:"#c8a96e", fontFamily:"'JetBrains Mono', monospace", background:"#c8a96e10", padding:"4px 13px", borderRadius:12, flexShrink:0 }}>{edu.period}</span>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          {/* SKILLS — mobile/tablet only (desktop shows in sidebar) */}
          {!isDesktop && (
            <section id="skills" style={{ padding: isMobile ? "64px 18px" : "80px 28px" }}>
              <SH title="Skills" />
              <RevealSection delay={80}>
                <div style={{ display:"flex", flexWrap:"wrap", gap: isMobile?8:10 }}>
                  {portfolio.skills.map((skill,i)=>(
                    <span key={i} className="skill-tag" style={{
                      padding: isMobile?"8px 15px":"10px 20px", borderRadius:22,
                      border:"1px solid #c8a96e33", background:"#c8a96e08",
                      color:"#c8a96e", fontSize: isMobile?12:13,
                      fontFamily:"'JetBrains Mono', monospace", cursor:"default",
                    }}>{skill}</span>
                  ))}
                </div>
              </RevealSection>
            </section>
          )}
          {isDesktop && <div id="skills" style={{ height:0 }} />}

          {/* CERTIFICATIONS */}
          <section id="certifications" style={{ padding: isMobile ? "64px 18px" : isDesktop ? "0 0 72px" : "80px 28px" }}>
            <SH title="Certifications" />
            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : isDesktop ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(280px, 1fr))",
              gap: isMobile?10: isDesktop?18:14,
            }}>
              {portfolio.certifications.map((cert,i)=>{
                const isOpen = expandedCert === i;
                return (
                  <RevealSection key={i} delay={i*70}>
                    <div
                      className={`cert-card${isOpen ? " expanded" : ""}`}
                      onClick={() => setExpandedCert(isOpen ? null : i)}
                      style={{
                        padding: isMobile?"16px":"22px", borderRadius:14,
                        border:"1px solid #c8a96e20", background:"#0f0f14",
                        height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-start",
                      }}
                    >
                      {/* top row: dot + title + chevron */}
                      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                        <div style={{ width:7, height:7, borderRadius:"50%", background:"#c8a96e", marginTop:7, flexShrink:0 }} />
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ color:"#e8e4de", fontSize: isMobile?13: isDesktop?15:14, lineHeight:1.55, fontFamily:"'Georgia', serif", fontWeight:600 }}>{cert.title}</p>
                        </div>
                        <span className={`cert-toggle${isOpen ? " rotated" : ""}`} style={{ fontSize:11, color:"#c8a96e66", flexShrink:0, marginTop:2 }}>▼</span>
                      </div>

                      {/* issuer + date row */}
                      <div style={{ display:"flex", alignItems:"center", gap: isMobile?10:16, marginTop:10, marginLeft:19, flexWrap:"wrap" }}>
                        <span style={{ fontSize: isMobile?10.5:11.5, color:"#c8a96e", fontFamily:"'JetBrains Mono', monospace", background:"#c8a96e10", padding:"3px 10px", borderRadius:8 }}>
                          {cert.issuer}
                        </span>
                        <span style={{ fontSize:10.5, color:"#444", fontFamily:"'JetBrains Mono', monospace" }}>📅 {cert.date}</span>
                      </div>

                      {/* expandable: description + tags */}
                      <div className={`cert-desc${isOpen ? " open" : ""}`} style={{ marginLeft:19 }}>
                        <p style={{ color:"#7a7570", fontSize: isMobile?12:13, lineHeight:1.7, fontFamily:"'Georgia', serif", marginTop:12 }}>
                          {cert.description}
                        </p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:10 }}>
                          {cert.tags.map((tag,ti)=>(
                            <span key={ti} style={{
                              padding:"3px 9px", borderRadius:10,
                              border:"1px solid #c8a96e22", background:"#c8a96e06",
                              color:"#c8a96e88", fontSize:10, fontFamily:"'JetBrains Mono', monospace",
                            }}>{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* footer */}
                      <div style={{ marginTop:14, paddingTop:10, borderTop:"1px solid #c8a96e10", textAlign:"right" }}>
                        <span style={{ fontSize:9, color:"#3d3d3d", fontFamily:"'JetBrains Mono', monospace", letterSpacing:1 }}>VERIFIED ✓</span>
                      </div>
                    </div>
                  </RevealSection>
                );
              })}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{ padding: isMobile ? "64px 18px 110px" : isDesktop ? "0 0 100px" : "80px 28px 100px", textAlign:"center" }}>
            <SH title="Get In Touch" centered />
            <RevealSection delay={100}>
              <p style={{ color:"#666", fontSize: isMobile?14: isDesktop?16:15, fontFamily:"'Georgia', serif", lineHeight:1.8, maxWidth: isDesktop?560:undefined, margin: isDesktop?"0 auto 34px":"0 0 34px" }}>
                I'm always open to new opportunities and collaborations.<br />Feel free to reach out anytime.
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap: isMobile?10:18, flexWrap:"wrap" }}>
                <a href={`mailto:${portfolio.email}`} style={{
                  padding: isMobile?"11px 24px": isDesktop?"13px 36px":"12px 30px", borderRadius:30,
                  background:"linear-gradient(135deg,#c8a96e,#a07840)", color:"#0a0a0f",
                  fontFamily:"'JetBrains Mono', monospace", fontSize: isMobile?12: isDesktop?14:13, fontWeight:500, cursor:"pointer",
                  boxShadow:"0 4px 24px #c8a96e33", transition:"transform .2s, box-shadow .2s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 32px #c8a96e44"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 24px #c8a96e33"}}
                >Email Me</a>
                <a href={portfolio.linkedin} target="_blank" rel="noreferrer" style={{
                  padding: isMobile?"11px 24px": isDesktop?"13px 36px":"12px 30px", borderRadius:30,
                  border:"1px solid #c8a96e44", background:"transparent", color:"#c8a96e",
                  fontFamily:"'JetBrains Mono', monospace", fontSize: isMobile?12: isDesktop?14:13, cursor:"pointer", transition:"all .3s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#c8a96e15";e.currentTarget.style.borderColor="#c8a96e88"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#c8a96e44"}}
                >LinkedIn ↗</a>
              </div>
            </RevealSection>
          </section>
        </main>
      </div>

      {/* FOOTER — mobile/tablet only */}
      {!isDesktop && (
        <footer style={{
          borderTop:"1px solid #c8a96e10", padding:"22px 20px",
          display:"flex", justifyContent: isMobile?"center":"space-between", alignItems:"center",
          flexWrap:"wrap", gap:6, flexDirection: isMobile?"column":"row",
        }}>
          <p style={{ fontSize:11, color:"#3a3a3a", fontFamily:"'JetBrains Mono', monospace" }}>© 2026 Subrat Tripathi</p>
          <p style={{ fontSize:10, color:"#2a2a2a", fontFamily:"'JetBrains Mono', monospace" }}>Built with React · Designed with care</p>
        </footer>
      )}

      {/* MOBILE BOTTOM NAV */}
      {isMobile && (
        <nav style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:100,
          background:"rgba(10,10,15,0.9)", backdropFilter:"blur(18px)",
          borderTop:"1px solid rgba(200,169,110,0.15)",
          display:"flex", justifyContent:"space-around", alignItems:"center",
          padding:"9px 2px 13px",
        }}>
          {NAV.map(({id,icon})=>(
            <button key={id} className="bnav-btn" onClick={()=>navTo(id)} style={{
              background:"none", border:"none", cursor:"pointer",
              display:"flex", flexDirection:"column", alignItems:"center", gap:2,
              color: activeNav===id?"#c8a96e":"#555",
            }}>
              <span style={{ fontSize:17 }}>{icon}</span>
              <span style={{ fontSize:7.5, fontFamily:"'JetBrains Mono', monospace", letterSpacing:.4, textTransform:"capitalize" }}>{id.slice(0,4)}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}