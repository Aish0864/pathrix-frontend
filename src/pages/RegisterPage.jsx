import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";
import "../styles/global.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      return setError("All fields are required.");
    }
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      const res = await register(form.name, form.email, form.password);
      localStorage.setItem("student_id", res.data.student_id);
      localStorage.setItem("student_name", res.data.name);
      localStorage.removeItem("session_id"); // ensure no stale session
      navigate("/diagnostic");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Left panel */}
      <div style={styles.left}>
        <div style={styles.logo}>Pathrix</div>
        <p style={styles.tagline}>AI-powered personalised learning</p>
        <div style={styles.features}>
          <Feature icon="🧠" text="Tracks your knowledge in real time" />
          <Feature icon="🗺️" text="Builds a learning path just for you" />
          <Feature icon="💡" text="Explains every recommendation" />
        </div>
      </div>

      {/* Right panel */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Create your account</h2>
          <p style={styles.sub}>Start learning smarter today</p>

          <Field
            label="Full name"
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Aisha Sharma"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="aisha@example.com"
          />
          <Field
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="••••••••"
          />
          <Field
            label="Confirm password"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handle}
            placeholder="••••••••"
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            style={loading ? styles.btnDisabled : styles.btn}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Register"}
          </button>

          <p style={styles.switch}>
            Already have an account?{" "}
            <Link to="/" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div style={styles.feature}>
      <span style={styles.icon}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Sora', sans-serif",
  },
  left: {
    width: "40%",
    background: "linear-gradient(160deg, #085041 0%, #1D9E75 100%)",
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
    marginBottom: "12px",
  },
  tagline: {
    fontSize: "1.1rem",
    opacity: 0.85,
    marginBottom: "48px",
    lineHeight: 1.5,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  icon: {
    fontSize: "1.3rem",
  },
  right: {
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F7F6F2",
    padding: "40px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
  },
  heading: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#444441",
    marginBottom: "6px",
  },
  sub: {
    fontSize: "0.9rem",
    color: "#888780",
    marginBottom: "32px",
  },
  field: {
    marginBottom: "18px",
  },
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
    transition: "border-color 0.2s",
  },
  error: {
    fontSize: "0.85rem",
    color: "#E24B4A",
    marginBottom: "14px",
    background: "#FCEBEB",
    padding: "10px 14px",
    borderRadius: "8px",
  },
  btn: {
    width: "100%",
    padding: "13px",
    borderRadius: "8px",
    background: "#1D9E75",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 600,
    marginTop: "4px",
    marginBottom: "20px",
    transition: "background 0.2s",
  },
  btnDisabled: {
    width: "100%",
    padding: "13px",
    borderRadius: "8px",
    background: "#888780",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 600,
    marginTop: "4px",
    marginBottom: "20px",
  },
  switch: {
    fontSize: "0.88rem",
    color: "#888780",
    textAlign: "center",
  },
  link: {
    color: "#1D9E75",
    fontWeight: 600,
  },
};
