import { useState, useEffect } from "react";
import ExpenseTracker from "./ExpenseTracker";
import Weather from "./Weather";
import MusicPlayer from "./MusicPlayer";
import CurrencyConverter from "./CurrencyConverter";
import Login from "./Login";
import useLocalStorage from "./useLocalStorage";

const COLORS = [
  { name: "Purple", value: "#7c3aed" },
  { name: "Blue", value: "#2563eb" },
  { name: "Pink", value: "#db2777" },
  { name: "Green", value: "#16a34a" },
  { name: "Orange", value: "#ea580c" },
  { name: "Red", value: "#dc2626" },
];

function Card({ title, icon, children, accent = "#7c3aed" }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      borderRadius: "20px", padding: "24px", marginBottom: "20px",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
        <span style={{ background: accent, borderRadius: "10px", padding: "6px 10px", fontSize: "16px" }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "700" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function App() {
  // Login State
  const [user, setUser] = useLocalStorage("user", null);

  // App States with Local Storage
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", true);
  const [bgColor, setBgColor] = useLocalStorage("bgColor", "#7c3aed");

  // Normal States
  const [name, setName] = useState(user || "");
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  useEffect(() => {
    let timer;
    if (running) timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  const handleLogin = (username) => {
    setUser(username);
    setName(username);
  };

  const handleLogout = () => {
    setUser(null);
    setName("");
  };

  const bg = darkMode
    ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
    : `linear-gradient(135deg, ${bgColor}dd, ${bgColor}88)`;

  const inputStyle = {
    padding: "11px 16px", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "white", fontSize: "14px", outline: "none",
  };

  const btn = (background, color = "white") => ({
    padding: "10px 20px", borderRadius: "10px", border: "none",
    background, color, fontWeight: "700", cursor: "pointer", fontSize: "13px"
  });

  const backBtn = {
    position: "fixed", top: "16px", left: "16px", zIndex: 100,
    padding: "8px 18px", borderRadius: "10px", border: "none",
    background: "rgba(255,255,255,0.15)", color: "white",
    fontWeight: "bold", cursor: "pointer"
  };

  // Show Login if not logged in
  if (!user) return <Login onLogin={handleLogin} />;

  if (showExpense) return (
    <div><button onClick={() => setShowExpense(false)} style={backBtn}>← Back</button><ExpenseTracker /></div>
  );
  if (showWeather) return (
    <div><button onClick={() => setShowWeather(false)} style={backBtn}>← Back</button><Weather /></div>
  );
  if (showMusic) return (
    <div><button onClick={() => setShowMusic(false)} style={backBtn}>← Back</button><MusicPlayer /></div>
  );
  if (showCurrency) return (
    <div><button onClick={() => setShowCurrency(false)} style={backBtn}>← Back</button><CurrencyConverter /></div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: bg,
      fontFamily: "'Segoe UI', Arial", color: "white",
      transition: "background 0.6s ease", padding: "28px 16px"
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: "520px", margin: "0 auto 28px"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800" }}>⚛️ My React App</h1>
          <p style={{ margin: "5px 0 0", opacity: 0.7, fontSize: "13px" }}>👋 Hello, <strong>{user}</strong>!</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{
            ...btn(darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"),
            borderRadius: "50px", padding: "9px 14px"
          }}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={handleLogout} style={{
            ...btn("rgba(239,68,68,0.3)"),
            borderRadius: "50px", padding: "9px 14px"
          }}>
            🚪
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "520px", margin: "0 auto" }}>

        <Card title="Your Name" icon="👤" accent="#6366f1">
          <input placeholder="Enter your name..." value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </Card>

        <Card title="Counter" icon="🔢" accent="#06b6d4">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              fontSize: "52px", fontWeight: "900", minWidth: "70px",
              color: count > 0 ? "#22c55e" : count < 0 ? "#ef4444" : "white"
            }}>{count}</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={() => setCount(count + 1)} style={btn("#22c55e")}>+ Add</button>
              <button onClick={() => setCount(count - 1)} style={btn("#ef4444")}>− Sub</button>
              <button onClick={() => setCount(0)} style={btn("rgba(255,255,255,0.15)")}>Reset</button>
            </div>
          </div>
        </Card>

        <Card title="Stopwatch" icon="⏱️" accent="#f59e0b">
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "58px", fontWeight: "900", letterSpacing: "6px",
              marginBottom: "20px", color: running ? "#22c55e" : "white"
            }}>{formatTime(seconds)}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button onClick={() => setRunning(!running)} style={btn(running ? "#ef4444" : "#22c55e")}>
                {running ? "⏸ Pause" : "▶ Start"}
              </button>
              <button onClick={() => { setRunning(false); setSeconds(0); }} style={btn("rgba(255,255,255,0.15)")}>
                🔄 Reset
              </button>
            </div>
          </div>
        </Card>

        {!darkMode && (
          <Card title="Background Color" icon="🎨" accent="#ec4899">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {COLORS.map((c) => (
                <button key={c.name} onClick={() => setBgColor(c.value)} style={{
                  ...btn(c.value),
                  border: bgColor === c.value ? "3px solid white" : "3px solid transparent"
                }}>{c.name}</button>
              ))}
            </div>
          </Card>
        )}

        <Card title="Todo List" icon="📝" accent="#8b5cf6">
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
            <input placeholder="Add a task..." value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              style={{ ...inputStyle, flex: 1 }} />
            <button onClick={addTodo} style={btn("#8b5cf6")}>Add</button>
          </div>
          {todos.length === 0
            ? <p style={{ opacity: 0.35, textAlign: "center", margin: "8px 0", fontSize: "14px" }}>No tasks yet!</p>
            : todos.map((todo) => (
              <div key={todo.id} style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: todo.done ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.06)",
                borderRadius: "12px", padding: "12px 14px", marginBottom: "8px",
                border: `1px solid ${todo.done ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
              }}>
                <span onClick={() => toggleTodo(todo.id)} style={{ cursor: "pointer", fontSize: "20px" }}>
                  {todo.done ? "✅" : "⬜"}
                </span>
                <span style={{
                  flex: 1, fontSize: "14px",
                  textDecoration: todo.done ? "line-through" : "none",
                  opacity: todo.done ? 0.4 : 1
                }}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)} style={{
                  ...btn("rgba(239,68,68,0.25)"), padding: "5px 10px", fontSize: "12px", color: "#fca5a5"
                }}>✕</button>
              </div>
            ))
          }
          {todos.length > 0 && (
            <p style={{ opacity: 0.4, fontSize: "12px", textAlign: "right", margin: "8px 0 0" }}>
              {todos.filter(t => t.done).length}/{todos.length} completed
            </p>
          )}
        </Card>

        <Card title="Expense Tracker" icon="💸" accent="#10b981">
          <p style={{ opacity: 0.6, margin: "0 0 14px", fontSize: "13px" }}>
            Track your daily expenses with a pie chart breakdown!
          </p>
          <button onClick={() => setShowExpense(true)} style={{
            ...btn("linear-gradient(135deg, #10b981, #059669)"),
            width: "100%", padding: "13px", fontSize: "14px", borderRadius: "12px"
          }}>💸 Open Expense Tracker →</button>
        </Card>

        <Card title="Weather App" icon="🌤️" accent="#06b6d4">
          <p style={{ opacity: 0.6, margin: "0 0 14px", fontSize: "13px" }}>
            Live weather for any city worldwide!
          </p>
          <button onClick={() => setShowWeather(true)} style={{
            ...btn("linear-gradient(135deg, #06b6d4, #0284c7)"),
            width: "100%", padding: "13px", fontSize: "14px", borderRadius: "12px"
          }}>🌤️ Open Weather App →</button>
        </Card>

        <Card title="Music Player" icon="🎵" accent="#e11d48">
          <p style={{ opacity: 0.6, margin: "0 0 14px", fontSize: "13px" }}>
            Play your favourite songs — Ishq Mubarak, Fakira, Ambarsariya & more!
          </p>
          <button onClick={() => setShowMusic(true)} style={{
            ...btn("linear-gradient(135deg, #e11d48, #be123c)"),
            width: "100%", padding: "13px", fontSize: "14px", borderRadius: "12px"
          }}>🎵 Open Music Player →</button>
        </Card>

        <Card title="Currency Converter" icon="💱" accent="#6366f1">
          <p style={{ opacity: 0.6, margin: "0 0 14px", fontSize: "13px" }}>
            Convert between USD, EUR, INR, GBP & more!
          </p>
          <button onClick={() => setShowCurrency(true)} style={{
            ...btn("linear-gradient(135deg, #6366f1, #8b5cf6)"),
            width: "100%", padding: "13px", fontSize: "14px", borderRadius: "12px"
          }}>💱 Open Currency Converter →</button>
        </Card>

      </div>
    </div>
  );
}

export default App;