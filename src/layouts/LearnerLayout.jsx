/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOverallMastery } from "../api";

export default function LearnerLayout() {
  const navigate = useNavigate();
  const name = localStorage.getItem("student_name") || "Student";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const studentId = localStorage.getItem("student_id");
  const [mastery, setMastery] = useState(0);
  const [level, setLevel] = useState(
    localStorage.getItem("diagnostic_level") || "Beginner",
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (studentId) {
      getOverallMastery(studentId)
        .then((res) => {
          const pct = res.data.overall_mastery || 0;
          setMastery(Math.round(pct));
          const lvl =
            pct >= 70 ? "Advanced" : pct >= 40 ? "Intermediate" : "Beginner";
          setLevel(lvl);
          localStorage.setItem("diagnostic_level", lvl);
        })
        .catch(() => {});
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>P</div>
          <span style={styles.logoText}>Pathrix</span>
          <div style={styles.versionTag}>
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>

        {/* Student card */}
        <div style={styles.studentCard}>
          <div style={styles.avatarRing}>
            <div style={styles.avatar}>{initials}</div>
          </div>
          <div style={styles.studentInfo}>
            <div style={styles.studentName}>{name}</div>
            <div style={styles.badge}>◆ {level}</div>
          </div>
        </div>

        {/* Mastery */}
        <div style={styles.masteryBox}>
          <div style={styles.masteryTop}>
            <span style={styles.masteryLabel}>Overall Mastery</span>
            <span style={styles.masteryPct}>{mastery}%</span>
          </div>
          <div style={styles.track}>
            <div style={{ ...styles.fill, width: `${mastery}%` }} />
          </div>
          <div style={styles.masteryHint}>
            {mastery > 0
              ? `${mastery}% of 54 concepts`
              : "Complete quizzes to level up"}
          </div>
          {localStorage.getItem("diagnostic_score") && (
            <div
              style={{ ...styles.diagnosticChip, cursor: "pointer" }}
              onClick={() => navigate("/diagnostic/result")}
            >
              🎯 Diagnostic: {localStorage.getItem("diagnostic_score")} ↗
            </div>
          )}
        </div>

        <div style={styles.divider} />

        {/* Nav */}
        <nav style={styles.nav}>
          <div style={styles.navSection}>LEARN</div>
          <NavItem to="/dashboard" icon={<IconDash />} label="Dashboard" end />
          <NavItem to="/dashboard/learn" icon={<IconLearn />} label="Learn" />
          <NavItem to="/dashboard/quiz" icon={<IconQuiz />} label="Quiz" />
          <NavItem to="/dashboard/path" icon={<IconPath />} label="My Path" />
        </nav>

        <div style={styles.spacer} />

        {/* Bottom */}
        <div style={styles.sidebarBottom}>
          <div style={styles.sessionChip}>
            <span style={styles.sessionDot} />
            Session active
          </div>
          <button style={styles.logoutBtn} onClick={logout}>
            <IconLogout /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        ...styles.navItem,
        background: isActive ? "rgba(29,158,117,0.10)" : "transparent",
        color: isActive ? "#085041" : "#888780",
        fontWeight: isActive ? 600 : 400,
        borderLeft: isActive ? "3px solid #1D9E75" : "3px solid transparent",
      })}
    >
      <span style={{ ...styles.navIcon, color: "inherit" }}>{icon}</span>
      {label}
    </NavLink>
  );
}

// SVG Icons
const IconDash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="1"
      width="6"
      height="6"
      rx="1.5"
      fill="currentColor"
      opacity="0.8"
    />
    <rect
      x="9"
      y="1"
      width="6"
      height="6"
      rx="1.5"
      fill="currentColor"
      opacity="0.8"
    />
    <rect
      x="1"
      y="9"
      width="6"
      height="6"
      rx="1.5"
      fill="currentColor"
      opacity="0.8"
    />
    <rect
      x="9"
      y="9"
      width="6"
      height="6"
      rx="1.5"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);
const IconLearn = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1L15 4.5V7C15 10.5 12 13.5 8 15C4 13.5 1 10.5 1 7V4.5L8 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M5 8h6M8 5v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IconQuiz = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="2"
      y="1"
      width="12"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M5 5h4M5 8h6M5 11h3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IconPath = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="3" cy="13" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="13" cy="3" r="1.5" fill="currentColor" />
    <path
      d="M4.5 11.5L6.5 9.5M9.5 6.5L11.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IconLogout = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{ marginRight: 6 }}
  >
    <path
      d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const styles = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Sora', sans-serif",
    background: "#F7F6F2",
  },
  sidebar: {
    width: "236px",
    minHeight: "100vh",
    background: "#fff",
    borderRight: "1px solid #EEECE6",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },

  // Logo
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "22px 20px 18px",
    borderBottom: "1px solid #F1EFE8",
  },
  logoMark: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #1D9E75, #085041)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    fontWeight: 700,
    flexShrink: 0,
  },
  logoText: {
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#1D1C1A",
    letterSpacing: "-0.4px",
    flex: 1,
  },
  versionTag: {
    fontSize: "0.65rem",
    fontWeight: 600,
    color: "#1D9E75",
    background: "#E1F5EE",
    padding: "2px 6px",
    borderRadius: "4px",
  },

  // Student card
  studentCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    margin: "12px 12px 0",
    background: "linear-gradient(135deg, #E1F5EE 0%, #F0FAF5 100%)",
    borderRadius: "12px",
    border: "1px solid #C5EBD9",
  },
  avatarRing: {
    padding: "2px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1D9E75, #085041)",
    flexShrink: 0,
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#fff",
    color: "#085041",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  studentInfo: {
    overflow: "hidden",
  },
  studentName: {
    fontSize: "0.88rem",
    fontWeight: 600,
    color: "#085041",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  badgeRow: {
    marginTop: "3px",
  },
  badge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#0F6E56",
    background: "#fff",
    padding: "2px 8px",
    borderRadius: "20px",
    border: "1px solid #9FE1CB",
  },

  // Mastery
  masteryBox: {
    padding: "14px 20px",
    margin: "10px 12px 0",
    background: "#FAFAF8",
    borderRadius: "10px",
    border: "1px solid #EEECE6",
  },
  masteryTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  masteryLabel: {
    fontSize: "0.73rem",
    fontWeight: 500,
    color: "#888780",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  masteryPct: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "#1D9E75",
  },
  track: {
    height: "6px",
    background: "#EEECE6",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "6px",
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #1D9E75, #5DCAA5)",
    borderRadius: "10px",
    minWidth: "3px",
    transition: "width 0.6s ease",
  },
  masteryHint: {
    fontSize: "0.7rem",
    color: "#B4B2A9",
  },

  divider: {
    height: "1px",
    background: "#F1EFE8",
    margin: "14px 0 8px",
  },

  // Nav
  nav: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    gap: "2px",
  },
  navSection: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "#C8C6BF",
    letterSpacing: "1px",
    padding: "4px 10px 6px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    borderRadius: "8px",
    fontSize: "0.87rem",
    textDecoration: "none",
    transition: "all 0.15s",
    cursor: "pointer",
  },
  navIcon: {
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  spacer: { flex: 1 },

  // Bottom
  sidebarBottom: {
    padding: "12px 16px 20px",
    borderTop: "1px solid #F1EFE8",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sessionChip: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "0.75rem",
    color: "#888780",
  },
  sessionDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#1D9E75",
    boxShadow: "0 0 0 2px #E1F5EE",
    flexShrink: 0,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    padding: "9px 14px",
    borderRadius: "8px",
    background: "transparent",
    border: "1px solid #EEECE6",
    color: "#888780",
    fontSize: "0.83rem",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "'Sora', sans-serif",
  },

  // Main
  main: {
    flex: 1,
    padding: "32px 36px",
    minWidth: 0,
  },
  diagnosticChip: {
    marginTop: "8px",
    fontSize: "0.72rem",
    color: "#1D9E75",
    background: "#E1F5EE",
    border: "1px solid #9FE1CB",
    padding: "4px 10px",
    borderRadius: "20px",
    display: "inline-block",
    fontWeight: 500,
  },
};
