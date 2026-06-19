import { useState, useEffect, useRef } from "react";

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: Math.random() * 2 + 1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.7)";
        ctx.fill();
      });

      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${0.2 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none"
    }} />
  );
}

function validate(username, password) {
  const errors = {};
  if (!username.trim()) errors.username = "Username is required!";
  else if (username.length < 3) errors.username = "Min 3 characters required!";
  if (!password.trim()) errors.password = "Password is required!";
  else if (password.length < 6) errors.password = "Min 6 characters required!";
  return errors;
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const errs = validate(username, password);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onLogin(username); }, 1500);
  };

  const inputStyle = (hasError) => ({
    width: "100%", padding: "13px 16px", borderRadius: "12px",
    border: `1px solid ${hasError ? "#ef4444" : "rgba(255,255,255,0.2)"}`,
    background: "rgba(255,255,255,0.08)", color: "white",
    fontSize: "15px", outline: "none", boxSizing: "border-box", marginTop: "8px",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Segoe UI', Arial", color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", position: "relative", overflow: "hidden"
    }}>

      <Particles />

      <div style={{
        width: "100%", maxWidth: "420px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "24px", padding: "36px 32px",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
        position: "relative", zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "56px", marginBottom: "12px" }}>⚛️</div>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "800" }}>Welcome Back!</h1>
          <p style={{ margin: "8px 0 0", opacity: 0.5, fontSize: "14px" }}>Login to My React App</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", opacity: 0.7, fontWeight: "600" }}>👤 Username</label>
          <input placeholder="Enter username..." value={username}
            onChange={e => { setUsername(e.target.value); setErrors({}); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={inputStyle(errors.username)} />
          {errors.username && <p style={{ color: "#ef4444", fontSize: "12px", margin: "6px 0 0" }}>⚠️ {errors.username}</p>}
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ fontSize: "13px", opacity: 0.7, fontWeight: "600" }}>🔒 Password</label>
          <div style={{ position: "relative" }}>
            <input placeholder="Enter password..." value={password}
              type={showPassword ? "text" : "password"}
              onChange={e => { setPassword(e.target.value); setErrors({}); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={inputStyle(errors.password)} />
            <button onClick={() => setShowPassword(!showPassword)} style={{
              position: "absolute", right: "12px", top: "50%",
              transform: "translateY(-30%)",
              background: "none", border: "none", cursor: "pointer", fontSize: "18px"
            }}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p style={{ color: "#ef4444", fontSize: "12px", margin: "6px 0 0" }}>⚠️ {errors.password}</p>}
        </div>

        <button onClick={handleSubmit} disabled={isLoading} style={{
          width: "100%", padding: "14px", borderRadius: "12px", border: "none",
          background: isLoading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white", fontWeight: "800", fontSize: "16px",
          cursor: isLoading ? "not-allowed" : "pointer",
          boxShadow: "0 8px 24px rgba(99,102,241,0.4)"
        }}>
          {isLoading ? "⏳ Logging in..." : "Login →"}
        </button>

        <p style={{ textAlign: "center", opacity: 0.4, fontSize: "12px", marginTop: "20px" }}>
          Any username (3+ chars) and password (6+ chars)
        </p>
      </div>
    </div>
  );
}