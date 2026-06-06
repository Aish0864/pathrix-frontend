import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startSession, getRecommendation, getOverallMastery } from "../../api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const name = localStorage.getItem("student_name") || "Student";
  const studentId = localStorage.getItem("student_id");
  const firstName = name.split(" ")[0];

  // const [rec, setRec] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [rec, setRec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [masteredCount, setMasteredCount] = useState(0);
  const [level, setLevel] = useState(
    localStorage.getItem("diagnostic_level") || "Beginner",
  );
  const [quizAccuracy, setQuizAccuracy] = useState("—");
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("session_id"),
  );

  useEffect(() => {
    const init = async () => {
      try {
        let sid = sessionId;
        if (!sid) {
          const res = await startSession(studentId);
          sid = res.data.session_id;
          localStorage.setItem("session_id", sid);
          setSessionId(sid);
        }
        const recRes = await getRecommendation(sid);
        setRec(recRes.data);
        if (recRes.data.ability_score)
          setQuizAccuracy(`${Math.round(recRes.data.ability_score * 100)}%`);
        localStorage.setItem(
          "cognitive_load",
          recRes.data.cognitive_load || "low",
        );
        // const masteryRes = await getOverallMastery(studentId);
        // const pct = masteryRes.data.overall_mastery || 0;
        // const lvl =
        //   pct >= 70 ? "Advanced" : pct >= 40 ? "Intermediate" : "Beginner";
        // localStorage.setItem("diagnostic_level", lvl);
        const masteryRes = await getOverallMastery(studentId);
        const pct = masteryRes.data.overall_mastery || 0;
        const abilityPct = (recRes.data.ability_score || 0) * 100;
        const combinedPct = Math.max(pct, abilityPct);
        const lvl =
          combinedPct >= 70
            ? "Advanced"
            : combinedPct >= 40
              ? "Intermediate"
              : "Beginner";
        localStorage.setItem("diagnostic_level", lvl);
        setLevel(lvl);
        const studentMasteryRes = await fetch(
          `https://pathrix-api.onrender.com/student_mastery/${studentId}`,
        );
        const studentMasteryData = await studentMasteryRes.json();
        setMasteredCount(studentMasteryData.mastered_concepts?.length || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.greeting}>
            {greeting}, {firstName} 👋
          </h1>
          <p style={s.sub}>Here's where you left off. Ready to continue?</p>
        </div>
        <button
          style={s.startBtn}
          onClick={() => {
            if (rec) {
              localStorage.setItem("current_concept", rec.recommended_concept);
              localStorage.setItem(
                "cognitive_load",
                rec.cognitive_load || "low",
              );
            }
            navigate("/dashboard/learn");
          }}
        >
          Start Learning →
        </button>
      </div>

      {/* Stat cards */}
      <div style={s.statRow}>
        <StatCard
          label="Current Level"
          value={level}
          accent="#1D9E75"
          bg="#E1F5EE"
        />
        <StatCard
          label="Concepts Studied"
          value={masteredCount}
          accent="#378ADD"
          bg="#E6F1FB"
        />
        <StatCard
          label="Quiz Accuracy"
          value={quizAccuracy}
          accent="#EF9F27"
          bg="#FAEEDA"
        />
        <StatCard
          label="Session #"
          value={sessionId ? "1" : "—"}
          accent="#7F77DD"
          bg="#EEEDFE"
        />
      </div>

      {/* Main grid */}
      <div style={s.grid}>
        {/* Next recommendation */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={s.cardTitle}>Next Recommended</span>
            <span style={s.cardBadge}>AI Pick</span>
          </div>
          {loading ? (
            <div style={s.skeleton}>
              <div style={s.skeletonLine} />
              <div style={{ ...s.skeletonLine, width: "60%" }} />
            </div>
          ) : rec ? (
            <div>
              <div style={s.conceptName}>{rec.recommended_concept}</div>
              <div style={s.whyBox}>
                <span style={s.whyLabel}>WHY</span>
                <span style={s.whyText}>
                  {rec.explanation?.split("|")[0].trim()}
                </span>
              </div>
              <div style={s.metaRow}>
                <MetaPill
                  label="Confidence"
                  value={rec.confidence || "Medium"}
                  color="#1D9E75"
                />
                <MetaPill
                  label="Load"
                  value={
                    !rec.cognitive_load || rec.cognitive_load === "Unknown"
                      ? "Low"
                      : rec.cognitive_load
                  }
                  color="#EF9F27"
                />
              </div>
              <button
                style={s.learnBtn}
                onClick={() => {
                  localStorage.setItem(
                    "current_concept",
                    rec.recommended_concept,
                  );
                  localStorage.setItem(
                    "cognitive_load",
                    rec.cognitive_load || "low",
                  );
                  navigate("/dashboard/learn");
                }}
              >
                Learn this concept →
              </button>
            </div>
          ) : (
            <p style={s.empty}>No recommendation yet.</p>
          )}
        </div>

        {/* Quick actions */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={s.cardTitle}>Quick Actions</span>
          </div>
          <div style={s.actionList}>
            <ActionRow
              icon="✏️"
              title="Take a Quiz"
              desc="Test your knowledge and update your mastery"
              color="#E6F1FB"
              onClick={() => navigate("/dashboard/quiz")}
            />
            <ActionRow
              icon="🗺️"
              title="View My Path"
              desc="See your full personalised learning roadmap"
              color="#EEEDFE"
              onClick={() => navigate("/dashboard/path")}
            />
            <ActionRow
              icon="📖"
              title="Continue Learning"
              desc="Pick up where you left off"
              color="#E1F5EE"
              onClick={() => navigate("/dashboard/learn")}
            />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div style={s.footerNote}>
        🧠 Pathrix uses Deep Knowledge Tracing + Reinforcement Learning to
        personalise your path in real time.
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, bg }) {
  return (
    <div style={{ ...s.statCard, background: bg, borderColor: accent + "33" }}>
      <div style={{ ...s.statValue, color: accent }}>{value}</div>
      <div style={s.statLabel}>{label}</div>
    </div>
  );
}

function MetaPill({ label, value, color }) {
  return (
    <div style={{ ...s.metaPill, borderColor: color + "44" }}>
      <span style={{ ...s.metaPillLabel, color }}>{label}</span>
      <span style={s.metaPillValue}>{value}</span>
    </div>
  );
}

function ActionRow({ icon, title, desc, color, onClick }) {
  return (
    <div style={{ ...s.actionRow, background: color }} onClick={onClick}>
      <span style={s.actionIcon}>{icon}</span>
      <div>
        <div style={s.actionTitle}>{title}</div>
        <div style={s.actionDesc}>{desc}</div>
      </div>
      <span style={s.actionArrow}>→</span>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "900px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
  },
  greeting: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#1D1C1A",
    marginBottom: "4px",
    letterSpacing: "-0.3px",
  },
  sub: {
    fontSize: "0.9rem",
    color: "#888780",
  },
  startBtn: {
    padding: "11px 22px",
    borderRadius: "10px",
    background: "#1D9E75",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
    flexShrink: 0,
  },

  statRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginBottom: "24px",
  },
  statCard: {
    padding: "16px 18px",
    borderRadius: "12px",
    border: "1.5px solid",
  },
  statValue: {
    fontSize: "1.35rem",
    fontWeight: 700,
    marginBottom: "4px",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#888780",
    fontWeight: 500,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #EEECE6",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "18px",
  },
  cardTitle: {
    fontSize: "0.88rem",
    fontWeight: 600,
    color: "#444441",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  cardBadge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#1D9E75",
    background: "#E1F5EE",
    padding: "3px 8px",
    borderRadius: "20px",
    border: "1px solid #9FE1CB",
  },

  skeleton: { display: "flex", flexDirection: "column", gap: "10px" },
  skeletonLine: {
    height: "16px",
    background: "#F1EFE8",
    borderRadius: "6px",
    width: "100%",
    animation: "pulse 1.5s ease-in-out infinite",
  },

  conceptName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1D1C1A",
    marginBottom: "12px",
    letterSpacing: "-0.3px",
  },
  whyBox: {
    background: "#F7F6F2",
    borderRadius: "8px",
    padding: "10px 12px",
    marginBottom: "14px",
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
    border: "1px solid #EEECE6",
  },
  whyLabel: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "#1D9E75",
    background: "#E1F5EE",
    padding: "2px 6px",
    borderRadius: "4px",
    flexShrink: 0,
    marginTop: "1px",
  },
  whyText: {
    fontSize: "0.82rem",
    color: "#888780",
    lineHeight: 1.5,
  },
  metaRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
  },
  metaPill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 10px",
    borderRadius: "8px",
    border: "1px solid",
    background: "#fff",
  },
  metaPillLabel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  metaPillValue: {
    fontSize: "0.8rem",
    color: "#444441",
    fontWeight: 500,
    textTransform: "capitalize",
  },
  learnBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "9px",
    background: "#085041",
    color: "#fff",
    fontSize: "0.88rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
  empty: {
    fontSize: "0.88rem",
    color: "#B4B2A9",
  },

  actionList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    justifyContent: "space-between",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  actionIcon: {
    fontSize: "1.2rem",
    flexShrink: 0,
  },
  actionTitle: {
    fontSize: "0.87rem",
    fontWeight: 600,
    color: "#444441",
    marginBottom: "2px",
  },
  actionDesc: {
    fontSize: "0.76rem",
    color: "#888780",
  },
  actionArrow: {
    marginLeft: "auto",
    color: "#B4B2A9",
    fontSize: "1rem",
    flexShrink: 0,
  },

  footerNote: {
    fontSize: "0.78rem",
    color: "#B4B2A9",
    background: "#F7F6F2",
    border: "1px solid #EEECE6",
    borderRadius: "10px",
    padding: "12px 16px",
  },
};
