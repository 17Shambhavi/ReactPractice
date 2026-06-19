import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#7c3aed", "#2563eb", "#db2777", "#16a34a", "#ea580c", "#dc2626", "#f59e0b"];

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const addExpense = () => {
    if (!title || !amount) return;
    setExpenses([...expenses, {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category
    }]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const chartData = CATEGORIES.map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  })).filter(d => d.value > 0);

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "10px"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e1b4b, #312e81)",
      fontFamily: "'Segoe UI', Arial",
      color: "white",
      padding: "24px 16px"
    }}>
      <div style={{ maxWidth: "520px", margin: "0 auto" }}>

        <h1 style={{ textAlign: "center", fontSize: "24px", marginBottom: "24px" }}>
          💸 Expense Tracker
        </h1>

        {/* Total */}
        <div style={{
          background: "rgba(255,255,255,0.1)", borderRadius: "16px",
          padding: "20px", textAlign: "center", marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <p style={{ margin: 0, opacity: 0.7, fontSize: "14px" }}>Total Spent</p>
          <h2 style={{ margin: "8px 0 0", fontSize: "40px", fontWeight: "800" }}>
            ₹{total.toFixed(2)}
          </h2>
        </div>

        {/* Form */}
        <div style={{
          background: "rgba(255,255,255,0.1)", borderRadius: "16px",
          padding: "20px", marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <h3 style={{ margin: "0 0 14px" }}>➕ Add Expense</h3>
          <input placeholder="Expense title..." value={title}
            onChange={e => setTitle(e.target.value)} style={inputStyle} />
          <input placeholder="Amount (₹)..." value={amount} type="number"
            onChange={e => setAmount(e.target.value)} style={inputStyle} />
          <select value={category} onChange={e => setCategory(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}>
            {CATEGORIES.map(c => (
              <option key={c} value={c} style={{ background: "#312e81", color: "white" }}>
                {c}
              </option>
            ))}
          </select>
          <button onClick={addExpense} style={{
            width: "100%", padding: "12px", borderRadius: "8px", border: "none",
            background: "#7c3aed", color: "white", fontWeight: "bold",
            fontSize: "15px", cursor: "pointer"
          }}>
            Add Expense
          </button>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div style={{
            background: "rgba(255,255,255,0.1)", borderRadius: "16px",
            padding: "20px", marginBottom: "20px",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h3 style={{ margin: "0 0 14px" }}>📊 Spending Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `₹${val.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* List */}
        {expenses.length > 0 && (
          <div style={{
            background: "rgba(255,255,255,0.1)", borderRadius: "16px",
            padding: "20px", border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <h3 style={{ margin: "0 0 14px" }}>🧾 All Expenses</h3>
            {expenses.map(e => (
              <div key={e.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "rgba(255,255,255,0.08)", borderRadius: "10px",
                padding: "12px 14px", marginBottom: "8px"
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "600" }}>{e.title}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", opacity: 0.6 }}>{e.category}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontWeight: "700" }}>₹{e.amount.toFixed(2)}</span>
                  <button onClick={() => deleteExpense(e.id)} style={{
                    background: "rgba(255,0,0,0.4)", border: "none", color: "white",
                    borderRadius: "6px", padding: "5px 10px", cursor: "pointer"
                  }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {expenses.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.4 }}>No expenses added yet!</p>
        )}

      </div>
    </div>
  );
}