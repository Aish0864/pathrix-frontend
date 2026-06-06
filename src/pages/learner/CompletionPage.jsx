// src/pages/learner/CompletionPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function CompletionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const studentName = localStorage.getItem("student_name") || "Student";
  const overallPct = state.overallPct ? Math.round(state.overallPct) : 100;
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Add print styles
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "print-style";
    style.innerHTML = `
    @media print {
    @page { 
        size: A4 landscape; 
        margin: 0; 
    }
    body * { visibility: hidden; }
    #certificate, #certificate * { visibility: visible; }
    #certificate {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      margin: 0;
      box-shadow: none !important;
      border-radius: 0 !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;
    document.head.appendChild(style);
    return () => document.getElementById("print-style")?.remove();
  }, []);

  useEffect(() => {
    if (!state.overallPct) {
      navigate("/dashboard", { replace: true });
    }
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  function handleDownload() {
    window.print();
  }

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.emoji}>🎉</div>
        <h1 style={s.title}>Congratulations!</h1>
        <p style={s.subtitle}>
          You've mastered all 54 Python concepts in Pathrix.
        </p>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statValue}>54</div>
          <div style={s.statLabel}>Concepts mastered</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{overallPct}%</div>
          <div style={s.statLabel}>Final mastery</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>🏆</div>
          <div style={s.statLabel}>Course complete</div>
        </div>
      </div>

      {/* Certificate */}
      <div style={s.certificate} id="certificate">
        <div style={s.certTopBar} className="cert-top-bar" />
        <div style={s.certContent}>
          {/* Top content */}
          <div style={{ width: "100%", textAlign: "center" }}>
            <div style={s.certBrand}>
              <span style={s.certBrandIcon}>🧠</span>
              <span style={s.certBrandName}>Pathrix</span>
            </div>
            <p style={s.certPresents}>proudly presents this</p>
            <h2 style={s.certHeading}>Certificate of Completion</h2>
            <div style={s.certDivider} />
            <p style={s.certAwarded}>This certificate is awarded to</p>
            <h3 style={s.certName}>{studentName}</h3>
            <p style={s.certDesc}>
              for successfully mastering all <strong>54 Python concepts</strong>
              <br />
              through AI-guided adaptive learning on the Pathrix platform.
            </p>
            <div style={s.certBadgeRow}>
              <div style={s.certBadge}>🏆 Course Complete</div>
              <div style={s.certBadge}>⭐ All 54 Concepts</div>
              <div style={s.certBadge}>🎯 {overallPct}% Mastery</div>
            </div>
          </div>

          {/* Footer pinned to bottom */}
          <div style={{ ...s.certFooter, width: "100%" }}>
            <div style={s.certFooterItem}>
              <div style={s.certFooterValue}>{today}</div>
              <div style={s.certFooterLabel}>Date of Completion</div>
            </div>
            <div style={s.certSeal}>✦</div>
            <div style={s.certFooterItem}>
              <div style={s.certFooterValue}>Python Fundamentals</div>
              <div style={s.certFooterLabel}>Course</div>
            </div>
          </div>
        </div>
        <div style={s.certBottomBar} className="cert-bottom-bar" />
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button style={s.primaryBtn} onClick={handleDownload}>
          📄 Download Certificate
        </button>
        <button style={s.secondaryBtn} onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "900px", // ← increase from 680px
    paddingBottom: "40px",
  },
  hero: { textAlign: "center", padding: "40px 0 32px" },
  emoji: { fontSize: "3.5rem", marginBottom: "16px" },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.5px",
    marginBottom: "8px",
  },
  subtitle: { fontSize: "1rem", color: "#888780", lineHeight: 1.6 },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "24px",
    textAlign: "center",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1D9E75",
    marginBottom: "6px",
  },
  statLabel: { fontSize: "0.78rem", color: "#888780" },
  certificate: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "28px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    width: "100%",
  },
  certTopBar: {
    height: "12px",
    background: "linear-gradient(90deg, #085041, #1D9E75, #5DCAA5)",
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
  },
  certBottomBar: {
    height: "6px",
    background: "linear-gradient(90deg, #085041, #1D9E75, #5DCAA5)",
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
  },
  certContent: {
    padding: "50px 120px",
    textAlign: "center",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  certBrand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  certBrandIcon: { fontSize: "1.4rem" },
  certBrandName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1D9E75",
    letterSpacing: "-0.3px",
  },
  certPresents: {
    fontSize: "0.82rem",
    color: "#B4B2A9",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  certHeading: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.5px",
    marginBottom: "12px",
  },

  certDivider: {
    width: "60px",
    height: "3px",
    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
    borderRadius: "2px",
    margin: "0 auto 20px",
  },
  certAwarded: { fontSize: "0.85rem", color: "#888780", marginBottom: "8px" },
  certName: {
    fontSize: "2.6rem",
    fontWeight: 700,
    color: "#085041",
    letterSpacing: "-0.5px",
    marginBottom: "16px",
  },

  certDesc: {
    fontSize: "0.95rem",
    color: "#888780",
    lineHeight: 1.8,
    marginBottom: "28px",
  },

  certBadgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "0",
    flexWrap: "wrap",
  },

  certBadge: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#085041",
    background: "#E1F5EE",
    border: "1px solid #9FE1CB",
    padding: "8px 18px",
    borderRadius: "20px",
  },

  certFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #EEECE6",
    paddingTop: "24px",
  },
  certFooterItem: { textAlign: "center" },
  certFooterValue: {
    fontSize: "0.88rem",
    fontWeight: 600,
    color: "#1D1C1A",
    marginBottom: "4px",
  },
  certFooterLabel: {
    fontSize: "0.72rem",
    color: "#B4B2A9",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  certSeal: { fontSize: "2rem", color: "#1D9E75" },
  actions: { display: "flex", flexDirection: "column", gap: "10px" },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    background: "#1D9E75",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
  secondaryBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    background: "#fff",
    color: "#888780",
    fontSize: "0.9rem",
    fontWeight: 500,
    border: "1px solid #EEECE6",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
};
