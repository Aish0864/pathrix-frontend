import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateConceptContent } from "../../services/contentService";
import { getLinks } from "../../data/externalLinks";
import { getRecommendation } from "../../api";

export default function LearnPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const concept = localStorage.getItem("current_concept") || "Variables";
  const sessionId = localStorage.getItem("session_id");
  const profile = "beginner";
  const masteryPct = 0;
  const cognitiveLoad = localStorage.getItem("cognitive_load") || "low";

  // Parse concept name + level
  const parts = concept.match(/^(.+?)\s+L(\d+)$/);
  const conceptName = parts ? parts[1] : concept;
  const level = parts ? parseInt(parts[2]) : 0;
  const links = getLinks(level);

  useEffect(() => {
    const load = async () => {
      try {
        let conceptToLoad = localStorage.getItem("current_concept");
        if (!conceptToLoad && sessionId) {
          const recRes = await getRecommendation(sessionId);
          conceptToLoad = recRes.data.recommended_concept;
          localStorage.setItem("current_concept", conceptToLoad);
          localStorage.setItem(
            "cognitive_load",
            recRes.data.cognitive_load || "low",
          );
        }
        const data = await generateConceptContent(
          conceptName,
          profile,
          masteryPct,
          null,
          cognitiveLoad,
        );
        setContent(data);
        const shuffled = [...data.quiz].sort(() => Math.random() - 0.5);
        localStorage.setItem("quiz_questions", JSON.stringify(shuffled));
        localStorage.setItem("quiz_concept", conceptToLoad || concept);
      } catch (e) {
        setError("Failed to generate content. Please try again.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <LoadingScreen concept={conceptName} />;
  if (error)
    return (
      <ErrorScreen message={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.titleRow}>
          <h1 style={s.title}>{conceptName}</h1>
          <span style={s.levelBadge}>Level {level}</span>
        </div>
        <p style={s.profileLine}>
          Content tailored for <strong>{profile}</strong> · Load:{" "}
          <strong>{cognitiveLoad}</strong>
        </p>
      </div>

      {/* Explanation */}
      <div style={s.card}>
        <div style={s.cardLabel}>EXPLANATION</div>
        <p style={s.explanation}>{content.explanation}</p>
      </div>

      {/* Code block */}
      <div style={s.codeCard}>
        <div style={s.codeHeader}>
          <span style={s.codeLabel}>PYTHON EXAMPLE</span>
          <span style={s.codeDot} />
          <span style={s.codeDot} />
          <span style={s.codeDot} />
        </div>
        <pre style={s.code}>{content.code}</pre>
      </div>

      {/* Key points */}
      <div style={s.card}>
        <div style={s.cardLabel}>KEY POINTS</div>
        <div style={s.keypoints}>
          {content.keypoints.map((pt, i) => (
            <div key={i} style={s.keypoint}>
              <span style={s.keypointNum}>{i + 1}</span>
              <span style={s.keypointText}>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* External links */}
      <div style={s.card}>
        <div style={s.cardLabel}>RESOURCES</div>
        <div style={s.linkRow}>
          <LinkChip
            href={links.docs}
            label="Python Docs"
            color="#378ADD"
            bg="#E6F1FB"
          />
          <LinkChip
            href={links.w3}
            label="W3Schools"
            bg="#E1F5EE"
            color="#1D9E75"
          />
          <LinkChip
            href={links.yt}
            label="YouTube"
            bg="#FCEBEB"
            color="#E24B4A"
          />
        </div>
      </div>

      {/* CTA */}
      <button
        style={s.quizBtn}
        onClick={() => {
          navigate("/dashboard/quiz", {
            state: { questions: content.quiz, concept },
          });
        }}
      >
        Take the Quiz →
      </button>
    </div>
  );
}

function LinkChip({ href, label, color, bg }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ ...s.chip, color, background: bg }}
    >
      {label} ↗
    </a>
  );
}

function LoadingScreen({ concept }) {
  return (
    <div style={s.loadWrap}>
      <div style={s.loadSpinner} />
      <div style={s.loadTitle}>Generating content for</div>
      <div style={s.loadConcept}>{concept}</div>
      <div style={s.loadSub}>Claude is tailoring this to your level…</div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div style={s.loadWrap}>
      <div style={s.errorMsg}>{message}</div>
      <button style={s.retryBtn} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Sora', sans-serif",
    maxWidth: "760px",
    paddingBottom: "40px",
  },
  header: {
    marginBottom: "24px",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "6px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.5px",
  },
  levelBadge: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#085041",
    background: "#E1F5EE",
    border: "1px solid #9FE1CB",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  profileLine: {
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
    marginBottom: "12px",
  },
  explanation: {
    fontSize: "0.95rem",
    color: "#444441",
    lineHeight: 1.7,
  },

  codeCard: {
    background: "#1D1C1A",
    borderRadius: "14px",
    marginBottom: "16px",
    overflow: "hidden",
  },
  codeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderBottom: "1px solid #2C2C2A",
  },
  codeLabel: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: "#888780",
    letterSpacing: "1px",
  },
  codeDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#444441",
    display: "inline-block",
    marginLeft: "6px",
  },
  code: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.88rem",
    color: "#E1F5EE",
    padding: "20px 24px",
    margin: 0,
    whiteSpace: "pre-wrap",
    lineHeight: 1.7,
  },

  keypoints: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  keypoint: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  keypointNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#E1F5EE",
    color: "#085041",
    fontSize: "0.75rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  keypointText: {
    fontSize: "0.9rem",
    color: "#444441",
    lineHeight: 1.6,
    paddingTop: "2px",
  },

  linkRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  chip: {
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "opacity 0.15s",
  },

  quizBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    background: "#085041",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
    marginTop: "8px",
  },

  loadWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "12px",
    fontFamily: "'Sora', sans-serif",
  },
  loadSpinner: {
    width: "44px",
    height: "44px",
    border: "3px solid #E1F5EE",
    borderTop: "3px solid #1D9E75",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadTitle: {
    fontSize: "0.85rem",
    color: "#888780",
    marginTop: "8px",
  },
  loadConcept: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
  },
  loadSub: {
    fontSize: "0.8rem",
    color: "#B4B2A9",
  },
  errorMsg: {
    fontSize: "0.9rem",
    color: "#E24B4A",
    background: "#FCEBEB",
    padding: "12px 20px",
    borderRadius: "10px",
  },
  retryBtn: {
    padding: "10px 24px",
    borderRadius: "8px",
    background: "#1D9E75",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
};
