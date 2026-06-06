import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentMastery, getRecommendation } from "../../api";

const ALL_CONCEPTS = [
  { id: 0, name: "Variables", level: 0 },
  { id: 1, name: "Data Types", level: 0 },
  { id: 2, name: "Operators", level: 0 },
  { id: 3, name: "Input/Output", level: 0 },
  { id: 4, name: "Comments", level: 0 },
  { id: 5, name: "If/Else", level: 1 },
  { id: 6, name: "Elif", level: 1 },
  { id: 7, name: "For Loop", level: 1 },
  { id: 8, name: "While Loop", level: 1 },
  { id: 9, name: "Break/Continue", level: 1 },
  { id: 10, name: "Pass", level: 1 },
  { id: 11, name: "Strings", level: 2 },
  { id: 12, name: "Lists", level: 2 },
  { id: 13, name: "Tuples", level: 2 },
  { id: 14, name: "Sets", level: 2 },
  { id: 15, name: "Dictionaries", level: 2 },
  { id: 16, name: "List Slicing", level: 2 },
  { id: 17, name: "Functions", level: 3 },
  { id: 18, name: "Arguments", level: 3 },
  { id: 19, name: "Return Values", level: 3 },
  { id: 20, name: "Default Args", level: 3 },
  { id: 21, name: "Scope", level: 3 },
  { id: 22, name: "Lambda", level: 3 },
  { id: 23, name: "Base Case", level: 4 },
  { id: 24, name: "Recursive Functions", level: 4 },
  { id: 25, name: "Memoization", level: 4 },
  { id: 26, name: "Classes", level: 5 },
  { id: 27, name: "Objects", level: 5 },
  { id: 28, name: "Constructors", level: 5 },
  { id: 29, name: "Inheritance", level: 5 },
  { id: 30, name: "Polymorphism", level: 5 },
  { id: 31, name: "Encapsulation", level: 5 },
  { id: 32, name: "Modules", level: 6 },
  { id: 33, name: "Packages", level: 6 },
  { id: 34, name: "File Read", level: 6 },
  { id: 35, name: "File Write", level: 6 },
  { id: 36, name: "Exception Handling", level: 6 },
  { id: 37, name: "Try/Except", level: 6 },
  { id: 38, name: "Comprehensions", level: 7 },
  { id: 39, name: "Iterators", level: 7 },
  { id: 40, name: "Generators", level: 7 },
  { id: 41, name: "Decorators", level: 7 },
  { id: 42, name: "Context Managers", level: 7 },
  { id: 43, name: "Math", level: 8 },
  { id: 44, name: "OS", level: 8 },
  { id: 45, name: "Sys", level: 8 },
  { id: 46, name: "DateTime", level: 8 },
  { id: 47, name: "Collections", level: 8 },
  { id: 48, name: "Itertools", level: 8 },
  { id: 49, name: "Threading", level: 9 },
  { id: 50, name: "Multiprocessing", level: 9 },
  { id: 51, name: "Async/Await", level: 9 },
  { id: 52, name: "Event Loop", level: 9 },
  { id: 53, name: "Locks/Semaphores", level: 9 },
];

const LEVEL_LABELS = {
  0: "Foundations",
  1: "Control Flow",
  2: "Data Structures",
  3: "Functions",
  4: "Recursion",
  5: "OOP",
  6: "Modules & Files",
  7: "Advanced",
  8: "Standard Library",
  9: "Concurrency",
};

export default function PathPage() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("student_id");
  const sessionId = localStorage.getItem("session_id");

  const [masteredIds, setMasteredIds] = useState([]);
  const [currentConcept, setCurrentConcept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const [masteryRes, recRes] = await Promise.all([
        getStudentMastery(studentId),
        getRecommendation(sessionId),
      ]);
      setMasteredIds(masteryRes.data.mastered_concepts || []);
      const rec = recRes.data.recommended_concept;
      // strip level suffix to get plain name
      const recName = rec ? rec.replace(/ L\d+$/, "").trim() : null;
      setCurrentConcept(recName);
    } catch (e) {
      console.error("PathPage load error:", e);
    } finally {
      setLoading(false);
    }
  }

  function getStatus(concept) {
    if (masteredIds.includes(concept.id)) return "mastered";
    if (concept.name === currentConcept) return "current";
    return "upcoming";
  }

  const masteredCount = ALL_CONCEPTS.filter((c) =>
    masteredIds.includes(c.id),
  ).length;
  const overallPct = Math.round((masteredCount / 54) * 100);

  // Group by level
  const levels = [...new Set(ALL_CONCEPTS.map((c) => c.level))];

  const filtered = (concepts) => {
    if (filter === "mastered")
      return concepts.filter((c) => getStatus(c) === "mastered");
    if (filter === "upcoming")
      return concepts.filter((c) => getStatus(c) !== "mastered");
    return concepts;
  };

  if (loading)
    return (
      <div style={s.loadWrap}>
        <div style={s.spinner} />
        <p style={s.loadText}>Loading your path…</p>
      </div>
    );

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>My Learning Path</h1>
          <p style={s.sub}>
            {masteredCount} of 54 concepts mastered · {overallPct}%
          </p>
        </div>
        <button style={s.learnBtn} onClick={() => navigate("/dashboard/learn")}>
          Continue Learning →
        </button>
      </div>

      {/* Progress bar */}
      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${overallPct}%` }} />
      </div>

      {/* Legend */}
      <div style={s.legend}>
        <span style={s.legendItem}>✅ Mastered</span>
        <span style={s.legendItem}>🔵 Current</span>
        <span style={s.legendItem}>⭕ Upcoming</span>
      </div>

      {/* Filter tabs */}
      <div style={s.filterRow}>
        {["all", "mastered", "upcoming"].map((f) => (
          <button
            key={f}
            style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? "All"
              : f === "mastered"
                ? "✅ Mastered"
                : "⭕ Upcoming"}
          </button>
        ))}
      </div>

      {/* Concept groups by level */}
      {levels.map((level) => {
        const concepts = filtered(
          ALL_CONCEPTS.filter((c) => c.level === level),
        );
        if (concepts.length === 0) return null;
        return (
          <div key={level} style={s.group}>
            <div style={s.groupLabel}>
              {LEVEL_LABELS[level]}
              <span style={s.groupSub}> · Level {level}</span>
            </div>
            <div style={s.conceptGrid}>
              {concepts.map((c) => {
                const status = getStatus(c);
                return (
                  <div
                    key={c.id}
                    style={{
                      ...s.conceptCard,
                      ...(status === "mastered" ? s.cardMastered : {}),
                      ...(status === "current" ? s.cardCurrent : {}),
                      ...(status === "upcoming" ? s.cardUpcoming : {}),
                    }}
                    onClick={() => {
                      if (status === "current" || status === "mastered") {
                        localStorage.setItem(
                          "current_concept",
                          `${c.name} L${c.level}`,
                        );
                        navigate("/dashboard/learn");
                      }
                    }}
                  >
                    <span style={s.conceptIcon}>
                      {status === "mastered"
                        ? "✅"
                        : status === "current"
                          ? "🔵"
                          : "⭕"}
                    </span>
                    <span style={s.conceptName}>{c.name}</span>
                    {status === "current" && (
                      <span style={s.currentBadge}>Current</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={s.footerNote}>
        🤖 Path generated by Q-table RL engine · Updates after each quiz
      </div>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "760px",
    paddingBottom: "40px",
  },
  loadWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    padding: "80px 0",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #E1F5EE",
    borderTop: "3px solid #1D9E75",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadText: { fontSize: "0.88rem", color: "#888780" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
    marginBottom: "4px",
  },
  sub: { fontSize: "0.85rem", color: "#888780" },
  learnBtn: {
    padding: "10px 20px",
    borderRadius: "10px",
    background: "#1D9E75",
    color: "#fff",
    fontSize: "0.88rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
    flexShrink: 0,
  },
  progressTrack: {
    height: "8px",
    background: "#EEECE6",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "16px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
    borderRadius: "10px",
    transition: "width 0.6s ease",
  },
  legend: { display: "flex", gap: "20px", marginBottom: "16px" },
  legendItem: { fontSize: "0.8rem", color: "#888780" },
  filterRow: { display: "flex", gap: "8px", marginBottom: "24px" },
  filterBtn: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #EEECE6",
    background: "#fff",
    color: "#888780",
    fontSize: "0.8rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
  filterActive: {
    background: "#085041",
    color: "#fff",
    border: "1px solid #085041",
  },
  group: { marginBottom: "24px" },
  groupLabel: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#444441",
    letterSpacing: "0.3px",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  groupSub: { fontWeight: 400, color: "#B4B2A9", textTransform: "none" },
  conceptGrid: { display: "flex", flexDirection: "column", gap: "8px" },
  conceptCard: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #EEECE6",
    background: "#fff",
    fontSize: "0.88rem",
  },
  cardMastered: {
    background: "#F0FAF5",
    border: "1px solid #9FE1CB",
    cursor: "pointer",
  },
  cardCurrent: {
    background: "#E6F1FB",
    border: "1px solid #378ADD",
    cursor: "pointer",
  },
  cardUpcoming: { opacity: 0.6 },
  conceptIcon: { fontSize: "14px", flexShrink: 0 },
  conceptName: { flex: 1, color: "#1D1C1A", fontWeight: 500 },
  currentBadge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#185FA5",
    background: "#E6F1FB",
    border: "1px solid #B5D4F4",
    padding: "2px 8px",
    borderRadius: "20px",
  },
  footerNote: {
    fontSize: "0.78rem",
    color: "#B4B2A9",
    background: "#F7F6F2",
    border: "1px solid #EEECE6",
    borderRadius: "10px",
    padding: "12px 16px",
    marginTop: "8px",
  },
};
