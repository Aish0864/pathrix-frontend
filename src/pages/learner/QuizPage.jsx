import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { submitQuiz } from "../../api";
import TimerRing from "../../components/learner/TimerRing";
import { useLocation } from "react-router-dom";

const TIMER = 30;

export default function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const questions =
    location.state?.questions ||
    JSON.parse(localStorage.getItem("quiz_questions") || "[]");
  const concept =
    location.state?.concept ||
    localStorage.getItem("quiz_concept") ||
    "Unknown";
  const studentId = localStorage.getItem("student_id");
  const sessionId = localStorage.getItem("session_id");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setTimeLeft(TIMER);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = (optIndex, timedOut = false) => {
    if (answered) return;
    clearInterval(timerRef.current);
    setAnswered(true);

    const timeTaken = Math.round((Date.now() - startRef.current) / 1000);
    const q = questions[current];
    const correct = !timedOut && optIndex === q.ans;
    setSelected(timedOut ? -1 : optIndex);

    const conceptName = concept.split(" L")[0].trim();

    const skillMap = {
      Variables: 0,
      "Data Types": 1,
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
    const skillId = skillMap[conceptName] ?? 11;
    submitQuiz(
      sessionId,
      studentId,
      skillId,
      correct,
      timeTaken,
      timedOut,
    ).catch(() => {});
    const newResults = [...results, { correct, timedOut, optIndex }];
    setResults(newResults);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        const score = newResults.filter((r) => r.correct).length;
        localStorage.setItem("quiz_score", score);
        localStorage.setItem("quiz_total", questions.length);
        localStorage.setItem("quiz_results", JSON.stringify(newResults));
        navigate("/dashboard/result", {
          state: { concept, score, total: questions.length },
        });
      }
    }, 1200);
  };

  if (!questions.length) {
    return (
      <div style={s.empty}>
        <p>No quiz questions found.</p>
        <button style={s.backBtn} onClick={() => navigate("/dashboard/learn")}>
          ← Back to Learn
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.conceptTag}>{concept}</div>
          <h2 style={s.title}>Quick Quiz</h2>
        </div>
        <TimerRing timeLeft={timeLeft} total={TIMER} />
      </div>

      {/* Progress dots */}
      <div style={s.dots}>
        {questions.map((_, i) => (
          <div
            key={i}
            style={{
              ...s.dot,
              background:
                i < current
                  ? results[i]?.correct
                    ? "#1D9E75"
                    : "#E24B4A"
                  : i === current
                    ? "#378ADD"
                    : "#EEECE6",
            }}
          />
        ))}
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
            background: results[current]?.correct ? "#E1F5EE" : "#FCEBEB",
            color: results[current]?.correct ? "#085041" : "#791F1F",
            border: `1px solid ${results[current]?.correct ? "#9FE1CB" : "#F09595"}`,
          }}
        >
          {results[current]?.timedOut
            ? "⏱ Time up! Moving on…"
            : results[current]?.correct
              ? "✓ Correct!"
              : "✗ Incorrect"}
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "680px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  conceptTag: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#1D9E75",
    background: "#E1F5EE",
    border: "1px solid #9FE1CB",
    padding: "3px 10px",
    borderRadius: "20px",
    display: "inline-block",
    marginBottom: "6px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
  },
  dots: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
  },
  dot: {
    width: "36px",
    height: "8px",
    borderRadius: "4px",
    transition: "background 0.3s",
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
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "60px",
    fontFamily: "'Sora', sans-serif",
    color: "#888780",
  },
  backBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#1D9E75",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
};
