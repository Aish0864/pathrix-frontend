import { useState, useEffect } from "react"; // add useEffect
import axios from "axios"; // add axios
import { useNavigate } from "react-router-dom";
import DashboardTab from "../pages/admin/DashboardTab";
import ABComparisonTab from "../pages/admin/ABComparisonTab";
import PipelineTab from "../pages/admin/PipelineTab";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([]); // ← add this

  useEffect(() => {
    // ← add this
    axios
      .get("http://127.0.0.1:8000/admin/students")
      .then((res) => setStudents(res.data.students || []))
      .catch(() => {});
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  const tabs = [
    { id: "dashboard", label: "Students", icon: "👥" },
    { id: "ab", label: "A/B Comparison", icon: "📊" },
    { id: "pipeline", label: "Pipeline", icon: "🔬" },
  ];

  return (
    <div style={s.shell}>
      {/* Top bar */}
      <div style={s.topbar}>
        <div style={s.topLeft}>
          <span style={s.logo}>Pathrix</span>
          <span style={s.adminBadge}>Admin</span>
        </div>
        <div style={s.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...s.tab,
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid #378ADD"
                    : "2px solid transparent",
                color: activeTab === tab.id ? "#378ADD" : "#888780",
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={s.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        <button style={s.logoutBtn} onClick={logout}>
          ← Logout
        </button>
      </div>

      {/* Content */}
      <main style={s.main}>
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "ab" && <ABComparisonTab />}
        {activeTab === "pipeline" && <PipelineTab students={students} />}
      </main>
    </div>
  );
}

const s = {
  shell: {
    minHeight: "100vh",
    fontFamily: "'Sora', sans-serif",
    background: "#F7F6F2",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    borderBottom: "1px solid #EEECE6",
    padding: "0 32px",
    height: "60px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#378ADD",
    letterSpacing: "-0.3px",
  },
  adminBadge: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#378ADD",
    background: "#E6F1FB",
    padding: "2px 8px",
    borderRadius: "4px",
  },
  tabs: {
    display: "flex",
    gap: "4px",
    height: "60px",
    alignItems: "center",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 20px",
    height: "60px",
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    fontSize: "0.88rem",
    fontFamily: "'Sora', sans-serif",
    transition: "all 0.15s",
  },
  tabIcon: { fontSize: "1rem" },
  logoutBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    background: "transparent",
    border: "1px solid #EEECE6",
    color: "#888780",
    fontSize: "0.83rem",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
  },
  main: {
    padding: "32px 36px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
};
