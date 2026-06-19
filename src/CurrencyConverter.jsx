import { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
];

// Approximate fixed rates relative to USD
const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 149.5,
  AUD: 1.53,
  CAD: 1.36,
  AED: 3.67,
  SGD: 1.34,
  PKR: 278.5,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);

  const convert = () => {
    if (!amount || isNaN(amount)) return;
    const inUSD = parseFloat(amount) / RATES[from];
    const converted = inUSD * RATES[to];
    setResult(converted);
    setRate((RATES[to] / RATES[from]).toFixed(4));
  };

  useEffect(() => {
    convert();
  }, [from, to, amount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const inputStyle = {
    padding: "12px 16px", borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white", fontSize: "15px", outline: "none",
  };

  const selectStyle = {
    ...inputStyle, cursor: "pointer", width: "100%"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a2e, #1a1a4e, #0a0a2e)",
      fontFamily: "'Segoe UI', Arial",
      color: "white", padding: "24px 16px",
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <div style={{ maxWidth: "440px", width: "100%" }}>

        <h1 style={{ textAlign: "center", fontSize: "26px", fontWeight: "800", marginBottom: "6px" }}>
          💱 Currency Converter
        </h1>
        <p style={{ textAlign: "center", opacity: 0.5, fontSize: "13px", marginBottom: "28px" }}>
          Convert between major world currencies
        </p>

        {/* Amount */}
        <div style={{
          background: "rgba(255,255,255,0.07)", borderRadius: "20px",
          padding: "24px", marginBottom: "16px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <label style={{ fontSize: "12px", opacity: 0.6, letterSpacing: "1px", textTransform: "uppercase" }}>Amount</label>
          <input type="number" value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box", fontSize: "28px", fontWeight: "700", marginTop: "8px" }} />
        </div>

        {/* From */}
        <div style={{
          background: "rgba(255,255,255,0.07)", borderRadius: "20px",
          padding: "20px", marginBottom: "12px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <label style={{ fontSize: "12px", opacity: 0.6, letterSpacing: "1px", textTransform: "uppercase" }}>From</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            style={{ ...selectStyle, fontSize: "17px", fontWeight: "600", marginTop: "8px" }}>
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code} style={{ background: "#1a1a4e" }}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <div style={{ textAlign: "center", margin: "4px 0" }}>
          <button onClick={swap} style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", borderRadius: "50%",
            width: "48px", height: "48px", fontSize: "22px",
            cursor: "pointer", color: "white",
            boxShadow: "0 4px 20px rgba(99,102,241,0.4)"
          }}>⇅</button>
        </div>

        {/* To */}
        <div style={{
          background: "rgba(255,255,255,0.07)", borderRadius: "20px",
          padding: "20px", marginBottom: "20px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <label style={{ fontSize: "12px", opacity: 0.6, letterSpacing: "1px", textTransform: "uppercase" }}>To</label>
          <select value={to} onChange={e => setTo(e.target.value)}
            style={{ ...selectStyle, fontSize: "17px", fontWeight: "600", marginTop: "8px" }}>
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code} style={{ background: "#1a1a4e" }}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        {result && (
          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: "20px", padding: "28px", textAlign: "center"
          }}>
            <p style={{ margin: "0 0 8px", opacity: 0.6, fontSize: "14px" }}>
              {amount} {from} =
            </p>
            <h2 style={{ margin: "0 0 12px", fontSize: "42px", fontWeight: "900", color: "#a5b4fc" }}>
              {result.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {to}
            </h2>
            <p style={{ margin: 0, opacity: 0.5, fontSize: "13px" }}>
              1 {from} = {rate} {to}
            </p>

            {/* All currencies */}
            <div style={{ marginTop: "20px", textAlign: "left" }}>
              <p style={{ opacity: 0.5, fontSize: "12px", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>
                {amount} {from} in all currencies
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {CURRENCIES.filter(c => c.code !== from).map(c => {
                  const val = (parseFloat(amount) / RATES[from]) * RATES[c.code];
                  return (
                    <div key={c.code} style={{
                      background: "rgba(255,255,255,0.06)", borderRadius: "10px",
                      padding: "10px 12px", display: "flex", justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span style={{ fontSize: "13px", opacity: 0.7 }}>{c.flag} {c.code}</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#a5b4fc" }}>
                        {val.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}