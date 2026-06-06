import { useState, useEffect } from "react";
import axios from "axios";

const BASE = "http://127.0.0.1:8000";

export default function ABComparisonTab() {
  const [students, setStudents] = useState([]);
  const [studentA, setStudentA] = useState(null);
  const [studentB, setStudentB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE}/admin/students`)
      .then((res) => setStudents(res.data.students))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const levelColor = (level) =>
    ({
      beginner: "#1D9E75",
      intermediate: "#EF9F27",
      advanced: "#7F77DD",
    })[level?.toLowerCase()] || "#888780";

  const initials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  if (loading)
    return (
      <div style={s.loadWrap}>
        <div style={s.spinner} />
        <p style={s.loadText}>Loading students…</p>
      </div>
    );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>A/B Comparison</h1>
        <p style={s.sub}>Compare two student profiles side by side</p>
      </div>

      {/* Student selectors */}
      <div style={s.selectors}>
        <StudentSelector
          label="Student A"
          color="#378ADD"
          students={students}
          selected={studentA}
          onSelect={setStudentA}
          exclude={studentB?.id}
        />
        <div style={s.vsCircle}>VS</div>
        <StudentSelector
          label="Student B"
          color="#7F77DD"
          students={students}
          selected={studentB}
          onSelect={setStudentB}
          exclude={studentA?.id}
        />
      </div>

      {/* Comparison */}
      {studentA && studentB ? (
        <div style={s.comparison}>
          {/* Profile row */}
          <div style={s.compRow}>
            <ProfileCard
              student={studentA}
              color="#378ADD"
              initials={initials}
              levelColor={levelColor}
            />
            <div style={s.rowLabel}>Profile</div>
            <ProfileCard
              student={studentB}
              color="#7F77DD"
              initials={initials}
              levelColor={levelColor}
            />
          </div>

          {/* Metrics */}
          {[
            {
              label: "Interactions",
              keyA: "interaction_count",
              keyB: "interaction_count",
            },
            { label: "Sessions", keyA: "session_count", keyB: "session_count" },
            {
              label: "Overall Progress",
              keyA: "overall_progress",
              keyB: "overall_progress",
              suffix: "%",
            },
            { label: "Level", keyA: "profile", keyB: "profile" },
            {
              label: "Last Concept",
              keyA: "last_recommendation",
              keyB: "last_recommendation",
            },
            {
              label: "Cognitive Load",
              keyA: "cognitive_load",
              keyB: "cognitive_load",
            },
            { label: "Confidence", keyA: "confidence", keyB: "confidence" },
          ].map((metric, i) => (
            <MetricRow
              key={i}
              label={metric.label}
              valA={studentA[metric.keyA]}
              valB={studentB[metric.keyB]}
              suffix={metric.suffix}
              colorA="#378ADD"
              colorB="#7F77DD"
            />
          ))}

          {/* Mastery bar comparison */}
          <div style={s.barSection}>
            <div style={s.barLabel}>Mastery Comparison</div>
            <div style={s.barRow}>
              <span style={s.barName}>{studentA.name.split(" ")[0]}</span>
              <div style={s.barTrack}>
                <div
                  style={{
                    ...s.barFill,
                    width: `${studentA.overall_progress}%`,
                    background: "#378ADD",
                  }}
                />
              </div>
              <span style={{ ...s.barPct, color: "#378ADD" }}>
                {Math.round(studentA.overall_progress)}%
              </span>
            </div>
            <div style={s.barRow}>
              <span style={s.barName}>{studentB.name.split(" ")[0]}</span>
              <div style={s.barTrack}>
                <div
                  style={{
                    ...s.barFill,
                    width: `${studentB.overall_progress}%`,
                    background: "#7F77DD",
                  }}
                />
              </div>
              <span style={{ ...s.barPct, color: "#7F77DD" }}>
                {Math.round(studentB.overall_progress)}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div style={s.placeholder}>
          <div style={s.placeholderIcon}>📊</div>
          <p style={s.placeholderText}>
            Select two students above to compare their profiles
          </p>
        </div>
      )}
    </div>
  );
}

function StudentSelector({
  label,
  color,
  students,
  selected,
  onSelect,
  exclude,
}) {
  return (
    <div style={s.selectorWrap}>
      <div style={{ ...s.selectorLabel, color }}>{label}</div>
      <select
        style={{ ...s.select, borderColor: color }}
        value={selected?.id || ""}
        onChange={(e) => {
          const student = students.find((s) => s.id === e.target.value);
          onSelect(student || null);
        }}
      >
        <option value="">Select student…</option>
        {students
          .filter((s) => s.id !== exclude)
          .map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.email})
            </option>
          ))}
      </select>
    </div>
  );
}

function ProfileCard({ student, color, initials, levelColor }) {
  return (
    <div style={{ ...s.profileCard, borderColor: color + "44" }}>
      <div style={{ ...s.avatar, background: color }}>
        {initials(student.name)}
      </div>
      <div style={s.profileName}>{student.name}</div>
      <div style={s.profileEmail}>{student.email}</div>
      <div
        style={{
          ...s.levelBadge,
          color: levelColor(student.profile),
          background: levelColor(student.profile) + "18",
        }}
      >
        {student.profile || "beginner"}
      </div>
    </div>
  );
}

function MetricRow({ label, valA, valB, suffix = "", colorA, colorB }) {
  const displayA = valA != null ? `${valA}${suffix}` : "N/A";
  const displayB = valB != null ? `${valB}${suffix}` : "N/A";
  const numA = parseFloat(valA);
  const numB = parseFloat(valB);
  const isNum = !isNaN(numA) && !isNaN(numB);

  return (
    <div style={s.metricRow}>
      <div
        style={{
          ...s.metricVal,
          color: isNum && numA > numB ? colorA : "#444441",
        }}
      >
        {displayA}
      </div>
      <div style={s.metricLabel}>{label}</div>
      <div
        style={{
          ...s.metricVal,
          color: isNum && numB > numA ? colorB : "#444441",
          textAlign: "right",
        }}
      >
        {displayB}
      </div>
    </div>
  );
}

const s = {
  page: { fontFamily: "'Sora', sans-serif" },
  header: { marginBottom: "28px" },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
    marginBottom: "4px",
  },
  sub: { fontSize: "0.85rem", color: "#888780" },
  selectors: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "28px",
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "20px 24px",
  },
  selectorWrap: { flex: 1 },
  selectorLabel: {
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid",
    fontSize: "0.88rem",
    fontFamily: "'Sora', sans-serif",
    background: "#fff",
    color: "#444441",
    outline: "none",
  },
  vsCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#F1EFE8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#888780",
    flexShrink: 0,
  },
  comparison: {
    background: "#fff",
    border: "1px solid #EEECE6",
    borderRadius: "14px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  compRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "16px",
    alignItems: "center",
    marginBottom: "20px",
  },
  rowLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "1px",
    textAlign: "center",
    textTransform: "uppercase",
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    borderRadius: "10px",
    border: "1.5px solid",
    gap: "6px",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    fontWeight: 700,
  },
  profileName: { fontSize: "0.9rem", fontWeight: 600, color: "#1D1C1A" },
  profileEmail: { fontSize: "0.75rem", color: "#888780" },
  levelBadge: {
    fontSize: "0.72rem",
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: "20px",
  },
  metricRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "16px",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #F1EFE8",
  },
  metricVal: { fontSize: "0.92rem", fontWeight: 600, color: "#444441" },
  metricLabel: {
    fontSize: "0.75rem",
    color: "#888780",
    textAlign: "center",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  barSection: { marginTop: "20px" },
  barLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#B4B2A9",
    letterSpacing: "1px",
    marginBottom: "14px",
  },
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
  },
  barName: {
    fontSize: "0.82rem",
    color: "#444441",
    width: "60px",
    flexShrink: 0,
  },
  barTrack: {
    flex: 1,
    height: "8px",
    background: "#F1EFE8",
    borderRadius: "10px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.6s ease",
  },
  barPct: {
    fontSize: "0.82rem",
    fontWeight: 700,
    width: "40px",
    textAlign: "right",
    flexShrink: 0,
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "60px 0",
  },
  placeholderIcon: { fontSize: "3rem" },
  placeholderText: { fontSize: "0.9rem", color: "#888780" },
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
    border: "3px solid #E6F1FB",
    borderTop: "3px solid #378ADD",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadText: { fontSize: "0.88rem", color: "#888780" },
};
