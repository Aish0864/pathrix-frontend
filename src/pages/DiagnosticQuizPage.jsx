import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRandomDiagnosticQuestions,
  getSections,
} from "../services/diagnosticService";
import { submitQuiz } from "../api";
import TimerRing from "../components/learner/TimerRing";

const TIMER = 15;
const EARLY_ABORT = 5;

export default function DiagnosticQuizPage() {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("session_id");
  const studentId = localStorage.getItem("student_id");

  const [questions] = useState(() => getRandomDiagnosticQuestions(5));
  const [sections] = useState(getSections());
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [answers, setAnswers] = useState([]);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);
  const startRef = { current: Date.now() };
  useEffect(() => {
    const init = async () => {
      if (!localStorage.getItem("session_id")) {
        const { startSession } = await import("../api");
        const sessionRes = await startSession(studentId);
        localStorage.setItem("session_id", sessionRes.data.session_id);
      }
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!started) return;
    startRef.current = Date.now();
    setTimeLeft(TIMER);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleAnswer(null, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current, started]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const check = async () => {
      if (studentId) {
        const { checkFirstLogin } = await import("../api");
        const res = await checkFirstLogin(studentId);
        if (!res.data.is_first) {
          navigate("/dashboard");
        }
      }
    };
    check();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleAnswer = (optIndex, timedOut = false) => {
    if (answered) return;
    setAnswered(true);

    const q = questions[current];
    const correct = !timedOut && optIndex === q.ans;
    setSelected(timedOut ? -1 : optIndex);

    const newAnswer = { skill_id: q.skill_id, correct, optIndex };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    const newWrong = correct ? 0 : consecutiveWrong + 1;
    setConsecutiveWrong(newWrong);

    // Early abort — 5 consecutive wrong
    if (newWrong >= EARLY_ABORT) {
      setTimeout(() => finishDiagnostic(newAnswers), 1200);
      return;
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        finishDiagnostic(newAnswers);
      }
    }, 1200);
  };

  const finishDiagnostic = async (finalAnswers) => {
    setSubmitting(true);
    try {
      for (const a of finalAnswers) {
        await submitQuiz(
          sessionId,
          studentId,
          a.skill_id,
          a.correct ? 1 : 0,
          TIMER,
          false,
        );
      }
    } catch (e) {
      console.error("Diagnostic submit error:", e);
    }

    // Mark concepts mastered per section score
    try {
      const { markMastered } = await import("../api");

      const SECTION_CONCEPTS = {
        0: [0, 1, 2, 3, 4], // Variables, Data Types, Operators, I/O, Comments
        1: [11, 12, 13, 14, 15, 16], // Strings, Lists, Tuples, Sets, Dicts, List Slicing
        2: [5, 6, 7, 8, 9, 10, 17, 18, 19], // Control Flow + Functions
      };

      for (let section = 0; section < 3; section++) {
        const start = section * 5;
        const end = start + 5;
        const sectionAnswers = finalAnswers.slice(start, end);
        const sectionScore = sectionAnswers.filter((a) => a.correct).length;
        const sectionTotal = sectionAnswers.length;

        console.log(`Section ${section}: ${sectionScore}/${sectionTotal}`);

        const concepts = SECTION_CONCEPTS[section] || [];
        for (const conceptId of concepts) {
          await markMastered(studentId, conceptId, sectionScore, sectionTotal);
        }
      }
    } catch (e) {
      console.error("Diagnostic markMastered error:", e);
    }

    const score = finalAnswers.filter((a) => a.correct).length;
    const total = finalAnswers.length;
    const aborted = finalAnswers.length < questions.length;
    localStorage.setItem("diagnostic_aborted", aborted ? "true" : "false");
    localStorage.setItem(
      "diagnostic_questions_total",
      String(questions.length),
    );
    const pct = Math.round((score / total) * 100);
    const level =
      pct >= 80 ? "Advanced" : pct >= 50 ? "Intermediate" : "Beginner";
    const levelColor =
      pct >= 80 ? "#7F77DD" : pct >= 50 ? "#EF9F27" : "#1D9E75";
    const skipCount = pct >= 80 ? "10+" : pct >= 50 ? "5" : "0";

    // Save to localStorage for sidebar
    localStorage.setItem("diagnostic_level", level);
    localStorage.setItem("diagnostic_score", `${score}/${total}`);
    localStorage.setItem(
      "diagnostic_results",
      JSON.stringify(
        finalAnswers.map((a, i) => ({
          correct: a.correct,
          timedOut: false,
          questionNum: i + 1,
        })),
      ),
    );
    const wasAborted = finalAnswers.length < questions.length;
    localStorage.setItem("diagnostic_aborted", wasAborted ? "true" : "false");
    localStorage.setItem(
      "diagnostic_questions_total",
      String(questions.length),
    );

    setResult({ score, total, pct, level, levelColor, skipCount });
    setSubmitting(false);
  };

  // Section detection
  const getSectionIndex = (qIndex) => Math.floor(qIndex / 5);
  const sectionProgress = [0, 1, 2].map((i) => {
    const start = i * 5;
    const end = start + 5;

    if (current < start) return "pending";
    if (current >= end) return "done";
    return "active";
  });
  if (!started) {
    return (
      <div style={s.page}>
        <div style={s.instrCard}>
          <div style={s.logoText}>Pathrix</div>
          <h1 style={s.title}>Welcome to Pathrix 👋</h1>
          <p style={s.instrSub}>
            Before we start, we need to understand your current Python knowledge
            level.
          </p>

          <div style={s.instrBox}>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>🎯</span>
              <div>
                <div style={s.instrItemTitle}>What is this?</div>
                <div style={s.instrItemText}>
                  A 15-question diagnostic quiz across 3 sections — Python
                  Basics, Data Structures, and Logic & Functions.
                </div>
              </div>
            </div>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>⏱</span>
              <div>
                <div style={s.instrItemTitle}>How long?</div>
                <div style={s.instrItemText}>
                  3–5 minutes. 30 seconds per question. It stops early if you
                  get 5 wrong in a row.
                </div>
              </div>
            </div>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>🧠</span>
              <div>
                <div style={s.instrItemTitle}>Why do we ask?</div>
                <div style={s.instrItemText}>
                  Your answers train our AI to skip concepts you already know
                  and focus on what you need to learn.
                </div>
              </div>
            </div>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>✅</span>
              <div>
                <div style={s.instrItemTitle}>Done only once</div>
                <div style={s.instrItemText}>
                  This assessment is taken once. Future sessions use your
                  accumulated learning history instead.
                </div>
              </div>
            </div>
          </div>

          <button style={s.startQuizBtn} onClick={() => setStarted(true)}>
            Start Assessment →
          </button>
        </div>
      </div>
    );
  }
  if (submitting) {
    return (
      <div style={s.loadWrap}>
        <div style={s.spinner} />
        <div style={s.loadTitle}>Analysing your responses…</div>
        <div style={s.loadSub}>Building your personalised learning path</div>
      </div>
    );
  }
  if (result) {
    return (
      <div style={s.page}>
        <div style={s.instrCard}>
          <div style={s.logoText}>Pathrix</div>
          <h1 style={s.title}>Assessment Complete! 🎉</h1>

          {/* Score */}
          <div style={s.resultScoreCard}>
            <div style={s.resultBigScore}>
              <span style={{ ...s.resultNum, color: result.levelColor }}>
                {result.score}
              </span>
              <span style={s.resultSlash}>/{result.total}</span>
            </div>
            <div>
              <div style={{ ...s.resultLevel, color: result.levelColor }}>
                {result.level}
              </div>
              <div style={s.resultLevelSub}>Your Python level</div>
            </div>
          </div>

          {/* What this means */}
          <div style={s.instrBox}>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>📊</span>
              <div>
                <div style={s.instrItemTitle}>Your score</div>
                <div style={s.instrItemText}>
                  {result.pct}% correct — placed at{" "}
                  <strong>{result.level}</strong> level
                </div>
              </div>
            </div>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>⏭</span>
              <div>
                <div style={s.instrItemTitle}>Concepts being skipped</div>
                <div style={s.instrItemText}>
                  Based on your answers,{" "}
                  <strong>{result.skipCount} beginner concepts</strong> will be
                  skipped. Your path starts at the right level for you.
                </div>
              </div>
            </div>
            <div style={s.instrItem}>
              <span style={s.instrIcon}>🗺️</span>
              <div>
                <div style={s.instrItemTitle}>What happens next</div>
                <div style={s.instrItemText}>
                  Your personalised learning path has been generated. The AI
                  will recommend concepts based on your current mastery level.
                </div>
              </div>
            </div>
          </div>

          <button style={s.startQuizBtn} onClick={() => navigate("/dashboard")}>
            Go to My Dashboard →
          </button>
        </div>
      </div>
    );
  }
  const q = questions[current];

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.logoText}>Pathrix</div>
          <h1 style={s.title}>Diagnostic Assessment</h1>
          <p style={s.sub}>
            Helps us personalise your learning path — only done once
          </p>
        </div>
        <TimerRing timeLeft={timeLeft} total={TIMER} />
      </div>

      {/* Section progress */}
      <div style={s.sections}>
        {sections.map((sec, i) => (
          <div key={i} style={s.sectionChip}>
            <div
              style={{
                ...s.sectionDot,
                background:
                  sectionProgress[i] === "done"
                    ? "#1D9E75"
                    : sectionProgress[i] === "active"
                      ? "#378ADD"
                      : "#EEECE6",
              }}
            />
            <span
              style={{
                ...s.sectionLabel,
                color: sectionProgress[i] === "active" ? "#1D1C1A" : "#888780",
                fontWeight: sectionProgress[i] === "active" ? 600 : 400,
              }}
            >
              {sec}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={s.progressWrap}>
        <div style={s.progressTrack}>
          <div
            style={{
              ...s.progressFill,
              width: `${(current / questions.length) * 100}%`,
            }}
          />
        </div>
        <span style={s.progressText}>
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <div style={s.questionCard}>
        <div style={s.qNum}>
          Question {current + 1} of {questions.length}
        </div>
        <p style={s.qText}>{q.q}</p>
      </div>

      {/* Options */}
      <div style={s.options}>
        {q.opts.map((opt, i) => {
          let bg = "#fff";
          let border = "1.5px solid #EEECE6";
          let color = "#444441";

          if (answered) {
            if (i === q.ans) {
              bg = "#E1F5EE";
              border = "2px solid #1D9E75";
              color = "#085041";
            } else if (i === selected && i !== q.ans) {
              bg = "#FCEBEB";
              border = "2px solid #E24B4A";
              color = "#791F1F";
            }
          }

          return (
            <button
              key={i}
              style={{ ...s.option, background: bg, border, color }}
              onClick={() => handleAnswer(i)}
              disabled={answered}
            >
              <span style={s.optLetter}>{["A", "B", "C", "D"][i]}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          style={{
            ...s.feedback,
            background: answers[answers.length - 1]?.correct
              ? "#E1F5EE"
              : "#FCEBEB",
            color: answers[answers.length - 1]?.correct ? "#085041" : "#791F1F",
            border: `1px solid ${answers[answers.length - 1]?.correct ? "#9FE1CB" : "#F09595"}`,
          }}
        >
          {answers[answers.length - 1]?.correct ? "✓ Correct!" : "✗ Incorrect"}
        </div>
      )}

      {/* Footer note */}
      <div style={s.footerNote}>
        🧠 Your answers help our AI place you at the right level — no pressure,
        just answer honestly.
      </div>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "680px",
    margin: "0 auto",
    padding: "40px 24px",
    minHeight: "100vh",
    background: "#F7F6F2",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
  },
  logoText: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1D9E75",
    marginBottom: "6px",
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
  sections: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  sectionChip: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sectionDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
    transition: "background 0.3s",
  },
  sectionLabel: {
    fontSize: "0.82rem",
    transition: "color 0.3s",
  },
  progressWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  progressTrack: {
    flex: 1,
    height: "6px",
    background: "#EEECE6",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
    borderRadius: "10px",
    transition: "width 0.4s ease",
  },
  progressText: {
    fontSize: "0.78rem",
    color: "#888780",
    flexShrink: 0,
  },
  questionCard: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "20px",
  },
  qNum: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  qText: {
    fontSize: "1.05rem",
    fontWeight: 500,
    color: "#1D1C1A",
    lineHeight: 1.6,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "16px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 18px",
    borderRadius: "10px",
    fontSize: "0.92rem",
    fontFamily: "'Sora', sans-serif",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
  },
  optLetter: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#F1EFE8",
    color: "#888780",
    fontSize: "0.78rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  feedback: {
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "0.88rem",
    fontWeight: 600,
    marginBottom: "16px",
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
  loadWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "12px",
    fontFamily: "'Sora', sans-serif",
    background: "#F7F6F2",
  },
  spinner: {
    width: "44px",
    height: "44px",
    border: "3px solid #E1F5EE",
    borderTop: "3px solid #1D9E75",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#1D1C1A",
    marginTop: "8px",
  },
  loadSub: {
    fontSize: "0.85rem",
    color: "#888780",
  },
  instrCard: {
    maxWidth: "580px",
    margin: "0 auto",
    paddingTop: "40px",
  },
  instrSub: {
    fontSize: "0.95rem",
    color: "#888780",
    lineHeight: 1.6,
    marginBottom: "28px",
  },
  instrBox: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  instrItem: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },
  instrIcon: {
    fontSize: "1.4rem",
    flexShrink: 0,
    marginTop: "2px",
  },
  instrItemTitle: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#1D1C1A",
    marginBottom: "4px",
  },
  instrItemText: {
    fontSize: "0.85rem",
    color: "#888780",
    lineHeight: 1.5,
  },
  startQuizBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    background: "#1D9E75",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
  resultScoreCard: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "24px 28px",
    marginBottom: "20px",
  },
  resultBigScore: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    flexShrink: 0,
  },
  resultNum: {
    fontSize: "3.5rem",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-2px",
  },
  resultSlash: {
    fontSize: "1.8rem",
    fontWeight: 400,
    color: "#B4B2A9",
  },
  resultLevel: {
    fontSize: "1.4rem",
    fontWeight: 700,
    letterSpacing: "-0.3px",
    marginBottom: "4px",
  },
  resultLevelSub: {
    fontSize: "0.85rem",
    color: "#888780",
  },
};
