import { useState, useEffect } from "react";

import { determineNextAction } from "../../utils/adaptiveLogic";
import { getRecommendation, markMastered, getOverallMastery } from "../../api";

import { useNavigate, useLocation } from "react-router-dom";

const CONCEPT_ID_MAP = {
  Variables: 0,
  DataTypes: 1,
  Operators: 2,
  "Input/Output": 3,
  Comments: 4,
  "If/Else": 5,
  Elif: 6,
  "For Loop": 7,
  "While Loop": 8,
  "Break/Continue": 9,
  Pass: 10,
  Strings: 11,
  Lists: 12,
  Tuples: 13,
  Sets: 14,
  Dictionaries: 15,
  "List Slicing": 16,
  Functions: 17,
  Arguments: 18,
  "Return Values": 19,
  "Default Args": 20,
  Scope: 21,
  Lambda: 22,
  "Base Case": 23,
  "Recursive Functions": 24,
  Memoization: 25,
  Classes: 26,
  Objects: 27,
  Constructors: 28,
  Inheritance: 29,
  Polymorphism: 30,
  Encapsulation: 31,
  Modules: 32,
  Packages: 33,
  "File Read": 34,
  "File Write": 35,
  "Exception Handling": 36,
  "Try/Except": 37,
  Comprehensions: 38,
  Iterators: 39,
  Generators: 40,
  Decorators: 41,
  "Context Managers": 42,
  Math: 43,
  OS: 44,
  Sys: 45,
  DateTime: 46,
  Collections: 47,
  Itertools: 48,
  Threading: 49,
  Multiprocessing: 50,
  "Async/Await": 51,
  "Event Loop": 52,
  "Locks/Semaphores": 53,
};

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const concept =
    location.state?.concept ||
    localStorage.getItem("quiz_concept") ||
    "Unknown";
  const score =
    location.state?.score ??
    parseInt(localStorage.getItem("quiz_score") || "0");
  const total =
    location.state?.total ??
    parseInt(localStorage.getItem("quiz_total") || "5");
  // const sessionId = localStorage.getItem("session_id");
  const studentId = localStorage.getItem("student_id");
  const results = JSON.parse(localStorage.getItem("quiz_results") || "[]");

  const masteryPct = Math.round((score / total) * 100);
  const cognitiveLoad = localStorage.getItem("cognitive_load") || "low";
  const action = determineNextAction(masteryPct, score, total, cognitiveLoad);

  const [animMastery, setAnimMastery] = useState(0);
  const [nextConcept, setNextConcept] = useState(null);

  const conceptName = concept.replace(/ L\d+$/, "").trim();
  const conceptId = CONCEPT_ID_MAP[conceptName];

  console.log("conceptName:", conceptName);
  console.log("conceptId:", conceptId); // should NOT be undefined

  useEffect(() => {
    setTimeout(() => setAnimMastery(masteryPct), 300);
    if (studentId) {
      const conceptName = concept.replace(/ L\d+$/, "").trim();
      const conceptId = CONCEPT_ID_MAP[conceptName] ?? -1;

      console.log("conceptName:", conceptName, "conceptId:", conceptId);

      if (masteryPct >= 60 && conceptId >= 0) {
        markMastered(studentId, conceptId, score, total)
          .then(() => {
            // Check for course completion after marking mastered
            getOverallMastery(studentId)
              .then((res) => {
                const pct = res.data?.overall_mastery || 0;
                const masteredCount = Math.round((pct / 100) * 54);
                if (masteredCount >= 54) {
                  navigate("/dashboard/completion", {
                    state: { overallPct: pct },
                  });
                }
              })
              .catch(() => {});
          })
          .catch(() => {});
      }

      const sessionId = localStorage.getItem("session_id");
      getRecommendation(sessionId)
        .then((res) => {
          setNextConcept(res.data.recommended_concept);
          localStorage.setItem(
            "cognitive_load",
            res.data.cognitive_load || "low",
          );
        })
        .catch(() => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const actionConfig = {
    advance: {
      label: "Moving to next concept",
      sub: "Great work! You've mastered this — time to level up.",
      color: "#1D9E75",
      bg: "#E1F5EE",
      border: "#9FE1CB",
      btn: "Continue to Next Concept →",
      btnBg: "#1D9E75",
      onClick: () => {
        if (nextConcept) {
          localStorage.setItem("current_concept", nextConcept);
        } else {
          localStorage.removeItem("current_concept");
        }
        navigate("/dashboard/learn");
      },
    },
    stay_harder: {
      label: "Try harder content",
      sub: "Good progress! Let's challenge you with more advanced material.",
      color: "#EF9F27",
      bg: "#FAEEDA",
      border: "#FAC775",
      btn: "Try Harder Quiz →",
      btnBg: "#EF9F27",
      onClick: () => {
        localStorage.removeItem("current_concept");
        navigate("/dashboard/learn");
      },
    },
    retry_easier: {
      label: "Review with simpler content",
      sub: "No worries — let's revisit the basics before moving on.",
      color: "#378ADD",
      bg: "#E6F1FB",
      border: "#B5D4F4",
      btn: "Review Again →",
      btnBg: "#378ADD",
      onClick: () => {
        localStorage.removeItem("current_concept");
        navigate("/dashboard/learn");
      },
    },
  };

  const cfg = actionConfig[action];
  const pct = score / total;

  return (
    <div style={s.page}>
      {/* Score header */}
      <div style={s.scoreHeader}>
        <div style={s.scoreBig}>
          <span style={s.scoreNum}>{score}</span>
          <span style={s.scoreSlash}>/{total}</span>
        </div>
        <div>
          <h1 style={s.scoreTitle}>
            {pct === 1
              ? "Perfect score! 🎉"
              : pct >= 0.67
                ? "Well done! 👏"
                : pct >= 0.33
                  ? "Keep going! 💪"
                  : "Keep practising! 📚"}
          </h1>
          <p style={s.scoreSub}>{concept}</p>
        </div>
      </div>

      {/* Question breakdown */}
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
                    : "✗ Wrong"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mastery bar */}
      <div style={s.card}>
        <div style={s.cardLabel}>SESSION MASTERY</div>
        <div style={s.masteryRow}>
          <span style={s.masteryLabel}>{concept}</span>
          <span style={s.masteryPct}>{masteryPct}%</span>
        </div>
        <div style={s.track}>
          <div style={{ ...s.fill, width: `${animMastery}%` }} />
        </div>
        <div style={s.masteryHint}>
          Based on {score}/{total} correct answers this session
        </div>
      </div>

      {/* Action card */}
      <div
        style={{ ...s.actionCard, background: cfg.bg, borderColor: cfg.border }}
      >
        <div style={{ ...s.actionLabel, color: cfg.color }}>NEXT STEP</div>
        <div style={{ ...s.actionTitle, color: cfg.color }}>{cfg.label}</div>
        <p style={s.actionSub}>{cfg.sub}</p>
        {nextConcept && action === "advance" && (
          <div style={s.nextConceptChip}>
            Up next: <strong>{nextConcept}</strong>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={s.btnRow}>
        <button
          style={{ ...s.primaryBtn, background: cfg.btnBg }}
          onClick={cfg.onClick}
        >
          {cfg.btn}
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
    maxWidth: "680px",
    paddingBottom: "40px",
  },
  scoreHeader: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "28px",
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "16px",
    padding: "24px 28px",
  },
  scoreBig: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    flexShrink: 0,
  },
  scoreNum: {
    fontSize: "3.5rem",
    fontWeight: 700,
    color: "#1D9E75",
    lineHeight: 1,
    letterSpacing: "-2px",
  },
  scoreSlash: {
    fontSize: "1.8rem",
    fontWeight: 400,
    color: "#B4B2A9",
  },
  scoreTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#1D1C1A",
    marginBottom: "4px",
    letterSpacing: "-0.3px",
  },
  scoreSub: {
    fontSize: "0.85rem",
    color: "#888780",
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
  },
  resultPill: {
    fontSize: "0.82rem",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "20px",
  },
  masteryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  masteryLabel: {
    fontSize: "0.85rem",
    color: "#444441",
    fontWeight: 500,
  },
  masteryPct: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#1D9E75",
  },
  track: {
    height: "10px",
    background: "#F1EFE8",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
    borderRadius: "10px",
    transition: "width 1s ease",
  },
  masteryHint: {
    fontSize: "0.75rem",
    color: "#B4B2A9",
  },
  actionCard: {
    borderRadius: "14px",
    border: "1.5px solid",
    padding: "20px 24px",
    marginBottom: "20px",
  },
  actionLabel: {
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "1px",
    marginBottom: "6px",
  },
  actionTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "6px",
    letterSpacing: "-0.2px",
  },
  actionSub: {
    fontSize: "0.85rem",
    color: "#888780",
    lineHeight: 1.5,
  },
  nextConceptChip: {
    marginTop: "12px",
    fontSize: "0.82rem",
    color: "#085041",
    background: "#fff",
    border: "1px solid #9FE1CB",
    padding: "6px 12px",
    borderRadius: "8px",
    display: "inline-block",
  },
  btnRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
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
