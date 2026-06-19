import { useState, useRef, useEffect } from "react";

const songs = [
  { id: 1, title: "Ishq Mubarak", artist: "Arijit Singh", duration: 258, color: "#e11d48" },
  { id: 2, title: "Fakira", artist: "Shreya Ghoshal", duration: 245, color: "#7c3aed" },
  { id: 3, title: "Ishq Bulava", artist: "Shafqat Amanat Ali", duration: 312, color: "#0284c7" },
  { id: 4, title: "Ambarsariya", artist: "Sona Mohapatra", duration: 223, color: "#059669" },
  { id: 5, title: "Aur Hona Tha Pyar", artist: "Atif Aslam", duration: 289, color: "#f43f5e" },
  { id: 6, title: "Blinding Lights", artist: "The Weeknd", duration: 200, color: "#d97706" },
  { id: 7, title: "Shape of You", artist: "Ed Sheeran", duration: 234, color: "#db2777" },
  { id: 8, title: "Levitating", artist: "Dua Lipa", duration: 203, color: "#ea580c" },
  { id: 9, title: "Anti-Hero", artist: "Taylor Swift", duration: 200, color: "#6366f1" },

];

const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [liked, setLiked] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const intervalRef = useRef(null);
  const song = songs[currentIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= song.duration) {
            if (repeat) return 0;
            handleNext();
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentIndex, repeat]);

  const handleNext = () => {
    setProgress(0);
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * songs.length));
    } else {
      setCurrentIndex(i => (i + 1) % songs.length);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex(i => (i - 1 + songs.length) % songs.length);
  };

  const toggleLike = (id) => {
    setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);
  };

  const progressPercent = (progress / song.duration) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${song.color}44, #0f0f1a 60%)`,
      fontFamily: "'Segoe UI', Arial",
      colour: "white",
      padding: "24px 16px",
      transition: "background 0.8s ease"
    }}>
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>

        <h1 style={{ textAlign: "center", fontSize: "22px", fontWeight: "800", marginBottom: "28px" }}>
          🎵 Music Player
        </h1>

        {/* Album Art */}
        <div style={{
          width: "100%", aspectRatio: "1",
          background: `linear-gradient(135deg, ${song.color}, ${song.color}66)`,
          borderRadius: "24px", marginBottom: "28px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontSize: "80px",
          boxShadow: `0 20px 60px ${song.color}55`,
          transform: isPlaying ? "scale(1.02)" : "scale(1)",
          transition: "all 0.4s ease"
        }}>
          🎵
          <p style={{ fontSize: "16px", margin: "12px 0 0", fontWeight: "700", opacity: 0.9 }}>
            {song.title}
          </p>
          <p style={{ fontSize: "13px", margin: "4px 0 0", opacity: 0.6 }}>
            {song.artist}
          </p>
        </div>

        {/* Like + Song Info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>{song.title}</h2>
            <p style={{ margin: "4px 0 0", opacity: 0.6, fontSize: "13px" }}>{song.artist}</p>
          </div>
          <button onClick={() => toggleLike(song.id)} style={{
            background: "none", border: "none", cursor: "pointer", fontSize: "28px"
          }}>
            {liked.includes(song.id) ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            height: "6px", background: "rgba(255,255,255,0.15)",
            borderRadius: "999px", cursor: "pointer"
          }} onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            setProgress(Math.floor(percent * song.duration));
          }}>
            <div style={{
              height: "100%", width: `${progressPercent}%`,
              background: `linear-gradient(90deg, ${song.color}, white)`,
              borderRadius: "999px", transition: "width 0.5s linear"
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", opacity: 0.5, fontSize: "12px" }}>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(song.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <button onClick={() => setShuffle(!shuffle)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "22px", opacity: shuffle ? 1 : 0.3,
            color: shuffle ? song.color : "white"
          }}>🔀</button>

          <button onClick={handlePrev} style={{
            background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
            borderRadius: "50%", width: "50px", height: "50px", fontSize: "20px", color: "white"
          }}>⏮</button>

          <button onClick={() => setIsPlaying(!isPlaying)} style={{
            background: song.color, border: "none", cursor: "pointer",
            borderRadius: "50%", width: "70px", height: "70px", fontSize: "30px", color: "white",
            boxShadow: `0 8px 30px ${song.color}88`
          }}>
            {isPlaying ? "⏸" : "▶️"}
          </button>

          <button onClick={handleNext} style={{
            background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
            borderRadius: "50%", width: "50px", height: "50px", fontSize: "20px", color: "white"
          }}>⏭</button>

          <button onClick={() => setRepeat(!repeat)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "22px", opacity: repeat ? 1 : 0.3,
            color: repeat ? song.color : "white"
          }}>🔁</button>
        </div>

        {/* Volume */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <span>🔈</span>
          <input type="range" min="0" max="100" value={volume}
            onChange={e => setVolume(e.target.value)}
            style={{ flex: 1, accentColor: song.color }} />
          <span>🔊</span>
          <span style={{ fontSize: "12px", opacity: 0.5, minWidth: "30px" }}>{volume}%</span>
        </div>

        {/* Playlist */}
        <div style={{
          background: "rgba(255,255,255,0.05)", borderRadius: "20px",
          padding: "16px", border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "15px", opacity: 0.7 }}>
            🎶 Playlist — {songs.length} songs
          </h3>
          {songs.map((s, i) => (
            <div key={s.id}
              onClick={() => { setCurrentIndex(i); setProgress(0); setIsPlaying(true); }}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px", cursor: "pointer",
                background: i === currentIndex ? `${s.color}33` : "transparent",
                border: `1px solid ${i === currentIndex ? s.color + "66" : "transparent"}`,
                marginBottom: "6px", transition: "all 0.2s"
              }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: `linear-gradient(135deg, ${s.color}, ${s.color}66)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
                flexShrink:0
              }}>
                {i === currentIndex && isPlaying ? "🎵" : "🎶"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0, fontSize: "14px",
                  fontWeight: i === currentIndex ? "700" : "400",
                  color: i === currentIndex ? s.color : "white",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>{s.title}</p>
                <p style={{ margin: 0, fontSize: "12px", opacity: 0.5 }}>{s.artist}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <span style={{ fontSize: "11px", opacity: 0.4 }}>{formatTime(s.duration)}</span>
                {liked.includes(s.id) && <span style={{ fontSize: "14px" }}>❤️</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}