import { useState, useEffect } from "react";
import axios from "axios";

export default function PipelineTab({ students }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loadingRewards, setLoadingRewards] = useState(false);

  useEffect(() => {
    if (students?.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0].id);
    }
  }, [students]);

  useEffect(() => {
    if (!selectedStudent) return;
    setLoadingRewards(true);
    axios
      // .get(`http://127.0.0.1:8000/rewards/${selectedStudent}`)
      .get(`https://pathrix-api.onrender.com/rewards/${selectedStudent}`)
      .then((res) => setRewards(res.data))
      .catch(() => setRewards([]))
      .finally(() => setLoadingRewards(false));
  }, [selectedStudent]);

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>AI Pipeline</h1>
        <p style={s.sub}>How Pathrix generates personalised recommendations</p>
      </div>

      {/* Pipeline flow */}
      <div style={s.pipeline}>
        <PipelineNode
          icon="👤"
          title="Student Input"
          color="#378ADD"
          bg="#E6F1FB"
          items={[
            "Quiz answers (correct/incorrect)",
            "Time taken per question",
            "Timed out responses",
            "Diagnostic assessment results",
          ]}
        />
        <Arrow />
        <PipelineNode
          icon="🧠"
          title="Deep Knowledge Tracing"
          subtitle="LSTM Neural Network — AUC 0.7927"
          color="#7F77DD"
          bg="#EEEDFE"
          tag="DKT v5"
          items={[
            "150 skill nodes across 10 levels",
            "Processes interaction sequence",
            "Outputs mastery probability per skill",
            "Infers related skill mastery",
          ]}
        />
        <Arrow />
        <PipelineNode
          icon="🎯"
          title="Reinforcement Learning"
          subtitle="Q-Table Agent — 54 concept nodes"
          color="#1D9E75"
          bg="#E1F5EE"
          tag="RL Agent"
          items={[
            "Builds discrete state from mastery vector",
            "Q-table lookup for best action",
            "Nearest-state fallback if unseen",
            "Recommends next concept to study",
          ]}
        />
        <Arrow />
        <PipelineNode
          icon="💡"
          title="Explainable AI Layer"
          subtitle="Transparency & Justification"
          color="#EF9F27"
          bg="#FAEEDA"
          tag="XAI"
          items={[
            "Cognitive load assessment",
            "Confidence scoring (low/medium/high)",
            "WHY explanation generation",
            "Prerequisite gap analysis",
          ]}
        />
        <Arrow />
        <PipelineNode
          icon="📚"
          title="Personalised Output"
          color="#E24B4A"
          bg="#FCEBEB"
          items={[
            "Recommended concept + level",
            "Explanation for the recommendation",
            "6-step learning path ahead",
            "Adaptive content difficulty",
          ]}
        />
      </div>

      {/* Tech stack */}
      <div style={s.techSection}>
        <div style={s.techTitle}>Technology Stack</div>
        <div style={s.techGrid}>
          <TechCard label="DKT Model" value="PyTorch LSTM" color="#7F77DD" />
          <TechCard
            label="RL Agent"
            value="Q-Table (54 nodes)"
            color="#1D9E75"
          />
          <TechCard label="Backend" value="FastAPI + SQLite" color="#378ADD" />
          <TechCard label="Frontend" value="React + Axios" color="#EF9F27" />
          <TechCard label="Training AUC" value="0.7927" color="#E24B4A" />
          <TechCard
            label="Concepts"
            value="54 across 10 levels"
            color="#888780"
          />
        </div>
      </div>

      {/* How it works */}
      <div style={s.howSection}>
        <div style={s.howTitle}>How Personalisation Works</div>
        <div style={s.howGrid}>
          <HowCard
            step="1"
            title="Cold Start → Diagnostic"
            color="#378ADD"
            desc="New students take a 15-question diagnostic quiz. Answers are fed to DKT to establish initial mastery profile and skip already-known concepts."
          />
          <HowCard
            step="2"
            title="Interaction Accumulation"
            color="#7F77DD"
            desc="Every quiz answer is permanently stored in the interactions DB. DKT runs on the full accumulated history — mastery improves with each session."
          />
          <HowCard
            step="3"
            title="RL-Based Recommendation"
            color="#1D9E75"
            desc="The Q-table agent maps current mastery state to optimal next concept. Concepts above 0.6 mastery threshold are automatically skipped."
          />
          <HowCard
            step="4"
            title="Adaptive Difficulty"
            color="#EF9F27"
            desc="Content difficulty adjusts based on mastery percentage: easy (<45%), medium (45-65%), hard (>65%). Cognitive load modulates pacing."
          />
        </div>
      </div>

      {/* ── Live RL Rewards */}
      <div style={s.rewardsSection}>
        <div style={s.techTitle}>Live RL Reward Signal</div>
        {students?.length > 0 && (
          <div style={s.selectorRow}>
            <span style={s.selectorLabel}>Student:</span>
            <select
              style={s.selector}
              value={selectedStudent || ""}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.profile})
                </option>
              ))}
            </select>
          </div>
        )}
        {loadingRewards ? (
          <p style={{ color: "#888780", fontSize: "0.85rem" }}>
            Loading rewards…
          </p>
        ) : rewards.length === 0 ? (
          <p style={{ color: "#888780", fontSize: "0.85rem" }}>
            No rewards yet — student needs to take a quiz first.
          </p>
        ) : (
          <div style={s.rewardsTable}>
            <div style={s.rewardsHeader}>
              <span>Concept</span>
              <span>Score</span>
              <span>Mastery Δ</span>
              <span>Reward</span>
            </div>
            {rewards.map((r, i) => (
              <div
                key={i}
                style={{
                  ...s.rewardsRow,
                  background:
                    r.reward > 0.3
                      ? "#E1F5EE"
                      : r.reward > 0
                        ? "#FAFAF8"
                        : "#FCEBEB",
                }}
              >
                <span style={s.rewardConcept}>{r.concept}</span>
                <span style={s.rewardScore}>
                  {r.score}/{r.total}
                </span>
                <span style={s.rewardDelta}>
                  {r.mastery_before}% → {r.mastery_after}%
                </span>
                <span
                  style={{
                    ...s.rewardValue,
                    color: r.reward > 0 ? "#1D9E75" : "#E24B4A",
                    fontWeight: 700,
                  }}
                >
                  {r.reward >= 0 ? "+" : ""}
                  {r.reward}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PipelineNode({ icon, title, subtitle, color, bg, items, tag }) {
  return (
    <div
      style={{ ...s.node, background: bg, border: `1.5px solid ${color}44` }}
    >
      <div style={s.nodeHeader}>
        <span style={s.nodeIcon}>{icon}</span>
        <div>
          <div style={{ ...s.nodeTitle, color }}>{title}</div>
          {subtitle && <div style={s.nodeSub}>{subtitle}</div>}
        </div>
        {tag && (
          <div style={{ ...s.nodeTag, color, background: color + "18" }}>
            {tag}
          </div>
        )}
      </div>
      <ul style={s.nodeList}>
        {items.map((item, i) => (
          <li key={i} style={s.nodeItem}>
            <span style={{ ...s.nodeDot, background: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div style={s.arrow}>
      <div style={s.arrowLine} />
      <div style={s.arrowHead}>▼</div>
    </div>
  );
}

function TechCard({ label, value, color }) {
  return (
    <div style={{ ...s.techCard, borderLeft: `3px solid ${color}` }}>
      <div style={s.techLabel}>{label}</div>
      <div style={{ ...s.techValue, color }}>{value}</div>
    </div>
  );
}

function HowCard({ step, title, desc, color }) {
  return (
    <div style={s.howCard}>
      <div style={{ ...s.howStep, background: color }}>{step}</div>
      <div style={{ ...s.howCardTitle, color }}>{title}</div>
      <p style={s.howDesc}>{desc}</p>
    </div>
  );
}

const s = {
  page: { fontFamily: "'Sora', sans-serif", paddingBottom: "40px" },
  header: { marginBottom: "28px" },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
    marginBottom: "4px",
  },
  sub: { fontSize: "0.85rem", color: "#888780" },
  pipeline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0",
    marginBottom: "40px",
  },
  node: {
    width: "100%",
    maxWidth: "680px",
    borderRadius: "14px",
    padding: "20px 24px",
  },
  nodeHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  nodeIcon: { fontSize: "1.5rem", flexShrink: 0 },
  nodeTitle: { fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.2px" },
  nodeSub: { fontSize: "0.78rem", color: "#888780", marginTop: "2px" },
  nodeTag: {
    marginLeft: "auto",
    fontSize: "0.7rem",
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: "4px",
    flexShrink: 0,
  },
  nodeList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    paddingLeft: "0",
  },
  nodeItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.85rem",
    color: "#444441",
  },
  nodeDot: { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 },
  arrow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0",
    padding: "4px 0",
  },
  arrowLine: { width: "2px", height: "20px", background: "#EEECE6" },
  arrowHead: { fontSize: "0.7rem", color: "#EEECE6", lineHeight: 1 },
  techSection: { marginBottom: "32px" },
  techTitle: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "14px",
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "12px",
  },
  techCard: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "10px",
    padding: "14px 16px",
  },
  techLabel: { fontSize: "0.75rem", color: "#888780", marginBottom: "4px" },
  techValue: { fontSize: "0.92rem", fontWeight: 600 },
  howSection: { marginBottom: "32px" },
  howTitle: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "14px",
  },
  howGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "16px",
  },
  howCard: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "20px",
  },
  howStep: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    fontWeight: 700,
    marginBottom: "10px",
  },
  howCardTitle: { fontSize: "0.92rem", fontWeight: 700, marginBottom: "8px" },
  howDesc: {
    fontSize: "0.82rem",
    color: "#888780",
    lineHeight: 1.6,
    margin: 0,
  },
  rewardsSection: { marginTop: "32px" },
  selectorRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
  },
  selectorLabel: { fontSize: "0.82rem", color: "#888780" },
  selector: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #EEECE6",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.82rem",
  },
  rewardsTable: {
    border: "1px solid #EEECE6",
    borderRadius: "12px",
    overflow: "hidden",
  },
  rewardsHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 2fr 1fr",
    padding: "10px 16px",
    background: "#F7F6F2",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "0.5px",
  },
  rewardsRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 2fr 1fr",
    padding: "10px 16px",
    borderTop: "1px solid #EEECE6",
    fontSize: "0.82rem",
  },
  rewardConcept: { color: "#1D1C1A", fontWeight: 500 },
  rewardScore: { color: "#888780" },
  rewardDelta: { color: "#888780" },
  rewardValue: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.82rem",
  },
};
