import { useState, useEffect } from "react";
import axios from "axios";

// const BASE = "http://127.0.0.1:8000";
const BASE = "https://pathrix-api.onrender.com";

export default function DashboardTab() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await axios.get(`${BASE}/admin/students`);
      setStudents(res.data.students);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const initials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  const levelColor = (level) =>
    ({
      beginner: "#1D9E75",
      intermediate: "#EF9F27",
      advanced: "#7F77DD",
    })[level?.toLowerCase()] || "#888780";
  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.profile === filter;
    return matchSearch && matchFilter;
  });

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
        <div>
          <h1 style={s.title}>Student Overview</h1>
          <p style={s.sub}>
            {filtered.length} of {students.length} students
          </p>
        </div>
        <div style={s.filters}>
          <input
            style={s.searchInput}
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            style={s.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div style={s.statsRow}>
        <StatCard
          label="Total Students"
          value={students.length}
          color="#378ADD"
          bg="#E6F1FB"
        />
        <StatCard
          label="Avg Interactions"
          value={
            students.length > 0
              ? Math.round(
                  students.reduce((a, b) => a + (b.interaction_count || 0), 0) /
                    students.length,
                )
              : 0
          }
          color="#1D9E75"
          bg="#E1F5EE"
        />
        <StatCard
          label="Avg Mastery"
          value={
            students.length > 0
              ? Math.round(
                  students.reduce((a, b) => a + (b.avg_mastery || 0), 0) /
                    students.length,
                ) + "%"
              : "0%"
          }
          color="#7F77DD"
          bg="#EEEDFE"
        />
        <StatCard
          label="Active Today"
          value={students.filter((s) => s.last_active === "today").length}
          color="#EF9F27"
          bg="#FAEEDA"
        />
      </div>

      {/* Student list */}
      <div style={s.grid}>
        {filtered.map((student) => (
          <div
            key={student.id}
            style={{
              ...s.studentCard,
              border:
                selected?.id === student.id
                  ? "2px solid #378ADD"
                  : "1px solid #EEECE6",
            }}
            onClick={() =>
              setSelected(selected?.id === student.id ? null : student)
            }
          >
            <div style={s.cardTop}>
              <div
                style={{ ...s.avatar, background: levelColor(student.profile) }}
              >
                {initials(student.name)}
              </div>
              <div style={s.info}>
                <div style={s.name}>{student.name}</div>
                <div style={s.email}>{student.email}</div>
                <div
                  style={{
                    ...s.levelBadge,
                    color: levelColor(student.profile),
                    background: levelColor(student.profile) + "18",
                  }}
                >
                  {student.profile || "Beginner"}
                </div>
              </div>
            </div>

            <div style={s.divider} />

            <div style={s.statsGrid}>
              <div style={s.stat}>
                <div style={s.statVal}>{student.interaction_count || 0}</div>
                <div style={s.statLbl}>Interactions</div>
              </div>
              <div style={s.stat}>
                <div style={s.statVal}>{student.session_count || 0}</div>
                <div style={s.statLbl}>Sessions</div>
              </div>
              <div style={s.stat}>
                <div style={{ ...s.statVal, color: "#1D9E75" }}>
                  {Math.round(student.avg_mastery || 0)}%
                </div>
                <div style={s.statLbl}>Avg Mastery</div>
              </div>
            </div>

            {/* Mastery bar */}
            <div style={s.masteryTrack}>
              <div
                style={{
                  ...s.masteryFill,
                  width: `${Math.round(student.avg_mastery || 0)}%`,
                }}
              />
            </div>

            {/* Expanded detail */}
            {selected?.id === student.id && (
              <div style={s.detail}>
                <div style={s.detailDivider} />
                <div style={s.detailRow}>
                  <span style={s.detailLabel}>Student ID</span>
                  <span style={s.detailValue}>{student.id.slice(0, 8)}…</span>
                </div>
                <div style={s.detailRow}>
                  <span style={s.detailLabel}>Registered</span>
                  <span style={s.detailValue}>
                    {student.created_at?.slice(0, 10) || "N/A"}
                  </span>
                </div>
                <div style={s.detailRow}>
                  <span style={s.detailLabel}>Last Recommendation</span>
                  <span style={s.detailValue}>
                    {student.last_recommendation || "None yet"}
                  </span>
                </div>
                <div style={s.detailRow}>
                  <span style={s.detailLabel}>Cognitive Load</span>
                  <span style={s.detailValue}>
                    {student.cognitive_load || "N/A"}
                  </span>
                </div>
                <div style={s.detailRow}>
                  <span style={s.detailLabel}>Confidence</span>
                  <span style={s.detailValue}>
                    {student.confidence || "N/A"}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, bg }) {
  return (
    <div
      style={{
        ...s.statCard,
        background: bg,
        border: `1.5px solid ${color}33`,
      }}
    >
      <div style={{ ...s.statCardVal, color }}>{value}</div>
      <div style={s.statCardLbl}>{label}</div>
    </div>
  );
}

const s = {
  page: { fontFamily: "'Sora', sans-serif" },
  header: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#1D1C1A",
    letterSpacing: "-0.3px",
    marginBottom: "4px",
  },
  sub: { fontSize: "0.85rem", color: "#888780" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "14px",
    marginBottom: "24px",
  },
  statCard: { padding: "16px 18px", borderRadius: "12px" },
  statCardVal: {
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "4px",
    letterSpacing: "-0.5px",
  },
  statCardLbl: { fontSize: "0.75rem", color: "#888780", fontWeight: 500 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" },
  studentCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  cardTop: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
    marginBottom: "14px",
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
    flexShrink: 0,
  },
  info: { flex: 1, minWidth: 0 },
  name: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#1D1C1A",
    marginBottom: "2px",
  },
  email: {
    fontSize: "0.78rem",
    color: "#888780",
    marginBottom: "6px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  levelBadge: {
    fontSize: "0.72rem",
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: "20px",
    display: "inline-block",
  },
  divider: { height: "1px", background: "#F1EFE8", marginBottom: "14px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "8px",
    marginBottom: "12px",
  },
  stat: { textAlign: "center" },
  statVal: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1D1C1A",
    marginBottom: "2px",
  },
  statLbl: { fontSize: "0.7rem", color: "#888780" },
  masteryTrack: {
    height: "4px",
    background: "#F1EFE8",
    borderRadius: "10px",
    overflow: "hidden",
  },
  masteryFill: {
    height: "100%",
    background: "linear-gradient(90deg,#1D9E75,#5DCAA5)",
    borderRadius: "10px",
    transition: "width 0.6s ease",
  },
  detail: { marginTop: "12px" },
  detailDivider: { height: "1px", background: "#F1EFE8", marginBottom: "12px" },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  detailLabel: { fontSize: "0.78rem", color: "#888780" },
  detailValue: { fontSize: "0.78rem", color: "#444441", fontWeight: 500 },
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
  filters: { display: "flex", gap: "12px", alignItems: "center" },
  searchInput: {
    padding: "9px 14px",
    borderRadius: "8px",
    border: "1.5px solid #EEECE6",
    fontSize: "0.85rem",
    fontFamily: "'Sora', sans-serif",
    outline: "none",
    width: "240px",
    background: "#fff",
    color: "#444441",
  },
  filterSelect: {
    padding: "9px 14px",
    borderRadius: "8px",
    border: "1.5px solid #EEECE6",
    fontSize: "0.85rem",
    fontFamily: "'Sora', sans-serif",
    outline: "none",
    background: "#fff",
    color: "#444441",
    cursor: "pointer",
  },
};
