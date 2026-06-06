import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.logo}>Pathrix</div>
        <p style={s.tag}>Admin Panel</p>
        <div style={s.features}>
          <Feature icon="👥" text="Monitor all students" />
          <Feature icon="📊" text="Compare learning profiles" />
          <Feature icon="🔬" text="Visualise AI pipeline" />
        </div>
      </div>

      <div style={s.right}>
        <div style={s.card}>
          <h2 style={s.heading}>Admin Login</h2>
          <p style={s.sub}>Restricted access — authorised personnel only</p>

          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              style={s.input}
              name="username"
              value={form.username}
              onChange={handle}
              onKeyDown={handleKey}
              placeholder="admin"
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              name="password"
              type="password"
              value={form.password}
              onChange={handle}
              onKeyDown={handleKey}
              placeholder="••••••••"
            />
          </div>

          {error && <p style={s.error}>{error}</p>}

          <button style={s.btn} onClick={submit}>
            Login to Admin Panel
          </button>

          <p style={s.back} onClick={() => navigate("/")}>
            ← Back to Student Login
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div style={s.feature}>
      <span style={s.icon}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Sora', sans-serif",
  },
  left: {
    width: "40%",
    background: "linear-gradient(160deg, #0C447C 0%, #378ADD 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px 48px",
    color: "#fff",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: 600,
    letterSpacing: "-0.5px",
    marginBottom: "8px",
  },
  tag: { fontSize: "1rem", opacity: 0.7, marginBottom: "48px" },
  features: { display: "flex", flexDirection: "column", gap: "20px" },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  icon: { fontSize: "1.3rem" },
  right: {
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F7F6F2",
    padding: "40px",
  },
  card: { width: "100%", maxWidth: "420px" },
  heading: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#1D1C1A",
    marginBottom: "6px",
  },
  sub: { fontSize: "0.88rem", color: "#888780", marginBottom: "32px" },
  field: { marginBottom: "18px" },
  label: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 500,
    color: "#444441",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #E0DED8",
    fontSize: "0.95rem",
    background: "#fff",
    color: "#444441",
    fontFamily: "'Sora', sans-serif",
    outline: "none",
  },
  error: {
    fontSize: "0.85rem",
    color: "#E24B4A",
    background: "#FCEBEB",
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "14px",
  },
  btn: {
    width: "100%",
    padding: "13px",
    borderRadius: "8px",
    background: "#378ADD",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
    marginBottom: "16px",
  },
  back: {
    fontSize: "0.85rem",
    color: "#888780",
    textAlign: "center",
    cursor: "pointer",
  },
};
