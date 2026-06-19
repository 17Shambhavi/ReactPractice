import { useState } from "react";

const API_KEY = "e07f68347ba44391a3932979c539b6ad";

const weatherIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
};

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError("City not found! Please try again.");
      } else {
        setWeather(data);
      }
    } catch {
      setError("Something went wrong. Check your internet!");
    }
    setLoading(false);
  };

  const icon = weather ? (weatherIcons[weather.weather[0].main] || "🌡️") : "";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      fontFamily: "'Segoe UI', Arial",
      color: "white",
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "6px" }}>🌤️ Weather App</h1>
      <p style={{ opacity: 0.5, fontSize: "13px", marginBottom: "28px" }}>Search any city in the world</p>

      {/* Search */}
      <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "440px", marginBottom: "28px" }}>
        <input
          placeholder="Enter city name..."
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === "Enter" && fetchWeather()}
          style={{
            flex: 1, padding: "13px 18px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.1)",
            color: "white", fontSize: "15px", outline: "none"
          }}
        />
        <button onClick={fetchWeather} style={{
          padding: "13px 22px", borderRadius: "12px", border: "none",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white", fontWeight: "700", cursor: "pointer", fontSize: "15px"
        }}>
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)",
          borderRadius: "12px", padding: "14px 20px", marginBottom: "20px",
          color: "#fca5a5", fontSize: "14px"
        }}>
          ❌ {error}
        </div>
      )}

      {/* Weather Card */}
      {weather && (
        <div style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "24px", padding: "32px 28px",
          width: "100%", maxWidth: "440px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center"
        }}>
          {/* City Name */}
          <h2 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: "800" }}>
            {weather.name}, {weather.sys.country}
          </h2>
          <p style={{ margin: "0 0 20px", opacity: 0.5, fontSize: "13px", textTransform: "capitalize" }}>
            {weather.weather[0].description}
          </p>

          {/* Big Icon + Temp */}
          <div style={{ fontSize: "80px", marginBottom: "8px" }}>{icon}</div>
          <div style={{ fontSize: "64px", fontWeight: "900", marginBottom: "24px", letterSpacing: "-2px" }}>
            {Math.round(weather.main.temp)}°C
          </div>

          {/* Stats Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "12px", marginBottom: "0"
          }}>
            {[
              { label: "Feels Like", value: `${Math.round(weather.main.feels_like)}°C`, icon: "🌡️" },
              { label: "Humidity", value: `${weather.main.humidity}%`, icon: "💧" },
              { label: "Wind Speed", value: `${weather.wind.speed} m/s`, icon: "💨" },
              { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: "👁️" },
              { label: "Min Temp", value: `${Math.round(weather.main.temp_min)}°C`, icon: "🔵" },
              { label: "Max Temp", value: `${Math.round(weather.main.temp_max)}°C`, icon: "🔴" },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "14px", padding: "14px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <div style={{ fontSize: "22px", marginBottom: "4px" }}>{stat.icon}</div>
                <div style={{ fontSize: "18px", fontWeight: "700" }}>{stat.value}</div>
                <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}