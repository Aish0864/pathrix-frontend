import { useNavigate } from "react-router-dom";

export default function DiagnosticResultPage() {
  const navigate = useNavigate();

  const score = localStorage.getItem("diagnostic_score") || "0/5";
  const level = localStorage.getItem("diagnostic_level") || "Beginner";
  const results = JSON.parse(
    localStorage.getItem("diagnostic_results") || "[]",
  );

  const [got, total] = score.split("/").map(Number);
  const pct = Math.round((got / total) * 100);

  const levelColor =
    level === "Advanced"
      ? "#7F77DD"
      : level === "Intermediate"
        ? "#EF9F27"
        : "#1D9E75";
  const levelBg =
    level === "Advanced"
      ? "#EEEDFE"
      : level === "Intermediate"
        ? "#FAEEDA"
        : "#E1F5EE";

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.title}>Diagnostic Result</h1>
        <p style={s.sub}>Taken once at registration — your starting point</p>
      </div>

      {/* Score card */}
      <div style={s.scoreCard}>
        <div style={s.scoreLeft}>
          <div style={s.bigScore}>
            <span style={{ ...s.scoreNum, color: levelColor }}>{got}</span>
            <span style={s.scoreSlash}>/{total}</span>
          </div>
          <div style={s.pctText}>{pct}% correct</div>
        </div>
        <div style={s.scoreRight}>
          <div
            style={{ ...s.levelBadge, color: levelColor, background: levelBg }}
          >
            {level}
          </div>
          <div style={s.levelLabel}>Your Python level</div>
          <div style={s.levelDesc}>
            {level === "Advanced"
              ? "Strong foundation — your path skips beginner concepts"
              : level === "Intermediate"
                ? "Good progress — your path starts at intermediate concepts"
                : "Fresh start — your path begins from the basics"}
          </div>
        </div>
      </div>
      {localStorage.getItem("diagnostic_aborted") === "true" && (
        <div style={s.abortNote}>
          ⚠️ Quiz stopped early — 5 consecutive incorrect answers detected.
          Placed at Beginner level.
        </div>
      )}
      {/* Question breakdown */}
      {results.length > 0 && (
        <div style={s.card}>
          <div style={s.cardLabel}>QUESTION BREAKDOWN</div>
          <div style={s.breakdown}>
            {results.map((r, i) => (
              <div key={i} style={s.resultRow}>
                <span style={s.qLabel}>Q{i + 1}</span>
                <div
                  style={{
                    ...s.resultPill,
                    background: r.correct
                      ? "#E1F5EE"
                      : r.timedOut
                        ? "#FAEEDA"
                        : "#FCEBEB",
                    color: r.correct
                      ? "#085041"
                      : r.timedOut
                        ? "#633806"
                        : "#791F1F",
                  }}
                >
                  {r.correct
                    ? "✓ Correct"
                    : r.timedOut
                      ? "⏱ Timed out"
                      : "✗ Incorrect"}
                </div>
                <span style={s.sectionTag}>
                  {i < 5
                    ? "Python Basics"
                    : i < 10
                      ? "Data Structures"
                      : "Logic & Functions"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What this means */}
      <div style={s.card}>
        <div style={s.cardLabel}>WHAT THIS MEANS FOR YOUR PATH</div>
        <div style={s.infoGrid}>
          <div style={s.infoItem}>
            <div style={s.infoValue}>{level}</div>
            <div style={s.infoLabel}>Starting level</div>
          </div>
          <div style={s.infoItem}>
            <div style={{ ...s.infoValue, color: levelColor }}>
              {level === "Advanced"
                ? "10+"
                : level === "Intermediate"
                  ? "5"
                  : "0"}
            </div>
            <div style={s.infoLabel}>Concepts skipped</div>
          </div>
          <div style={s.infoItem}>
            <div style={s.infoValue}>{total}</div>
            <div style={s.infoLabel}>Questions answered</div>
          </div>
        </div>
      </div>

      <button style={s.backBtn} onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "680px",
    paddingBottom: "40px",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
    marginBottom: "4px",
  },
  sub: {
    fontSize: "0.85rem",
    color: "#888780",
  },
  scoreCard: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "24px 28px",
    marginBottom: "16px",
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },
  scoreLeft: {
    flexShrink: 0,
    textAlign: "center",
  },
  bigScore: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
  },
  scoreNum: {
    fontSize: "3.5rem",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-2px",
  },
  scoreSlash: {
    fontSize: "1.8rem",
    fontWeight: 400,
    color: "#B4B2A9",
  },
  pctText: {
    fontSize: "0.82rem",
    color: "#888780",
    marginTop: "4px",
  },
  scoreRight: {
    flex: 1,
  },
  levelBadge: {
    fontSize: "1.1rem",
    fontWeight: 700,
    padding: "6px 16px",
    borderRadius: "20px",
    display: "inline-block",
    marginBottom: "8px",
  },
  levelLabel: {
    fontSize: "0.78rem",
    color: "#888780",
    marginBottom: "6px",
  },
  levelDesc: {
    fontSize: "0.85rem",
    color: "#444441",
    lineHeight: 1.5,
  },
  card: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "20px 24px",
    marginBottom: "16px",
  },
  cardLabel: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "1px",
    marginBottom: "14px",
  },
  breakdown: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  resultRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  qLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#888780",
    width: "24px",
    flexShrink: 0,
  },
  resultPill: {
    fontSize: "0.82rem",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "20px",
  },
  sectionTag: {
    fontSize: "0.75rem",
    color: "#B4B2A9",
    marginLeft: "auto",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  infoItem: {
    textAlign: "center",
    padding: "12px",
    background: "#F7F6F2",
    borderRadius: "10px",
  },
  infoValue: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#1D1C1A",
    marginBottom: "4px",
  },
  infoLabel: {
    fontSize: "0.75rem",
    color: "#888780",
  },
  backBtn: {
    padding: "12px 24px",
    borderRadius: "10px",
    background: "#fff",
    border: "1px solid #EEECE6",
    color: "#888780",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
  abortNote: {
    background: "#FAEEDA",
    border: "1px solid #FAC775",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "0.85rem",
    color: "#633806",
    marginBottom: "16px",
  },
};
